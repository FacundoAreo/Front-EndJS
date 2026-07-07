// ===== SECCIÓN DE CONTACTO =====

document.addEventListener("DOMContentLoaded", () => {
  const formContacto = document.getElementById("form-contacto");
  const mensajeEnviado = document.getElementById("mensaje-enviado");

  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();

      // Obtener datos del formulario
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Validación básica
      if (!nombre || !email || !mensaje) {
        alert("⚠️ Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Guardar en LocalStorage (opcional)
      const datosContacto = {
        nombre,
        email,
        telefono,
        mensaje,
        fecha: new Date().toISOString()
      };
      localStorage.setItem("ultimoMensajeContacto", JSON.stringify(datosContacto));

      // Mostrar mensaje de éxito
      formContacto.reset();
      mensajeEnviado.style.display = "block";

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        mensajeEnviado.style.display = "none";
      }, 5000);

      console.log("Datos de contacto enviados:", datosContacto);
    });
  }

  // Cargar datos guardados previamente (si existen)
  const datosGuardados = localStorage.getItem("ultimoMensajeContacto");
  if (datosGuardados) {
    try {
      const datos = JSON.parse(datosGuardados);
      // Opcional: precargar campos si quieres
      // document.getElementById("nombre").value = datos.nombre || "";
      // document.getElementById("email").value = datos.email || "";
      // document.getElementById("telefono").value = datos.telefono || "";
    } catch (e) {}
  }
});