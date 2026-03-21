// =============================================
//   GENERADOR DE MENSAJES - CEMENTERIO CENTRAL
// =============================================

// Declaración de datos como strings
const nombreEntidad = "Sepultura Familiar Pérez";   // con espacios y mayúsculas/minúsculas
const categoria = "Sepultura doble - Adultos";
const descripcion = "   Sepultura ubicada en el bloque central, con acceso limitado por mantenimiento.   ";
const codigo = "CEM-045";

// Uso de métodos de string
const nombreMayus = nombreEntidad.toUpperCase();          // toUpperCase
const nombreMinus = nombreEntidad.toLowerCase();          // toLowerCase
const descripcionTrim = descripcion.trim();               // trim
const incluyeBloque = descripcionTrim.includes("bloque"); // includes
const empiezaConCem = codigo.startsWith("CEM");           // startsWith
const codigoCorto = codigo.slice(0, 3);                   // slice
const categoriaReemplazo = categoria.replace("Adultos", "General"); // replace

// Ficha multilínea con template literals
const ficha = `
=============================================
  CEMENTERIO CENTRAL — FICHA DE SEPULTURA
=============================================
Entidad:     ${nombreMayus}
Categoría:   ${categoriaReemplazo}
Código:      ${codigo}
Descripción: ${descripcionTrim}

--- Validaciones ---
¿Código empieza con 'CEM'?: ${empiezaConCem}
¿Descripción contiene 'bloque'?: ${incluyeBloque}

=============================================
`;

console.log(ficha);

// Mensaje corto tipo notificación
const mensajeNotificacion = `📢 Nueva sepultura disponible: ${nombreEntidad} (${codigo})`;
console.log(mensajeNotificacion);

console.log("\n=============================================");
console.log("  Mensajes creados con JavaScript ES2023");
console.log("=============================================");
