/* =========================================================================
   script.js
   -------------------------------------------------------------------------
   Lógica del portal de preventa. Todo el flujo es UNA sola página
   (index.html) donde vamos mostrando y ocultando "pantallas" según el
   paso en el que esté el cliente.

   Esta primera fase NO se conecta a ningún pago, base de datos o
   servicio externo: todo el pedido se guarda temporalmente en el propio
   navegador (localStorage) solo para que la demo se sienta completa.
   ========================================================================= */

// -----------------------------------------------------------------------
// 1. ESTADO DEL PEDIDO
// -----------------------------------------------------------------------
const CLAVE_GUARDADO = "madero_preventa_estado";

const ORDEN_PASOS = [
  "inicio",
  "sucursal",
  "productos",
  "carrito",
  "recogida",
  "datos",
  "resumen",
  "confirmacion",
];

let estado = {
  pasoActual: "inicio",
  sucursal: null,
  carrito: {}, // { [productoId]: cantidad }
  fecha: "",
  horario: "",
  cliente: { nombre: "", telefono: "", correo: "" },
  numeroPedido: null,
};

function guardarEstado() {
  localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(estado));
}

function cargarEstado() {
  const guardado = localStorage.getItem(CLAVE_GUARDADO);
  if (!guardado) return;
  try {
    const datos = JSON.parse(guardado);
    estado = { ...estado, ...datos };
  } catch (e) {
    console.warn("No se pudo leer el pedido guardado, se inicia de nuevo.");
  }
}

// -----------------------------------------------------------------------
// 2. UTILIDADES
// -----------------------------------------------------------------------
function formatoMoneda(numero) {
  return numero.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

function obtenerProducto(id) {
  return PRODUCTOS.find((p) => p.id === id);
}

function totalArticulosCarrito() {
  return Object.values(estado.carrito).reduce((suma, cant) => suma + cant, 0);
}

function subtotalCarrito() {
  return Object.entries(estado.carrito).reduce((suma, [id, cant]) => {
    const producto = obtenerProducto(id);
    return producto ? suma + producto.precio * cant : suma;
  }, 0);
}

// -----------------------------------------------------------------------
// 3. NAVEGACIÓN ENTRE PASOS
// -----------------------------------------------------------------------
function irAPaso(paso, { validar = true } = {}) {
  if (validar && !validarAntesDeAvanzar(estado.pasoActual, paso)) return;

  estado.pasoActual = paso;
  guardarEstado();

  document.querySelectorAll(".pantalla").forEach((el) => {
    el.classList.toggle("pantalla--activa", el.dataset.paso === paso);
  });

  actualizarBarraProgreso();
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Cada vez que entramos a una pantalla, la refrescamos con los datos actuales
  if (paso === "carrito") renderizarCarrito();
  if (paso === "resumen") renderizarResumen();
  if (paso === "productos") actualizarBarraFlotante();
}

function validarAntesDeAvanzar(pasoOrigen, pasoDestino) {
  const indiceOrigen = ORDEN_PASOS.indexOf(pasoOrigen);
  const indiceDestino = ORDEN_PASOS.indexOf(pasoDestino);
  const esRetroceso = indiceDestino < indiceOrigen;
  if (esRetroceso) return true; // siempre se puede regresar

  switch (pasoOrigen) {
    case "sucursal":
      if (!estado.sucursal) {
        alert("Por favor selecciona una sucursal para continuar.");
        return false;
      }
      return true;

    case "productos":
      if (totalArticulosCarrito() === 0) {
        alert("Agrega al menos un producto a tu pedido para continuar.");
        return false;
      }
      return true;

    case "carrito":
      if (totalArticulosCarrito() === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de continuar.");
        return false;
      }
      return true;

    case "recogida":
      if (!estado.fecha || !estado.horario) {
        alert("Selecciona una fecha y un horario de recogida.");
        return false;
      }
      return true;

    case "datos": {
      const { nombre, telefono, correo } = estado.cliente;
      if (!nombre.trim() || !telefono.trim() || !correo.trim()) {
        alert("Completa nombre, teléfono y correo para continuar.");
        return false;
      }
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
      if (!correoValido) {
        alert("Ingresa un correo electrónico válido.");
        return false;
      }
      return true;
    }

    default:
      return true;
  }
}

function actualizarBarraProgreso() {
  const indiceActual = ORDEN_PASOS.indexOf(estado.pasoActual);
  document.querySelectorAll(".progreso__paso").forEach((el) => {
    const indicePaso = ORDEN_PASOS.indexOf(el.dataset.paso);
    el.classList.toggle("progreso__paso--activo", indicePaso === indiceActual);
    el.classList.toggle("progreso__paso--completo", indicePaso < indiceActual);
  });
}

// -----------------------------------------------------------------------
// 4. PANTALLA: SUCURSAL
// -----------------------------------------------------------------------
function renderizarSucursales() {
  const contenedor = document.getElementById("lista-sucursales");
  contenedor.innerHTML = "";

  const estados = [...new Set(SUCURSALES.map((sucursal) => sucursal.estado))];

  estados.forEach((nombreEstado) => {
    const grupo = document.createElement("div");
    grupo.className = "grupo-sucursales";

    const tituloEstado = document.createElement("h3");
    tituloEstado.className = "titulo-estado";
    tituloEstado.textContent = nombreEstado;

    const grid = document.createElement("div");
    grid.className = "grid-sucursales-estado";

    SUCURSALES
      .filter((sucursal) => sucursal.estado === nombreEstado)
      .forEach((sucursal) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "tarjeta-sucursal";

        boton.innerHTML = `
          <span class="tarjeta-sucursal__nombre">${sucursal.nombre}</span>
          <span class="tarjeta-sucursal__direccion">${sucursal.direccion}</span>
        `;

        if (estado.sucursal === sucursal.nombre) {
          boton.classList.add("tarjeta-sucursal--elegida");
        }

        boton.addEventListener("click", () => {
          estado.sucursal = sucursal.nombre;
          guardarEstado();
          renderizarSucursales();

          document.getElementById("sucursal-elegida-texto").textContent =
            `${sucursal.nombre} — ${sucursal.direccion}`;
        });

        grid.appendChild(boton);
      });

    grupo.appendChild(tituloEstado);
    grupo.appendChild(grid);
    contenedor.appendChild(grupo);
  });

  const sucursalActual = SUCURSALES.find(
    (sucursal) => sucursal.nombre === estado.sucursal
  );

  document.getElementById("sucursal-elegida-texto").textContent =
    sucursalActual
      ? `${sucursalActual.nombre} — ${sucursalActual.direccion}`
      : "Ninguna seleccionada todavía";
}

// -----------------------------------------------------------------------
// 5. PANTALLA: PRODUCTOS
// -----------------------------------------------------------------------
function renderizarProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  // Agrupamos por categoría para que el catálogo se lea ordenado
  const categorias = [...new Set(PRODUCTOS.map((p) => p.categoria))];

  categorias.forEach((categoria) => {
    const encabezado = document.createElement("h3");
    encabezado.className = "categoria-titulo";
    encabezado.textContent = categoria;
    contenedor.appendChild(encabezado);

    const grid = document.createElement("div");
    grid.className = "grid-productos";

    PRODUCTOS.filter((p) => p.categoria === categoria).forEach((producto) => {
      grid.appendChild(crearTarjetaProducto(producto));
    });

    contenedor.appendChild(grid);
  });

  actualizarBarraFlotante();
}

function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-producto";

  const cantidadActual = estado.carrito[producto.id] || 0;

  tarjeta.innerHTML = `
    <div class="tarjeta-producto__imagen" aria-hidden="true">${producto.icono}</div>
    <div class="tarjeta-producto__cuerpo">
      <span class="tarjeta-producto__etiqueta">Producto de ejemplo</span>
      <h4 class="tarjeta-producto__nombre">${producto.nombre}</h4>
      <p class="tarjeta-producto__descripcion">${producto.descripcion}</p>
      <p class="tarjeta-producto__precio">${formatoMoneda(producto.precio)}</p>
      <div class="selector-cantidad">
        <button type="button" class="selector-cantidad__btn" data-accion="restar">−</button>
        <span class="selector-cantidad__valor">${cantidadActual}</span>
        <button type="button" class="selector-cantidad__btn" data-accion="sumar">+</button>
      </div>
      <button type="button" class="boton boton--secundario boton--completo btn-agregar">
        Agregar al pedido
      </button>
    </div>
  `;

  const valorCantidad = tarjeta.querySelector(".selector-cantidad__valor");
  let cantidadLocal = cantidadActual;

  tarjeta.querySelector('[data-accion="sumar"]').addEventListener("click", () => {
    cantidadLocal += 1;
    valorCantidad.textContent = cantidadLocal;
  });

  tarjeta.querySelector('[data-accion="restar"]').addEventListener("click", () => {
    cantidadLocal = Math.max(0, cantidadLocal - 1);
    valorCantidad.textContent = cantidadLocal;
  });

  tarjeta.querySelector(".btn-agregar").addEventListener("click", () => {
    if (cantidadLocal <= 0) {
      alert("Selecciona al menos 1 para agregarlo al pedido.");
      return;
    }
    estado.carrito[producto.id] = cantidadLocal;
    guardarEstado();
    actualizarBarraFlotante();
    tarjeta.classList.add("tarjeta-producto--agregada");
    setTimeout(() => tarjeta.classList.remove("tarjeta-producto--agregada"), 600);
  });

  return tarjeta;
}

function actualizarBarraFlotante() {
  const barra = document.getElementById("barra-flotante-carrito");
  const totalArticulos = totalArticulosCarrito();

  if (totalArticulos === 0) {
    barra.classList.remove("barra-flotante--visible");
    return;
  }

  barra.classList.add("barra-flotante--visible");
  document.getElementById("barra-flotante-cantidad").textContent = totalArticulos;
  document.getElementById("barra-flotante-subtotal").textContent = formatoMoneda(subtotalCarrito());
}

// -----------------------------------------------------------------------
// 6. PANTALLA: CARRITO
// -----------------------------------------------------------------------
function renderizarCarrito() {
  const contenedor = document.getElementById("tabla-carrito-cuerpo");
  const vacio = document.getElementById("carrito-vacio");
  contenedor.innerHTML = "";

  const items = Object.entries(estado.carrito).filter(([, cant]) => cant > 0);

  if (items.length === 0) {
    vacio.style.display = "block";
    document.getElementById("tabla-carrito").style.display = "none";
    document.getElementById("carrito-total").textContent = formatoMoneda(0);
    return;
  }

  vacio.style.display = "none";
  document.getElementById("tabla-carrito").style.display = "table";

  items.forEach(([id, cantidad]) => {
    const producto = obtenerProducto(id);
    if (!producto) return;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="celda-producto">
        <span class="celda-producto__icono" aria-hidden="true">${producto.icono}</span>
        <span>${producto.nombre}</span>
      </td>
      <td>
        <div class="selector-cantidad selector-cantidad--tabla">
          <button type="button" class="selector-cantidad__btn" data-accion="restar">−</button>
          <span class="selector-cantidad__valor">${cantidad}</span>
          <button type="button" class="selector-cantidad__btn" data-accion="sumar">+</button>
        </div>
      </td>
      <td>${formatoMoneda(producto.precio)}</td>
      <td>${formatoMoneda(producto.precio * cantidad)}</td>
      <td>
        <button type="button" class="boton-eliminar" title="Eliminar producto">Eliminar</button>
      </td>
    `;

    fila.querySelector('[data-accion="sumar"]').addEventListener("click", () => {
      estado.carrito[id] += 1;
      guardarEstado();
      renderizarCarrito();
    });

    fila.querySelector('[data-accion="restar"]').addEventListener("click", () => {
      estado.carrito[id] = Math.max(0, estado.carrito[id] - 1);
      if (estado.carrito[id] === 0) delete estado.carrito[id];
      guardarEstado();
      renderizarCarrito();
    });

    fila.querySelector(".boton-eliminar").addEventListener("click", () => {
      delete estado.carrito[id];
      guardarEstado();
      renderizarCarrito();
    });

    contenedor.appendChild(fila);
  });

  document.getElementById("carrito-total").textContent = formatoMoneda(subtotalCarrito());
}

// -----------------------------------------------------------------------
// 7. PANTALLA: RECOGIDA
// -----------------------------------------------------------------------
function inicializarRecogida() {
  const inputFecha = document.getElementById("input-fecha");
  const hoy = new Date().toISOString().split("T")[0];
  inputFecha.min = hoy;
  inputFecha.value = estado.fecha || "";

  inputFecha.addEventListener("change", (e) => {
    estado.fecha = e.target.value;
    guardarEstado();
  });

  const selectHorario = document.getElementById("select-horario");
  selectHorario.innerHTML = '<option value="">Selecciona un horario</option>';
  HORARIOS.forEach((horario) => {
    const opcion = document.createElement("option");
    opcion.value = horario;
    opcion.textContent = horario;
    if (estado.horario === horario) opcion.selected = true;
    selectHorario.appendChild(opcion);
  });

  selectHorario.addEventListener("change", (e) => {
    estado.horario = e.target.value;
    guardarEstado();
  });
}

// -----------------------------------------------------------------------
// 8. PANTALLA: DATOS DEL CLIENTE
// -----------------------------------------------------------------------
function inicializarDatosCliente() {
  const inputNombre = document.getElementById("input-nombre");
  const inputTelefono = document.getElementById("input-telefono");
  const inputCorreo = document.getElementById("input-correo");

  inputNombre.value = estado.cliente.nombre;
  inputTelefono.value = estado.cliente.telefono;
  inputCorreo.value = estado.cliente.correo;

  inputNombre.addEventListener("input", (e) => {
    estado.cliente.nombre = e.target.value;
    guardarEstado();
  });
  inputTelefono.addEventListener("input", (e) => {
    estado.cliente.telefono = e.target.value;
    guardarEstado();
  });
  inputCorreo.addEventListener("input", (e) => {
    estado.cliente.correo = e.target.value;
    guardarEstado();
  });
}

// -----------------------------------------------------------------------
// 9. PANTALLA: RESUMEN
// -----------------------------------------------------------------------
function renderizarResumen() {
  document.getElementById("resumen-sucursal").textContent = estado.sucursal || "—";
  document.getElementById("resumen-fecha").textContent = formatearFechaLegible(estado.fecha);
  document.getElementById("resumen-horario").textContent = estado.horario || "—";
  document.getElementById("resumen-nombre").textContent = estado.cliente.nombre || "—";
  document.getElementById("resumen-telefono").textContent = estado.cliente.telefono || "—";
  document.getElementById("resumen-correo").textContent = estado.cliente.correo || "—";

  const listaResumen = document.getElementById("resumen-productos");
  listaResumen.innerHTML = "";

  Object.entries(estado.carrito)
    .filter(([, cant]) => cant > 0)
    .forEach(([id, cantidad]) => {
      const producto = obtenerProducto(id);
      if (!producto) return;
      const fila = document.createElement("li");
      fila.className = "resumen-producto";
      fila.innerHTML = `
        <span>${cantidad} × ${producto.nombre}</span>
        <span>${formatoMoneda(producto.precio * cantidad)}</span>
      `;
      listaResumen.appendChild(fila);
    });

  document.getElementById("resumen-total").textContent = formatoMoneda(subtotalCarrito());
}

function formatearFechaLegible(fechaISO) {
  if (!fechaISO) return "—";
  const [anio, mes, dia] = fechaISO.split("-");
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// -----------------------------------------------------------------------
// 10. CONFIRMACIÓN (SIN PAGO TODAVÍA)
// -----------------------------------------------------------------------
function confirmarPedidoSinPago() {
  estado.numeroPedido = "MAD-" + Date.now().toString().slice(-6);
  guardarEstado();
  document.getElementById("confirmacion-numero").textContent = estado.numeroPedido;
  irAPaso("confirmacion");
}

function iniciarPedidoNuevo() {
  estado = {
    pasoActual: "inicio",
    sucursal: null,
    carrito: {},
    fecha: "",
    horario: "",
    cliente: { nombre: "", telefono: "", correo: "" },
    numeroPedido: null,
  };
  guardarEstado();
  renderizarSucursales();
  renderizarProductos();
  inicializarRecogida();
  inicializarDatosCliente();
  irAPaso("inicio", { validar: false });
}

// -----------------------------------------------------------------------
// 11. ARRANQUE DE LA APLICACIÓN
// -----------------------------------------------------------------------
function inicializarApp() {
  cargarEstado();

  renderizarSucursales();
  renderizarProductos();
  inicializarRecogida();
  inicializarDatosCliente();

  // Botones de "Siguiente" (con validación)
  document.querySelectorAll("[data-siguiente]").forEach((boton) => {
    boton.addEventListener("click", () => irAPaso(boton.dataset.siguiente));
  });

  // Botones de "Regresar" (sin validación)
  document.querySelectorAll("[data-regresar]").forEach((boton) => {
    boton.addEventListener("click", () => irAPaso(boton.dataset.regresar, { validar: false }));
  });

  document.getElementById("btn-ver-carrito-flotante").addEventListener("click", () => {
    irAPaso("carrito", { validar: false });
  });

  document.getElementById("btn-continuar-pago").addEventListener("click", confirmarPedidoSinPago);
  document.getElementById("btn-nuevo-pedido").addEventListener("click", iniciarPedidoNuevo);

  // Siempre iniciamos en "inicio" al cargar la página por primera vez en la sesión
  irAPaso(estado.pasoActual === "confirmacion" ? "inicio" : estado.pasoActual, { validar: false });
}

document.addEventListener("DOMContentLoaded", inicializarApp);
