// ===== PRODUCTOS MANUALES =====

// Lista de productos agregados manualmente
const productosManuales = [
  {
    id: "m1",
    titulo: "Kit de Cultivo Hongos Ostra",
    precio: 4500,
    imagen: "https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Kit+Hongos",
    descripcion: "Kit completo para cultivar hongos ostra en casa. Incluye sustrato, esporas y manual."
  },
  {
    id: "m2",
    titulo: "Lámpara LED para Cultivo",
    precio: 3200,
    imagen: "https://via.placeholder.com/300x300/2196F3/FFFFFF?text=Lámpara+LED",
    descripcion: "Lámpara LED full spectrum para cultivo interior. 50W, bajo consumo."
  },
  {
    id: "m3",
    titulo: "Sustrato Premium para Hongos",
    precio: 1800,
    imagen: "https://via.placeholder.com/300x300/FF9800/FFFFFF?text=Sustrato",
    descripcion: "Sustrato estéril enriquecido con nutrientes para máximo rendimiento."
  },
  {
    id: "m4",
    titulo: "Termohigrómetro Digital",
    precio: 2800,
    imagen: "https://via.placeholder.com/300x300/9C27B0/FFFFFF?text=Termohigrómetro",
    descripcion: "Mide temperatura y humedad en tiempo real. Ideal para control de cultivo."
  },
  {
    id: "m5",
    titulo: "Set de Herramientas para Cultivo",
    precio: 3900,
    imagen: "https://via.placeholder.com/300x300/F44336/FFFFFF?text=Herramientas",
    descripcion: "Set completo con pinzas, tijeras, pulverizador y guantes estériles."
  },
  {
    id: "m6",
    titulo: "Humidificador Ultrasónico",
    precio: 5500,
    imagen: "https://via.placeholder.com/300x300/00BCD4/FFFFFF?text=Humidificador",
    descripcion: "Humidificador ultrasónico con depósito de 3L. Mantiene la humedad ideal."
  },
 {
    id: "m7",
    titulo: "Tintura madre de Ostra Edulis",
    precio: 50000,
    imagen: "imagenes/OstraEdulis100ml.png",
    descripcion: "Tintura madre de Ostra Edulis."
  }
];

// Función para renderizar productos manuales
function renderizarProductosManuales() {
  const contenedor = document.getElementById("contenedor-productos-manuales");
  
  if (!contenedor) return;
  
  // Limpiar contenedor
  contenedor.innerHTML = "";
  
  // Título de la sección
  const tituloSeccion = document.createElement("h1");
  tituloSeccion.textContent = "🛍️ Productos Destacados";
  contenedor.appendChild(tituloSeccion);
  
  // Crear tarjetas para cada producto
  productosManuales.forEach((prod) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto-manual";
    
    const imagen = document.createElement("img");
    imagen.src = prod.imagen;
    imagen.alt = prod.titulo;
    imagen.loading = "lazy";
    
    const titulo = document.createElement("h2");
    titulo.textContent = prod.titulo;
    
    const descripcion = document.createElement("p");
    descripcion.className = "descripcion";
    descripcion.textContent = prod.descripcion;
    
    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = `$${prod.precio}`;
    
    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";
    boton.className = "btn-agregar";
    
    // Evento para agregar al carrito
    boton.addEventListener("click", () => {
      if (window.agregarAlCarrito) {
        window.agregarAlCarrito({
          id: prod.id,
          origen: "manual",
          titulo: prod.titulo,
          precio: prod.precio,
          imagen: prod.imagen
        });
      }
    });
    
    tarjeta.append(imagen, titulo, descripcion, precio, boton);
    contenedor.appendChild(tarjeta);
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductosManuales();
});