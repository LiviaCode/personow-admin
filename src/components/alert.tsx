import Swal from "sweetalert2";

export const alertSuccess = (text: string) =>
  Swal.fire({ text, icon: "success", confirmButtonText: "OK" });

export const alertError = (text: string) =>
  Swal.fire({ text, icon: "error", confirmButtonText: "OK" });
