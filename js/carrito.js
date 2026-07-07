// ===== CARRITO DE COMPRAS =====

// Estado del carrito (se guarda en LocalStorage)
let carrito = [];

// Cargar carrito desde LocalStorage al iniciar
function cargarCarritoDesdeStorage() {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    try {
      carrito = JSON.parse(guardado);
    } catch (e) {
      carrito = [];
    }
  }
  actualizarContador();
}

// Guardar carrito en LocalStorage
function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// Actualizar el contador del ícono del carrito
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = totalItems;
  }
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  // Verificar si el producto ya está en el carrito
  const existente = carrito.find(item => item.id === producto.id && item.origen === producto.origen);
  
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      origen: producto.origen,
      titulo: producto.titulo,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  
  guardarCarritoEnStorage();
  renderizarCarrito();
  mostrarNotificacion(`✅ ${producto.titulo} agregado al carrito`);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id, origen) {
  carrito = carrito.filter(item => !(item.id === id && item.origen === origen));
  guardarCarritoEnStorage();
  renderizarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    carrito = [];
    guardarCarritoEnStorage();
    renderizarCarrito();
    mostrarNotificacion("🗑️ Carrito vaciado");
  }
}

// Calcular el total del carrito
function calcularTotal() {
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Renderizar el carrito en el DOM
function renderizarCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  const totalContainer = document.getElementById("total-carrito");
  
  if (!contenedor) return;
  
  if (carrito.length === 0) {
    contenedor.innerHTML = `<div class="carrito-vacio">🛒 El carrito está vacío</div>`;
    if (totalContainer) totalContainer.textContent = "";
    return;
  }
  
  let html = "";
  carrito.forEach(item => {
    html += `
      <div class="carrito-item">
        <img src="${item.imagen}" alt="${item.titulo}" />
        <div class="info">
          <h4>${item.titulo}</h4>
          <p>$${item.precio} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}</p>
        </div>
        <div class="acciones">
          <button onclick="eliminarDelCarrito('${item.id}', '${item.origen}')">✕</button>
        </div>
      </div>
    `;
  });
  
  contenedor.innerHTML = html;
  
  if (totalContainer) {
    const total = calcularTotal();
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Mostrar notificación temporal
function mostrarNotificacion(mensaje) {
  // Buscar o crear contenedor de notificaciones
  let notificacion = document.getElementById("notificacion-temporal");
  if (!notificacion) {
    notificacion = document.createElement("div");
    notificacion.id = "notificacion-temporal";
    notificacion.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(notificacion);
  }
  
  notificacion.textContent = mensaje;
  notificacion.style.opacity = "1";
  
  // Ocultar después de 2.5 segundos
  clearTimeout(notificacion._timeout);
  notificacion._timeout = setTimeout(() => {
    notificacion.style.opacity = "0";
  }, 2500);
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarNotificacion("⚠️ El carrito está vacío");
    return;
  }
  
  const total = calcularTotal();
  const mensaje = `✅ ¡Compra realizada con éxito!\nTotal: $${total.toFixed(2)}\n\nGracias por tu compra.`;
  alert(mensaje);
  
  // Opcional: enviar datos por email o guardar en localStorage
  // Por ahora, vaciamos el carrito después de "comprar"
  carrito = [];
  guardarCarritoEnStorage();
  renderizarCarrito();
  mostrarNotificacion("🎉 ¡Compra finalizada! Gracias.");
}

// Inicializar carrito cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDesdeStorage();
  renderizarCarrito();
  
  // Evento para vaciar carrito
  const vaciarBtn = document.getElementById("vaciar-carrito");
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", vaciarCarrito);
  }
  
  // Evento para finalizar compra
  const finalizarBtn = document.getElementById("finalizar-compra");
  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", finalizarCompra);
  }
});

// Hacer funciones globales para usarlas desde otros archivos
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;