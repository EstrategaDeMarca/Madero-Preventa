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
  {
    estado: "Hidalgo",
    nombre: "Villas",
    direccion: "Boulevard Nuevo Hidalgo 1607, Pachuca",
  },
  {
    estado: "Hidalgo",
    nombre: "San Javier",
    direccion: "Blvd. Valle de San Javier 109, Fracc. Valle de San Javier, 42086 Pachuca de Soto, Hgo.",
  },
  {
    estado: "Hidalgo",
    nombre: "Madero",
    direccion: "Prolongación Francisco I. Madero No. 403, Pachuca",
  },
  {
    estado: "Hidalgo",
    nombre: "Tula",
    direccion: "Boulevard Tula Iturbe 118-C, Tula",
  },
  {
    estado: "Estado de México",
    nombre: "Coacalco",
    direccion: "Av. José López Portillo 60, Coacalco",
  },
  {
    estado: "Estado de México",
    nombre: "San Marcos",
    direccion: "Autopista México-Querétaro, Izcalli",
  },
  {
    estado: "Estado de México",
    nombre: "Metepec",
    direccion: "Prolongación Guadalupe Victoria 471, Metepec",
  },
  {
    estado: "Estado de México",
    nombre: "Sendero",
    direccion: "Blvd. Aeropuerto Miguel Alemán 55, Lerma",
  },
  {
    estado: "Querétaro",
    nombre: "Zaragoza",
    direccion: "Av. Ignacio Zaragoza 150, Querétaro",
  },
  {
    estado: "Ciudad de México",
    nombre: "Churubusco",
    direccion: "Avenida Río Churubusco #583, Iztapalapa, CDMX",
  },
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
