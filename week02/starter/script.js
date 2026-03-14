// =========================================
//   CEMENTERIO CENTRAL - FICHA #01
// =========================================

// Declaración de variables con const y let
const nombreSepultura = "Sepultura Familiar Pérez"; // string
const codigoSepultura = "#01";                  // string
const categoria = "Sepultura doble - Adultos";      // string
let capacidad = 2;                                  // number
let anioConstruccion = 2015;                        // number
let costoBase = 500_000;                            // number con separador

// Estados booleanos
let disponible = true;
let mantenimientoActivo = false;

// Conversión de tipos
const costoBaseString = String(costoBase);          // number → string
const disponibleNumero = Number(disponible);        // boolean → number (true = 1)
const mantenimientoTexto = String(mantenimientoActivo);

// Uso de typeof para mostrar tipos
console.log("Tipo de nombreSepultura:", typeof nombreSepultura);
console.log("Tipo de capacidad:", typeof capacidad);
console.log("Tipo de disponible:", typeof disponible);
console.log("Tipo de null:", typeof null);          // trampa: devuelve "object"
console.log("Tipo de undefined:", typeof undefined);

// Expresión aritmética: calcular costo con descuento
const costoConDescuento = costoBase * 0.9;

// Salida organizada
console.log("\nINFORMACIÓN GENERAL");
console.log("--------------------");
console.log("Nombre:          " + nombreSepultura);
console.log("Código:          " + codigoSepultura);
console.log("Categoría:       " + categoria);

console.log("\nDETALLES");
console.log("--------------------");
console.log("Capacidad:       " + capacidad);
console.log("Año construcción:" + anioConstruccion);
console.log("Costo base:      " + costoBase);
console.log("Costo base (string): " + costoBaseString);
console.log("Costo con descuento: " + costoConDescuento);
console.log("Disponible:      " + disponible);
console.log("Disponible (número): " + disponibleNumero);
console.log("Mantenimiento:   " + mantenimientoActivo);
console.log("Mantenimiento (texto): " + mantenimientoTexto);

console.log("\nRESUMEN DEL DOMINIO");
console.log("--------------------");
console.log("Dominio:         Gestión de Cementerios");
console.log("Entidad:         Sepultura");
console.log("Total registros: " + 350);

console.log("\n=========================================");
console.log("  Ficha creada con JavaScript ES2023");
console.log("=========================================");