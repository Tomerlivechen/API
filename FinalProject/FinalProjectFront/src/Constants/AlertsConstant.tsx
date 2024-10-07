import Swal from "sweetalert2";

const showErrorDialog = (message: string) =>
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    timer: 2000,
  });
const showSuccessDialog = (message: string) =>
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 2000,
  });

const getText = async (title: string) => {
  const { value: url } = await Swal.fire({
    input: "url",
    inputLabel: `Submit ${title}`,
    inputPlaceholder: "Enter the URL",
    didOpen: () => {
      const popup = document.querySelector('.swal2-popup');
      if (popup) {
        popup.setAttribute('id', 'mySweetAlertModal'); // Ensure popup exists before setting ID
      }
    }
  });
  if (url) {
    Swal.fire(`Entered URL: ${url}`);
  }
  return url;
};

const showImage = (title: string, image: string) =>
  Swal.fire({
    
    title: title,
    imageUrl: image,
    imageAlt: "your image",
  });

export { showErrorDialog, showSuccessDialog, getText, showImage };
export const dialogs = {
  error: showErrorDialog,
  success: showSuccessDialog,
  getText,
  showImage,
};
