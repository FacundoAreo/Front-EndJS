//Funcion que actualiza el contador de productos en la nav
export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
};

//Esta funcion les puede servir para cuando agreguen librerias
export const mostrarMensaje = (texto) => {
  alert(texto);
};
