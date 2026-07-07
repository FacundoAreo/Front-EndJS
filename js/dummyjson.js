document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos-dummy");
  
  // Limpiar contenedor (por si hay contenido previo)
  contenedor.innerHTML = "";
  
  const titulo = document.createElement("h1");
  titulo.textContent = "🌟 Productos DummyJSON";
  contenedor.appendChild(titulo);

  let categoria = "healt";

  if (categoria) {
    const tituloCategoria = document.createElement("h2");
    tituloCategoria.textContent = `Categoría: ${categoria}`;
    contenedor.appendChild(tituloCategoria);
  }

  let urlCategoria = `https://dummyjson.com/products/category/${categoria}`;

  fetch(urlCategoria)
    .then((response) => response.json())
    .then((data) => {
      data.products.forEach((prod) => {
        const tarjeta = document.createElement("article");
        const titulo = document.createElement("h1");
        const precio = document.createElement("p");
        const imagen = document.createElement("img");
        const boton = document.createElement("button");

        titulo.textContent = prod.title;
        precio.textContent = `$${prod.price}`;
        imagen.src = prod.images[0];
        imagen.alt = prod.title;
        imagen.loading = "lazy";
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          if (window.agregarAlCarrito) {
            window.agregarAlCarrito({
              id: prod.id.toString(),
              origen: "dummyjson",
              titulo: prod.title,
              precio: prod.price,
              imagen: prod.images[0]
            });
          }
        });

        tarjeta.append(imagen, titulo, precio, boton);
        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => {
      console.error("Error al cargar DummyJSON:", error);
      const mensajeError = document.createElement("p");
      mensajeError.textContent = "❌ Error al cargar productos. Intenta nuevamente.";
      mensajeError.style.color = "red";
      contenedor.appendChild(mensajeError);
    });
});