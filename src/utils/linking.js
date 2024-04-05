import {utils} from '@react-native-firebase/app';
import {Linking} from 'react-native';
import OneSignal from 'react-native-onesignal';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const deepLinkConfig = {
  // Deep link configuration
  // props name are written in comment
  screens: {
    Add: 'add',
    MyPost: 'mypost',
    HelpSupport: 'helpSupport',
    ProfileNavigator: {
      screens: {
        ProfileView: 'profileView',
        EditProfile: 'editProfile',
        ViewDetailedProfile: 'viewDetailedProfile',
      },
    },
    MyBussinessNavigator: {
      screens: {
        MyBussiness: 'myBussiness',
        AddBussiness: 'addBussiness',
        EditBussiness: 'editBussiness',
      },
    },
    PhotoNavigator: {
      screens: {
        Photo: 'photo',
        PhotoDetail: 'photoDetail',
        PhotoEdit: 'photoEdit',
      },
    },
    CustomSDK: 'customSDK',
    ShareSave: 'shareSave',
    FeedBack: 'feedBack',
  },
};

const Deeplinking = {
  prefixes: [
    'https://postandsharedev.page.link',
    'https://postandshare.com',
    'postandshare://app',
  ],

  // Custom function to get the URL which was used to open the app
  async getInitialURL() {
    // First, you would need to get the initial URL from your third-party integration
    // The exact usage depend on the third-party SDK you use
    // For example, to get to get the initial URL for Firebase Dynamic Links:

    const {isAvailable} = utils().playServicesAvailability;

    if (isAvailable) {
      const initialLink = await dynamicLinks().getInitialLink();
      if (initialLink) {
        return initialLink.url;
      }
    }

    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }
  },

  // Custom function to subscribe to incoming links
  subscribe(listener) {
    // Listen to incoming links from Firebase Dynamic Links
    const unsubscribeFirebase = dynamicLinks().onLink(({url}) => {
      listener(url);
    });

    // // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      listener(url);
    });
    // Listen to onesignal push notifications
    const unsubscribeNotification = OneSignal.setNotificationOpenedHandler(
      async notification => {
        const data = notification.notification.additionalData;
        const userDocId = data?.userDocId;
        const url = data?.url;
        console.log('data in notification', data);
        if (url) {
          // redirect after 2 sec
          setTimeout(() => {
            listener(url);
          }, 3500);
        }
      },
    );

    return () => {
      // Clean up the event listeners
      unsubscribeFirebase();
      linkingSubscription?.remove();
      // unsubscribeNotification();
    };
  },

  config: deepLinkConfig,
};

export default Deeplinking;
