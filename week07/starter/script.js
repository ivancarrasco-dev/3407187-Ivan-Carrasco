// =========================================
//   LIBRERÍA DE FUNCIONES - CEMENTERIO
// =========================================

// Sección 1 — Datos del dominio
const sepulturas = [
  { nombre: "Sepultura Familiar Pérez", categoria: "Doble", costo: 500000, disponible: true },
  { nombre: "Sepultura Individual Gómez", categoria: "Simple", costo: 250000, disponible: false },
  { nombre: "Panteón Histórico López", categoria: "Panteón", costo: 1_200_000, disponible: true },
  { nombre: "Sepultura Infantil Ruiz", categoria: "Infantil", costo: 150000, disponible: true },
  { nombre: "Sepultura Familiar Martínez", categoria: "Doble", costo: 520000, disponible: false }
];

// Sección 2 — Función de formato (arrow function)
const formatSepultura = (sepultura) => {
  return `Nombre: ${sepultura.nombre} | Categoría: ${sepultura.categoria} | Costo: ${sepultura.costo}`;
};

// Sección 3 — Función de cálculo (función pura)
function calculateDiscount(price, discountRate) {
  return price - (price * discountRate);
}

// Sección 4 — Función de validación
function isAvailable(sepultura) {
  return sepultura.disponible === true;
}

// Sección 5 — Función con parámetro por defecto
function calculateMaintenanceCost(baseCost, factor = 0.1) {
  return baseCost * factor;
}

// Sección 6 — Reporte usando callbacks
console.log("\n--- REPORTE DE SEPULTURAS ---");
for (const sepultura of sepulturas) {
  // Usamos la función de formato como callback
  console.log(formatSepultura(sepultura));

  // Usamos la función de validación
  console.log("Disponible:", isAvailable(sepultura));

  // Usamos la función de cálculo con descuento
  const costoConDescuento = calculateDiscount(sepultura.costo, 0.15);
  console.log("Costo con descuento:", costoConDescuento);

  // Usamos la función con parámetro por defecto
  const costoMantenimiento = calculateMaintenanceCost(sepultura.costo);
  console.log("Costo de mantenimiento estimado:", costoMantenimiento);

  console.log("-----------------------------");
}

console.log("\n=========================================");
console.log("  Librería de funciones ejecutada con éxito");
console.log("=========================================");
