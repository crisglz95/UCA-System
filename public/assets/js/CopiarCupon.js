// Copiar codigo de cupon
let btn = document
  .getElementById("btnCopy")
  .addEventListener("click", copyCode);

const copiedText = document.getElementById("text").innerHTML;
function copyCode() {
  navigator.clipboard.writeText(copiedText);
  //  sweet alert
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Copiado",
    showConfirmButton: false,
    timer: 1500,
  });
}
