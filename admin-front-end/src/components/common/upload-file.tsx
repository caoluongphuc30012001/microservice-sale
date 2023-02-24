import { Upload } from "antd";
import axios from "axios";
import React from "react";

type PublicIdProps = {
  publicId: string | undefined;
  setPublicId: (id: string) => void;
};

type UploadFileProps = {
  children: React.ReactNode;
  setUrl: (url: string) => void;
  urlAction: string;
  publicProps: PublicIdProps;
  showUploadList?: boolean;
};

type UploadResponseType = {
  public_id: string;
  url: string;
};

function UploadFileCustom({
  children,
  setUrl,
  urlAction,
  publicProps,
  showUploadList = true,
}: UploadFileProps) {
  //function delete image upload on server
  const onDelete = async () => {
    try {
      if (publicProps.publicId) {
        await axios.delete(urlAction, {
          data: {
            public_id: publicProps.publicId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function upload avatar
  const onUpload = async (response: UploadResponseType) => {
    try {
      await onDelete();
      setUrl(response.url);
      publicProps.setPublicId(response.public_id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Upload
      maxCount={1}
      onChange={({ file }) => {
        if (file.response) {
          onUpload(file.response.data);
        }
      }}
      action={urlAction}
      showUploadList={showUploadList}
      listType="picture"
    >
      {children}
    </Upload>
  );
}

export default UploadFileCustom;
