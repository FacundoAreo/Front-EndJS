// ===== NAVEGACIÓN ENTRE SECCIONES =====

document.addEventListener("DOMContentLoaded", () => {
  const linkInicio = document.getElementById("link-inicio");
  const linkContacto = document.getElementById("link-contacto");
  const linkCarrito = document.getElementById("link-carrito");
  
  const seccionProductos = document.getElementById("seccion-productos");
  const seccionContacto = document.getElementById("seccion-contacto");
  const seccionCarrito = document.getElementById("seccion-carrito");

  // Función para mostrar una sección y ocultar las demás
  function mostrarSeccion(seccionAMostrar) {
    // Ocultar todas
    if (seccionProductos) seccionProductos.style.display = "none";
    if (seccionContacto) seccionContacto.style.display = "none";
    if (seccionCarrito) seccionCarrito.style.display = "none";
    
    // Mostrar la seleccionada
    if (seccionAMostrar) seccionAMostrar.style.display = "block";
    
    // Remover clase active de todos los links
    document.querySelectorAll("nav ul li a").forEach(link => {
      link.classList.remove("active");
    });
  }

  // Evento: Inicio
  if (linkInicio) {
    linkInicio.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(seccionProductos);
      linkInicio.classList.add("active");
      // Renderizar carrito por si se actualizó desde otra sección
      if (window.renderizarCarrito) window.renderizarCarrito();
    });
  }

  // Evento: Contacto
  if (linkContacto) {
    linkContacto.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(seccionContacto);
      linkContacto.classList.add("active");
    });
  }

  // Evento: Carrito
  if (linkCarrito) {
    linkCarrito.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(seccionCarrito);
      linkCarrito.classList.add("active");
      if (window.renderizarCarrito) window.renderizarCarrito();
    });
  }

  // Mostrar inicio por defecto
  if (seccionProductos) {
    seccionProductos.style.display = "block";
    if (linkInicio) linkInicio.classList.add("active");
  }
});