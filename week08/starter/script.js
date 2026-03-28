// =========================================
//   INVENTARIO DE SEPULTURAS - CEMENTERIO
// =========================================

// 1. Estructura de datos
let inventario = [
  { id: 1, name: "Sepultura Familiar Pérez", categoria: "Doble", costo: 500000, disponible: true },
  { id: 2, name: "Sepultura Individual Gómez", categoria: "Simple", costo: 250000, disponible: false },
  { id: 3, name: "Panteón Histórico López", categoria: "Panteón", costo: 1_200_000, disponible: true },
  { id: 4, name: "Sepultura Infantil Ruiz", categoria: "Infantil", costo: 150000, disponible: true },
  { id: 5, name: "Sepultura Familiar Martínez", categoria: "Doble", costo: 520000, disponible: false }
];

console.log("\n--- INVENTARIO INICIAL ---");
console.log(inventario);

// 2. Métodos de mutación
inventario.push({ id: 6, name: "Sepultura Simple Torres", categoria: "Simple", costo: 260000, disponible: true });
console.log("\nDespués de push:", inventario);

inventario.pop();
console.log("\nDespués de pop:", inventario);

inventario.unshift({ id: 0, name: "Sepultura Prioritaria Ramírez", categoria: "Doble", costo: 600000, disponible: true });
console.log("\nDespués de unshift:", inventario);

inventario.splice(2, 1); // elimina el elemento en posición 2
console.log("\nDespués de splice:", inventario);

// 3. Métodos de búsqueda
const encontrada = inventario.find(item => item.name.includes("Pérez"));
console.log("\nElemento encontrado con find:", encontrada);

const disponibles = inventario.filter(item => item.disponible === true);
console.log("\nElementos filtrados con filter (disponibles):", disponibles);

// 4. Métodos de iteración
console.log("\n--- forEach ---");
inventario.forEach(item => {
  console.log(`ID: ${item.id}, Nombre: ${item.name}, Costo: ${item.costo}`);
});

console.log("\n--- map ---");
const nombres = inventario.map(item => item.name.toUpperCase());
console.log("Nombres transformados:", nombres);

// 5. Spread operator
const copiaInventario = [...inventario];
console.log("\nCopia del inventario con spread:", copiaInventario);

// 6. Reporte final
console.log("\n--- REPORTE FINAL ---");
console.log("Inventario final:", inventario);

console.log("\n=========================================");
console.log("  Inventario gestionado con Arrays en JavaScript ES2023");
console.log("=========================================");
