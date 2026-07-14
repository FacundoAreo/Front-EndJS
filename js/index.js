// js/index.js

// Funciones para enviar objetos al array
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// 🖼️ Función que se ocupa de renderizar las tarjetas de producto
const renderizarProductos = () => {
  // Agarramos el div para meter las tarjetas
  const contenedor = document.getElementById("contenedor-tarjetas");
  
  // Verificar si el contenedor existe
  if (!contenedor) {
    console.error("❌ No se encontró el elemento 'contenedor-tarjetas' en el DOM");
    return;
  }

  console.log("🔄 Cargando productos...");

  fetch("./data/productos.json")
    .then((response) => {
      // Verificar si la respuesta es correcta
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("✅ Productos cargados:", data);
      
      // Limpiar el contenedor antes de agregar nuevos elementos
      contenedor.innerHTML = '';
      
      data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const img = document.createElement("img");
        img.src = `./img/${producto.img}`;
        img.alt = producto.nombre;
        // Manejar error de imagen
        img.onerror = () => {
          console.warn(`⚠️ No se pudo cargar la imagen: ${producto.imagen}`);
          img.src = './img/default.jpg';
        };

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion || '';
        descripcion.classList.add('descripcion-producto');

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;
        precio.classList.add('precio-producto');

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
          // Feedback visual
          const textoOriginal = boton.textContent;
          boton.textContent = '✅ Agregado';
          boton.style.backgroundColor = '#48bb78';
          setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.style.backgroundColor = '';
          }, 1500);
        });

        // Armar la estructura de la tarjeta
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        if (producto.descripcion) {
          tarjeta.appendChild(descripcion);
        }
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        // Agregamos la tarjeta al DOM
        contenedor.appendChild(tarjeta);
      });
      
      console.log(`✅ Se renderizaron ${data.length} productos`);
    })
    .catch((error) => {
      console.error("❌ Error al cargar productos:", error);
      // Mostrar mensaje de error en el DOM
      contenedor.innerHTML = `
        <div class="error-mensaje">
          <p>⚠️ No pudimos cargar los productos: ${error.message}</p>
          <button onclick="location.reload()">Reintentar</button>
        </div>
      `;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM cargado, inicializando...");
  
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});