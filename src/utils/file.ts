import AWS from "aws-sdk"; // Import entire SDK (optional)
// import AWS from 'aws-sdk/global'; // Import global AWS namespace (recommended)
import S3 from "aws-sdk/clients/s3"; // Import only the S3 client

const base_img = import.meta.env.VITE_BASE_IMAGE_LINK;
const S3_BUCKET = import.meta.env.VITE_DEV_S3_BUCKET; // Replace with your bucket name
const REGION = import.meta.env.VITE_REGION; // Replace with your region

AWS.config.update({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_S_ACCESS_KEY,
});

const s3 = new S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadFile = async (file: File) => {
  if (!file) return;

  const params = {
    Bucket: S3_BUCKET,
    Key: `image/${file.name}`,
    Body: file,
  };

  try {
    await s3.putObject(params).promise();

    return `${base_img}${params.Key}`;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      alert("Error uploading file: " + error.message); // Inform user about the error
    }
  }
};

export const deleteFile = async (fileName: string) => {
  if (!fileName) return;

  const params = {
    Bucket: S3_BUCKET,
    Key: `image/${fileName}`,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error(error);
  }
};
