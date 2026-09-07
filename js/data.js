/* =========================================================================
   data.js
   -------------------------------------------------------------------------
   Aquí vive TODA la información que hoy es de ejemplo y que más adelante
   se debe reemplazar por la información real de Madero Restaurante.

   No hay que tocar ningún otro archivo para actualizar sucursales,
   productos u horarios: todo se edita aquí.
   ========================================================================= */

// -----------------------------------------------------------------------
// SUCURSALES
// -----------------------------------------------------------------------
const SUCURSALES = [
  "Villas",
  "San Javier",
  "Madero",
  "Coacalco",
  "San Marcos",
   "Tula",
  "Metepec",
  "Sendero",
  "Zaragoza",
  "Churubusco",
];

// -----------------------------------------------------------------------
// PRODUCTOS DE EJEMPLO (FICTICIOS)
// -----------------------------------------------------------------------
// ⚠️ REEMPLAZAR: nombre, descripcion, precio, categoria e icono son de
// muestra. Cuando tengan el catálogo real, solo hay que editar este
// arreglo. El campo "icono" es un emoji que funciona como imagen
// temporal (para no depender de fotos todavía); cuando tengan fotos
// reales, se puede cambiar por una ruta de imagen, por ejemplo:
// imagen: "assets/productos/arrachera.jpg"
const PRODUCTOS = [
  {
    id: "prod-001",
    categoria: "Roscas",
    nombre: "Rosca Baltasar",
    descripcion: "Producto de ejemplo. Rosca de chocolate con crema de avellana.",
    precio: 450,
    icono: "🌮",
  },
  {
    id: "prod-002",
    categoria: "Roscas",
    nombre: "Rosca Melchor",
    descripcion: "Producto de ejemplo. Rosca tradicional",
    precio: 470,
    icono: "🌮",
  },
  {
    id: "prod-003",
    categoria: "Roscas",
    nombre: "Rosca Gaspar",
    descripcion: "Rosca de dulce de leche y queso.",
    precio: 420,
    icono: "🥩",
  },
  {

// -----------------------------------------------------------------------
// HORARIOS DE RECOGIDA DE EJEMPLO
// -----------------------------------------------------------------------
// ⚠️ REEMPLAZAR: estos horarios son de muestra. Más adelante lo ideal es
// que cada sucursal tenga sus propios horarios reales (y quizás validar
// disponibilidad contra un sistema). Por ahora es la misma lista para
// todas las sucursales.
const HORARIOS = [
  "13:00 - 13:30",
  "13:30 - 14:00",
  "14:00 - 14:30",
  "14:30 - 15:00",
  "18:00 - 18:30",
  "18:30 - 19:00",
  "19:00 - 19:30",
  "19:30 - 20:00",
  "20:00 - 20:30",
];
