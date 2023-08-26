import { UploadFile } from 'antd/lib/upload/interface';
import { message } from 'antd';


export const beforeUpload = (file: File) => {
  const isJpgOrPng = 
    file.type === 'image/jpeg' || 
    file.type === 'image/png' || 
    file.type === 'image/jpg' || 
    file.type === 'image/gif' || 
    file.type === 'image/webp';
  if (!isJpgOrPng){
    message.error('You can only upload JPG/PNG file!');
  }
  return isJpgOrPng;
}

export const beforeUploadVideo = (file: File) => {
  const isVideo =
    file.type === 'video/mp4' ||
    file.type === 'video/ogg' ||
    file.type === 'video/webm' ||
    file.type === 'video/mkv';
  if (!isVideo) {
    message.error('You can only upload video files!');
  }
  return isVideo;
}

export const uploadOnChange = (info: { file: UploadFile, fileList: UploadFile[] }) => {
  if (info.file.status !== 'uploading') {
    console.log('Updated file list:', info.fileList);
    message.success(`${info.file.name} file uploaded successfully`);
  }
};

