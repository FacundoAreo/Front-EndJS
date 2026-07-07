document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos-fakestore");

  const titulo = document.createElement("h1");
  titulo.textContent = "FAKESTORE API";
  contenedor.appendChild(titulo);

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((prod) => {
        const tarjeta = document.createElement("article");
        const titulo = document.createElement("h1");
        const precio = document.createElement("p");
        const imagen = document.createElement("img");
        const boton = document.createElement("button");

        titulo.textContent = prod.title;
        precio.textContent = `$${prod.price}`;
        imagen.src = prod.image;
        boton.textContent = "Agregar al carrito";

        // Evento para agregar al carrito
        boton.addEventListener("click", () => {
          if (window.agregarAlCarrito) {
            window.agregarAlCarrito({
              id: prod.id.toString(),
              origen: "fakestore",
              titulo: prod.title,
              precio: prod.price,
              imagen: prod.image
            });
          }
        });

        tarjeta.append(imagen, titulo, precio, boton);
        contenedor.appendChild(tarjeta);
      })
    )
    .catch((error) => console.error("Error al cargar FakeStore:", error));
});