import axios from "axios";
import {  useState } from "react";
import { dialogs } from "../Constants/AlertsConstant";

interface ICloudinaryValues {
    ImageUrl : string;
    Value : File;
    setImageURL : (Value: File) => void;
    clear: () => void;
}


const useCloudinary = () : [string, File | null, (file: File) => Promise<void>,() => void]=> {
   const [imageUrl, setImageURL] = useState("")
   const [file, setFile] = useState<File | null>(null);

   const clear = () => {
    setImageURL("")
    setFile(null)
   }

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
  } finally {
    ;
  }
}

  const handleSetImageURL = async (file: File) => {
    setFile(file);
    await uploadToCloudinary(file);
};


return [imageUrl, file, handleSetImageURL, clear];
}

export { useCloudinary };


