// =========================================
//   CALCULADORA DE DOMINIO - CEMENTERIO
// =========================================

// Datos iniciales
let capacidadTotal = 500;          // número total de sepulturas
let sepulturasOcupadas = 320;      // sepulturas ya ocupadas
let costoBase = 1_000_000;         // costo en pesos con separador numérico
let descuento = 0.15;              // 15% de descuento

// Operaciones aritméticas
let sepulturasDisponibles = capacidadTotal - sepulturasOcupadas;
console.log("Sepulturas disponibles:", sepulturasDisponibles);

let costoConDescuento = costoBase - (costoBase * descuento);
console.log("Costo con descuento:", costoConDescuento);

let promedioPorBloque = capacidadTotal / 10;
console.log("Promedio de sepulturas por bloque:", promedioPorBloque);

let restoDivision = sepulturasOcupadas % 10;
console.log("Resto al dividir ocupadas entre 10:", restoDivision);

// Operadores de asignación compuesta
sepulturasOcupadas += 5; // se ocuparon 5 más
console.log("Sepulturas ocupadas (actualizado):", sepulturasOcupadas);

costoBase *= 1.05; // aumento del 5%
console.log("Costo base actualizado:", costoBase);

// Comparaciones estrictas
console.log("¿El cementerio está lleno?:", sepulturasOcupadas === capacidadTotal);
console.log("¿Quedan al menos 100 disponibles?:", sepulturasDisponibles >= 100);

// Operadores lógicos
let mantenimientoActivo = true;
let accesoPermitido = true;

console.log("¿Se puede usar la sepultura?:", accesoPermitido && !mantenimientoActivo);
console.log("¿Hay descuento especial?:", (sepulturasDisponibles < 200) || descuento > 0.1);

console.log("\n=========================================");
console.log("  Calculadora generada con JavaScript ES2023");
console.log("=========================================");
