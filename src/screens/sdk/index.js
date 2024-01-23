import React from 'react';
import TopHeader from '../../components/TopHeader';
import * as ImagePicker from 'react-native-image-picker';
import {
  ImageExportType,
  ImageFormat,
  PESDK,
  CanvasAction,
  FrameAction,
  FrameTileMode,
  FrameLayoutMode,
  BlendMode,
  AdjustmentTool,
  FocusTool,
  BrushAction,
  Tool,
  TintMode,
  StickerAction,
  TextAction,
} from 'react-native-photoeditorsdk';
import CustomButton from '../../components/CustomButton';
import Images from '../../constants/images';
import * as RNFS from 'react-native-fs';
import {ScrollView} from 'react-native';

export const openPhotoFromCameraRollExample = async () => {
  try {
    // Select a photo from the camera roll.
    let pickerResult = await ImagePicker.launchImageLibrary({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      mediaType: 'photo',
    });

    // Return if the image selection has been cancelled.
    if (pickerResult.cancelled) {
      return;
    }

    const uriImg = pickerResult?.assets.map((item, idx) => item?.uri);

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(uriImg[0]);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
      try {
        //const imageUrl = 'path/to/your/image.jpg'; // Replace with the actual path or URI of your image
        const destinationPath = `${RNFS.DocumentDirectoryPath}/savedImage.jpg`;

        // Check if the file exists
        const fileExists = await RNFS.exists(destinationPath);

        if (!fileExists) {
          // Copy the image to the destination path
          await RNFS.copyFile(result.image, destinationPath);
          console.log('Image saved successfully!');
        } else {
          console.log('Image already saved!');
        }
      } catch (error) {
        console.error('Error saving image:', error);
      }
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const saveImageToStorage = async () => {
  try {
    const imageUrl = 'path/to/your/image.jpg'; // Replace with the actual path or URI of your image
    const destinationPath = `${RNFS.DocumentDirectoryPath}/savedImage.jpg`;

    // Check if the file exists
    const fileExists = await RNFS.exists(destinationPath);

    if (!fileExists) {
      // Copy the image to the destination path
      await RNFS.copyFile(imageUrl, destinationPath);
      console.log('Image saved successfully!');
    } else {
      console.log('Image already saved!');
    }
  } catch (error) {
    console.error('Error saving image:', error);
  }
};

export const savePhotoFileSystemExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder1;

  try {
    // Create a `Configuration` object.
    // Since this example is using `expo-file-system` to remove the exported photo later,
    // we need to export the photo in one of the two directories that are supported by this module.
    // For further reference, please have a look at the official documentation here:
    // https://docs.expo.dev/versions/latest/sdk/filesystem/#directories
    const configuration = {
      export: {
        filename: RNFS.DocumentDirectoryPath + '/DCIM/export.png',
        // filename:
        // RNFS.CachesDirectoryPath +
        //   `export${Platform.OS == 'android' ? '.png' : ''}`,
        image: {
          format: ImageFormat.PNG,
          exportType: ImageExportType.FILE_URL,
        },
      },
    };

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      // For example, you could move the file to a persistent directory of your choice, e.g.:
      // await FileSystem.moveAsync({ filepath: result?.image, destPath: "YOUR-LOCAL-URI" });

      // Delete the temporary export file only after the saving process has finished,
      // to be able to access it again in case anything went wrong while uploading
      // the photo.
      // FileSystem.writeFile(photo, 'Lorem ipsum dolor sit amet', 'utf8')
      //   .then(success => {
      //     console.log('FILE WRITTEN!');
      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //   });
      console.log(result);
      return RNFS.unlink(result?.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error, 'in generating photo');
  }
};

export const photoTransformConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder1;

  // Create a `Configuration` object.
  const configuration = {
    transform: {
      // By default the editor has a lot of crop aspects enabled.
      // For this example only a couple are enabled, e.g. if you
      // only allow certain image aspects in your application.
      items: [
        {
          width: 1,
          height: 1,
        },
        {
          width: 19,
          height: 9,
          name: 'Landscape',
        },
      ],

      // By default the editor allows to use a free crop ratio.
      // For this example this is disabled to ensure that the image
      // has a suitable ratio.
      allowFreeCrop: false,

      // By default the editor shows the reset button which resets
      // the applied transform operations. In this example the button
      // is hidden since we are enforcing certain ratios and the user
      // can only select among them anyway.
      showResetButton: false,
    },

    // For this example the user is forced to crop the asset to one of
    // the allowed crop aspects specified above, before being able to use other
    // features of the editor. The transform tool will only be presented
    // if the image does not already fit one of those allowed aspect ratios.
    forceCrop: true,
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoFilterConfgirationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder1;

  // Create a `Configuration` object.
  const configuration = {
    filter: {
      // By default, the filters are grouped according to the filter
      // categories passed to the configuration. In this example,
      // the filter grouping is disabled so that all
      // available filters will be displayed separately.
      flattenCategories: true,
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoSnappingConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder1;

  // Create a `Configuration` object.
  const configuration = {
    // For this example the editor's snapping behavior is configured
    // to act as a guide for the user to see where the sprites should
    // be placed. A use case could be that an application displays
    // profile pictures both in rectangular as well as in circular
    // shapes which requires the editor to indicate where the area
    // is in which sprites' visibility is best.
    snapping: {
      rotation: {
        // By default the snapping is enabled when rotating a sprite.
        // For this example this behavior is disabled since only the
        // outer positional snapping guides are needed.
        enabled: false,
      },

      position: {
        // By default the center of the sprite snaps to a vertical
        // line indicating the center of the image.
        // For this example this behavior is disabled since only the
        // outer positional snapping guides are needed.
        snapToVerticalCenter: false,

        // By default the center of the sprite snaps to a horizontal
        // line indicating the center of the image.
        // For this example this behavior is disabled since only the
        // outer positional snapping guides are needed.
        snapToHorizontalCenter: false,

        // By default the sprite snaps to a horizontal line
        // on the bottom of the image. This value is measured in normalized
        // coordinates relative to the smaller side of the edited image and
        // defaults to 10% (0.1).
        // For this example the value is set to 15% (0.15) to define the
        // visibility area of the image.
        snapToBottom: 0.15,

        // By default the sprite snaps to a horizontal line
        // on the top of the image. This value is measured in normalized
        // coordinates relative to the smaller side of the edited image and
        // defaults to 10% (0.1).
        // For this example the value is set to 15% (0.15) to define the
        // visibility area of the image.
        snapToTop: 0.15,

        // By default the sprite snaps to a vertical line
        // on the left of the image. This value is measured in normalized
        // coordinates relative to the smaller side of the edited image and
        // defaults to 10% (0.1).
        // For this example the value is set to 15% (0.15) to define the
        // visibility area of the image.
        snapToLeft: 0.15,

        // By default the sprite snaps to a vertical line
        // on the right of the image. This value is measured in normalized
        // coordinates relative to the smaller side of the edited image and
        // defaults to 10% (0.1).
        // For this example the value is set to 15% (0.15) to define the
        // visibility area of the image.
        snapToRight: 0.15,
      },
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoTextDesignConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder1;

  // Create a `Configuration` object.
  const configuration = {
    textdesign: {
      // By default the editor provides a lot of colors.
      // For this example only a few colors are enabled.
      colors: [
        {
          name: 'White',
          color: '#ffffff',
        },
        {
          name: 'Black',
          color: '#000000',
        },
      ],

      // By default the editor has all available overlay actions for this tool
      // enabled. For this example `CanvasAction.UNDO` and `CanvasAction.REDO`
      // are removed.
      canvasActions: [
        CanvasAction.ADD,
        CanvasAction.BRING_TO_FRONT,
        CanvasAction.DELETE,
        CanvasAction.INVERT,
      ],
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoFramesConfigurationExample = async () => {
  try {
    // Add a photo from the assets directory.
    const photo = Images.profile_placeholder1;

    // Create a `Configuration` object.
    const configuration = {
      frame: {
        // By default all actions are enabled in the frame tool.
        // For this example only two of them are enabled.
        actions: [FrameAction.OPACITY, FrameAction.REPLACE],
      },
    };

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoFramesAppBundleExample = async () => {
  try {
    // Add a photo from the assets directory.
    const photo = Images.profile_placeholder1;

    // Create a `Configuration` object.
    const configuration = {
      frame: {
        items: [
          {
            identifier: 'custom_frame',
            name: 'Custom',
            thumbnailURI: Images.frame1,
            layoutMode: FrameLayoutMode.VERTICAL_INSIDE,
            relativeScale: 0.1,
            imageGroups: {
              top: {
                midURI: Images.bell_icon,
                startURI: Images.add_birthday_icon,
                endURI: Images.add_birthday_icon,
                midMode: FrameTileMode.STRETCH,
              },
              left: {
                midURI: Images.bell_icon,
                midMode: FrameTileMode.STRETCH,
              },
              right: {
                midURI: Images.add_birthday_icon,
                midMode: FrameTileMode.STRETCH,
              },
              bottom: {
                midURI: Images.bottomAdd,
                startURI: Images.bottomCustomActive,
                endURI: Images.bottomProfileInactive,
                midMode: FrameTileMode.STRETCH,
              },
            },
          },
        ],
      },
    };

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoOverlayConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder2;

  // Create a `Configuration` object.
  const configuration = {
    overlay: {
      // By default, all available blend modes are enabled.
      // For this example, only a couple are enabled for usage.
      blendModes: [
        BlendMode.COLOR_BURN,
        BlendMode.DARKEN,
        BlendMode.HARD_LIGHT,
        BlendMode.LIGHTEN,
      ],
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoOverlayAppBundleExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder2;

  // Create a `Configuration` object.
  const configuration = {
    overlay: {
      items: [
        {
          identifier: 'custom_overlay',
          name: 'Custom',
          defaultBlendMode: BlendMode.OVERLAY,
          overlayURI: Images.bell_icon,
        },
        {identifier: 'imgly_overlay_rain'},
        {identifier: 'imgly_overlay_mosaic'},
      ],
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoAdjustmentConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder2;

  // Create a `Configuration` object.
  const configuration = {
    adjustment: {
      // By default the editor always shows the reset button.
      // For this example, the reset button should not be shown.
      showResetButton: false,

      // By default the editor shows all avaliable adjust tools.
      // For this example, the editor should only show a small selection
      // of them.
      items: [
        AdjustmentTool.BRIGHTNESS,
        AdjustmentTool.CONTRAST,
        AdjustmentTool.SATURATION,
      ],
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoFocusConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder2;

  // Create a `Configuration` object.
  const configuration = {
    focus: {
      // By default the editor has all focus modes enabled.
      // For this example, only the given selection should
      // be enabled.
      items: [FocusTool.NONE, FocusTool.RADIAL, FocusTool.LINEAR],
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoBrushConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder1;

  // Create a `Configuration` object.
  const configuration = {
    brush: {
      // By default all available brush tools are enabled.
      // For this example only a couple are enabled.
      actions: [BrushAction.COLOR, BrushAction.SIZE],

      // By default the default color for the brush stroke is
      // `#ffffff`. For this example the default color
      // is set to `#000000`.
      defaultColor: '#000000',

      // By default the default brush size is set to 5% of the
      // smaller side of the image.
      // For this example the default size is set to be 2.5% of
      // the smaller side of the image.
      defaultSize: 0.025,

      // By default the editor provides a variety of different
      // colors to customize the color of the brush stroke.
      // For this example only a small selection of colors is enabled.
      colors: [
        {
          name: 'White',
          color: '#ffffff',
        },
        {
          name: 'Black',
          color: '#000000',
        },
        {
          name: 'Red',
          color: 'ff0000',
        },
      ],
    },
  };

  try {
    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoAnnotationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder2;

  // Create a `Configuration` object.
  const configuration = {
    // For this example only the sticker, text, and brush tool are enabled.
    // tools: [Tool.STICKER, Tool.TEXT, Tool.BRUSH],
    tools: [Tool.STICKER],

    // For this example only stickers suitable for annotations are enabled.
    sticker: {
      categories: [
        {
          identifier: 'annotation_stickers',
          name: 'Annotation',
          thumbnailURI: Images.bell_icon,
          items: [
            {identifier: 'imgly_sticker_shapes_arrow_02'},
            {identifier: 'imgly_sticker_shapes_arrow_03'},
            {identifier: 'imgly_sticker_shapes_badge_11'},
            {identifier: 'imgly_sticker_shapes_badge_12'},
            {identifier: 'imgly_sticker_shapes_badge_36'},
          ],
        },
      ],
    },
  };
  try {
    // Open the photo editor and handle the export as well as any occurring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      const imagePath = RNFS.DocumentDirectoryPath + '/editedImage.jpg';

      // Save the image to the file manager
      await RNFS.copyFile(result.image, imagePath);

      console.log('Image saved:', imagePath);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoStickerConfigurationExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder2;

  try {
    // Create a `Configuration` object.
    const configuration = {
      sticker: {
        // By default, the user is not allowed to add
        // custom stickers from the local library. For
        // this example, this option is enabled.
        personalStickers: true,

        // By default, the default tint mode for personal stickers
        // is set to `TintMode.NONE`. For this example, this is set
        // to `TintMode.SOLID`
        defaultPersonalStickerTintMode: TintMode.SOLID,

        // By default, a lot of colors are enabled.
        // For this example, only a small selection
        // is enabled.
        colors: [
          {name: 'White', color: [1, 1, 1, 1]},
          {name: 'Black', color: [0, 0, 0, 0]},
        ],

        // By default, all available canvas actions are enabled.
        // For this example, the user is only allowed to undo
        // and redo changes.
        canvasActions: [CanvasAction.UNDO, CanvasAction.REDO],

        // By default, all available sticker actions are enabled.
        // For this example, only a few tools are enabled.
        actions: [StickerAction.COLOR, StickerAction.REPLACE],
      },
    };

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoStickerAppBundleExample = async () => {
  // Add a photo from the assets directory.
  const photo = Images.profile_placeholder2;

  try {
    // Create a `Configuration` object.
    const configuration = {
      sticker: {
        // A custom sticker category.
        categories: [
          {
            identifier: 'custom',
            name: 'Custom',
            thumbnailURI: Images.bell_icon,
            items: [
              // A custom sticker.
              {
                identifier: 'custom_sticker_igor',
                name: 'Igor',
                stickerURI: Images.add_birthday_icon,
              },
              // An existing sticker.
              {identifier: 'imgly_sticker_shapes_badge_01'},
            ],
          },
          // An existing sticker category.
          {identifier: 'imgly_sticker_category_emoticons'},
        ],
      },
    };

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

export const photoTextConfigurationExample = async () => {
  try {
    // Add a photo from the assets directory.
    const photo = Images.profile_placeholder2;

    // Create a `Configuration` object.
    const configuration = {
      text: {
        // By default the editor allows all available text actions.
        // For this example, we only allow changing the colors.
        actions: [TextAction.COLOR, TextAction.BACKGROUND_COLOR],

        // By default the editor allows a bunch of canvas actions in the text tool.
        // For this example, we only allow a couple of them.
        canvasActions: [CanvasAction.DELETE, CanvasAction.BRING_TO_FRONT],

        // By default the editor allows to add emojis as text input.
        // Since emojis are not cross-platform compatible, using the serialization
        // feature to share edits across different platforms will result in emojis
        // being rendered with the system's local set of emojis and therefore will
        // appear differently.
        // For this example emoji input is disabled to ensure a consistent cross-platform experience.
        allowEmojis: false,

        // By default the editor provides a variety of different
        // colors to customize the background color of the text.
        // For this example only a small selection of colors is shown by default
        // e.g. based on favorite colors of the user.
        backgroundColors: [
          {color: [0.9, 0.31, 0.31, 1], name: 'Red'},
          {color: [0.33, 1.0, 0.53, 1], name: 'Green'},
          {color: [1.0, 0.97, 0.39, 1], name: 'Yellow'},
        ],

        // By default the editor provides a variety of different
        // colors to customize the color of the text.
        // For this example only a small selection of colors is shown by default
        // e.g. based on favorite colors of the user.
        textColors: [
          {color: [0, 0, 0, 1], name: 'Black'},
          {color: [1, 1, 1, 1], name: 'White'},
        ],

        // By default the default text color is set to [1, 1, 1, 1].
        // For this example, the default color is set to black.
        defaultTextColor: [0, 0, 0, 1],
      },
    };

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(photo, configuration);

    if (result != null) {
      // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
      console.log(result.image);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the photo.
    console.log(error);
  }
};

const PhotoSDK = () => {
  return (
    <>
      <TopHeader titile={'Photo SDK EDITOR'} />
      <ScrollView>
        <CustomButton
          onPress={openPhotoFromCameraRollExample}
          title={'Open Photo Editor'}
        />
        <CustomButton
          onPress={savePhotoFileSystemExample}
          title={'Open Photo Editor For FileSys'}
        />
        <CustomButton
          onPress={photoTransformConfigurationExample}
          title={'Open Photo Editor For Transform'}
        />
        <CustomButton
          onPress={photoFilterConfgirationExample}
          title={'Open Photo Editor For Filter'}
        />
        <CustomButton
          onPress={photoSnappingConfigurationExample}
          title={'Open Photo Editor For Snapping'}
        />
        <CustomButton
          onPress={photoTextDesignConfigurationExample}
          title={'Open Photo Editor For Text Design'}
        />
        <CustomButton
          onPress={photoFramesConfigurationExample}
          title={'Open Photo Editor For Frames'}
        />
        <CustomButton
          onPress={photoFramesAppBundleExample}
          title={'Open Photo Editor For Frames App Bundle'}
        />
        <CustomButton
          onPress={photoOverlayConfigurationExample}
          title={'Open Photo Editor For Overlays Example'}
        />
        <CustomButton
          onPress={photoOverlayAppBundleExample}
          title={'Open Photo Editor For Overlays Example For Bundle'}
        />
        <CustomButton
          onPress={photoAdjustmentConfigurationExample}
          title={'Open Photo Editor For Adjustmnet Example'}
        />
        <CustomButton
          onPress={photoFocusConfigurationExample}
          title={'Open Photo Editor For Blur Example'}
        />
        <CustomButton
          onPress={photoBrushConfigurationExample}
          title={'Open Photo Editor For Brush Example'}
        />
        <CustomButton
          onPress={photoAnnotationExample}
          title={'Open Photo Editor For Annotation Example'}
        />
        <CustomButton
          onPress={photoStickerConfigurationExample}
          title={'Open Photo Editor For Sticker Example'}
        />
        <CustomButton
          onPress={photoStickerAppBundleExample}
          title={'Open Photo Editor For Sticker Bundle Example'}
        />
        <CustomButton
          onPress={photoTextConfigurationExample}
          title={'Open Photo Editor For Text Example'}
        />
      </ScrollView>
    </>
  );
};

export default PhotoSDK;
