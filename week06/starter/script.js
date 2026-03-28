// =========================================
//   REPORTE CON BUCLES - CEMENTERIO
// =========================================

// Datos del dominio (array de elementos)
const sepulturas = [
  { nombre: "Sepultura Familiar Pérez", categoria: "Doble", costo: 500000 },
  { nombre: "Sepultura Individual Gómez", categoria: "Simple", costo: 250000 },
  { nombre: "Panteón Histórico López", categoria: "Panteón", costo: 1_200_000 },
  { nombre: "Sepultura Infantil Ruiz", categoria: "Infantil", costo: 150000 },
  { nombre: "Sepultura Familiar Martínez", categoria: "Doble", costo: 520000 },
  { nombre: "Sepultura Simple Torres", categoria: "Simple", costo: 260000 }
];

// Listar todos los elementos con for...of
console.log("\n--- LISTADO DE SEPULTURAS ---");
for (const sepultura of sepulturas) {
  console.log(`Nombre: ${sepultura.nombre}, Categoría: ${sepultura.categoria}, Costo: ${sepultura.costo}`);
}

// Contar por categoría con for...of + contador
let contadorSimple = 0;
let contadorDoble = 0;
let contadorInfantil = 0;
let contadorPanteon = 0;

for (const sepultura of sepulturas) {
  if (sepultura.categoria === "Simple") contadorSimple++;
  else if (sepultura.categoria === "Doble") contadorDoble++;
  else if (sepultura.categoria === "Infantil") contadorInfantil++;
  else if (sepultura.categoria === "Panteón") contadorPanteon++;
}

console.log("\n--- CONTADOR POR CATEGORÍA ---");
console.log(`Simples: ${contadorSimple}`);
console.log(`Dobles: ${contadorDoble}`);
console.log(`Infantiles: ${contadorInfantil}`);
console.log(`Panteones: ${contadorPanteon}`);

// Calcular totales y promedio con acumulador
let totalCosto = 0;
for (const sepultura of sepulturas) {
  totalCosto += sepultura.costo;
}
const promedioCosto = totalCosto / sepulturas.length;

console.log("\n--- TOTALES ---");
console.log(`Costo total: ${totalCosto}`);
console.log(`Costo promedio: ${promedioCosto}`);

// Encontrar el máximo y mínimo
let maxSepultura = sepulturas[0];
let minSepultura = sepulturas[0];

for (const sepultura of sepulturas) {
  if (sepultura.costo > maxSepultura.costo) maxSepultura = sepultura;
  if (sepultura.costo < minSepultura.costo) minSepultura = sepultura;
}

console.log("\n--- MÁXIMO Y MÍNIMO ---");
console.log(`Mayor costo: ${maxSepultura.nombre} (${maxSepultura.costo})`);
console.log(`Menor costo: ${minSepultura.nombre} (${minSepultura.costo})`);

// Generar reporte con for clásico
console.log("\n--- REPORTE NUMERADO ---");
for (let i = 0; i < sepulturas.length; i++) {
  const sepultura = sepulturas[i];
  const estado = sepultura.costo >= promedioCosto ? "Por encima del promedio" : "Por debajo del promedio";
  console.log(`${i + 1}. ${sepultura.nombre} - ${sepultura.categoria} - ${sepultura.costo} (${estado})`);
}

console.log("\n=========================================");
console.log("  Reporte generado con bucles en JavaScript ES2023");
console.log("=========================================");
