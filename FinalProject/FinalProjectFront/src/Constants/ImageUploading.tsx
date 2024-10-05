import { FcAddImage } from "react-icons/fc";
import { usePosts } from "../CustomHooks/usePosts";
const ImageUpload = () => {
  const postsContext = usePosts();

  const handleFileChange = (event) => {
    postsContext.setSelectedFile(event.target.files[0]);
    postsContext.toggleImageURL("");
  };

  return (
    <>
      <p>Image Upload</p>
      <div className="flex items-center pl-10 p-2 mt-1">
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="file-input"
            hidden
          />
          <label htmlFor="file-input" style={{ cursor: "pointer" }}>
            <FcAddImage size={40} />
          </label>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
