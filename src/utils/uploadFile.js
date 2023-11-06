
import {uriToBlob} from '../helpers/commonFunction';

const uploadFile = async ({filePath, fileLocation, contentType}) => {
  try {
    const fileBlob = await uriToBlob(filePath.path);

    // let file_s3_response = await Storage.put(fileLocation, fileBlob, {
    //   level: 'public',
    //   contentType: contentType,
    // });

    let response = (
        fileLocation ,
        fileBlob,
        {contentType: contentType,}
    )

    return {
    //   fileS3Path: `s3://ekalsutra/public/` + file_s3_response?.key,
    //   fileURL: `https://ekalsutra.s3.ap-south-1.amazonaws.com/public/${file_s3_response?.key}`,
        fileURL: `${response?.key}`
    };
  } catch (err) {
    console.error(err);
    return {error: err};
  }
};
export default uploadFile;
