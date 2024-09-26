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
export { showErrorDialog, showSuccessDialog };
export const dialogs = { error: showErrorDialog, success: showSuccessDialog };
