import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  //usamos la funcion que pide el carrito al localStorage
  const carrito = obtenerCarrito();
  carrito.push(producto);

  //usamos la funcion que guarda el carrito en el localStorage
  guardarCarrito(carrito);

  //usamos la funcion UI que actualiza en numero en carrito
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado 🎉");
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  //Elimina un elemento del array
  carrito.splice(indice, 1);

  //actualizamos el carrito en el localStorage
  guardarCarrito(carrito);

  //actualizamos el contador
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado ✅");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado");
};
