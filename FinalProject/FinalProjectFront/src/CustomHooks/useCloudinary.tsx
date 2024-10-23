import axios from "axios";
import { useState } from "react";
import { dialogs } from "../Constants/AlertsConstant";

interface ICloudinaryValues {
  imageUrl: string;
  file: File | null;
  holdFile: (file: File) => void;
  handleSetImageURL: (file: File) => Promise<void>;
  clear: () => void;
}

const useCloudinary = (): [
  string,
  File | null,
  (file: File) => void,
  (file: File) => Promise<void>,
  () => void
] => {
  const [imageUrl, setImageURL] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const clear = () => {
    setImageURL("");
    setFile(null);
  };

  const uploadToCloudinary = async (file: File): Promise<void> => {
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Default_Project_Preset");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData
      );
      setImageURL(response.data.secure_url);
    } catch (e) {
      console.error(e);
      dialogs.error("Image upload failed");
    }
  };

  const handleSetImageURL = async (file: File) => {
    setFile(file);
    await uploadToCloudinary(file);
  };

  const holdFile = (file: File) => {
    setFile(file);
  };

  return [imageUrl, file, holdFile, handleSetImageURL, clear];
};

export { useCloudinary };
