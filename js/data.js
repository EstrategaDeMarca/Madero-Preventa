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

const PRODUCTOS = [
  {
    id: "prod-001",
    categoria: "Roscas",
    nombre: "Rosca Baltasar",
    descripcion: "Rosca de chocolate con crema de avellana.",
    precio: 450,
    icono: "🍩",
  },
  {
    id: "prod-002",
    categoria: "Roscas",
    nombre: "Rosca Melchor",
    descripcion: "Rosca tradicional.",
    precio: 470,
    icono: "🍩",
  },
  {
    id: "prod-003",
    categoria: "Roscas",
    nombre: "Rosca Gaspar",
    descripcion: "Rosca de dulce de leche y queso.",
    precio: 420,
    icono: "🍩",
  },
];

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
