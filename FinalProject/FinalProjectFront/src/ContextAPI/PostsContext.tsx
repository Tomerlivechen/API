import axios from "axios";
import { createContext, useState } from "react";
import { dialogs } from "../Constants/AlertsConstant";

const initialValues = {
  imageURL: "",
  selectedFile: null as File | null,
  setSelectedFile: (file: File | null) => {},
  toggleImageURL: (image: string) => {},
  handleUpload: () => {},
  clearImage: () => {},
};

const PostsContext = createContext(initialValues);

function PostsProvider({ children }) {
  const [imageURL, setImageURL] = useState(initialValues.imageURL);
  const Cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const toggleImageURL = (image) => {
    setImageURL(image);
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImageURL("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "Default_Project_Preset");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${Cloudname}/image/upload`,
        formData
      );
      setImageURL(response.data.secure_url);
    } catch (e) {
      console.error(e);
      dialogs.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        imageURL,
        selectedFile,
        setSelectedFile,
        toggleImageURL,
        handleUpload,
        clearImage,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export { PostsContext, PostsProvider };
