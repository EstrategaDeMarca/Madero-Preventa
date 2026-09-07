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
    categoria: "Tacos",
    nombre: "Tacos de Arrachera (orden de 4)",
    descripcion: "Producto de ejemplo. Tortilla de maíz, arrachera al carbón, cebollitas y salsa de la casa.",
    precio: 145,
    icono: "🌮",
  },
  {
    id: "prod-002",
    categoria: "Tacos",
    nombre: "Tacos de Chorizo (orden de 4)",
    descripcion: "Producto de ejemplo. Chorizo artesanal a la parrilla con guacamole.",
    precio: 120,
    icono: "🌮",
  },
  {
    id: "prod-003",
    categoria: "Cortes",
    nombre: "Corte de Arrachera Individual",
    descripcion: "Producto de ejemplo. 250g de arrachera al carbón, acompañada de frijoles charros.",
    precio: 220,
    icono: "🥩",
  },
  {
    id: "prod-004",
    categoria: "Cortes",
    nombre: "Costillas BBQ Madero",
    descripcion: "Producto de ejemplo. Media orden de costillas bañadas en salsa BBQ de la casa.",
    precio: 260,
    icono: "🍖",
  },
  {
    id: "prod-005",
    categoria: "Complementos",
    nombre: "Papas a la Francesa",
    descripcion: "Producto de ejemplo. Porción de papas fritas con sal de la casa.",
    precio: 65,
    icono: "🍟",
  },
  {
    id: "prod-006",
    categoria: "Complementos",
    nombre: "Elote Asado",
    descripcion: "Producto de ejemplo. Elote a la parrilla con mayonesa, queso y chile en polvo.",
    precio: 55,
    icono: "🌽",
  },
  {
    id: "prod-007",
    categoria: "Complementos",
    nombre: "Guacamole con Totopos",
    descripcion: "Producto de ejemplo. Guacamole preparado al momento con totopos horneados.",
    precio: 85,
    icono: "🥑",
  },
  {
    id: "prod-008",
    categoria: "Bebidas",
    nombre: "Limonada Natural",
    descripcion: "Producto de ejemplo. Limonada fresca preparada del día.",
    precio: 45,
    icono: "🍋",
  },
  {
    id: "prod-009",
    categoria: "Bebidas",
    nombre: "Agua Fresca del Día",
    descripcion: "Producto de ejemplo. Sabor sujeto a disponibilidad de la sucursal.",
    precio: 40,
    icono: "🥤",
  },
  {
    id: "prod-010",
    categoria: "Postres",
    nombre: "Volcán de Chocolate",
    descripcion: "Producto de ejemplo. Pastel de chocolate caliente con centro fundente.",
    precio: 95,
    icono: "🍫",
  },
];

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
