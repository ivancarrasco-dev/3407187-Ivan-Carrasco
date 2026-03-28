// =========================================
//   CONDICIONALES - GESTIÓN DE CEMENTERIOS
// =========================================

// Datos iniciales
const sepultura = {
  nombre: "Sepultura Familiar Pérez",
  codigo: "CEM-045",
  categoria: "Sepultura doble",
  disponible: true,
  mantenimientoActivo: false,
  capacidad: 2,
  ocupadas: 1,
  contacto: {
    responsable: "Juan Pérez",
    telefono: null // aún no registrado
  }
};

// Uso de if / else if / else
if (sepultura.ocupadas === 0) {
  console.log("La sepultura está vacía.");
} else if (sepultura.ocupadas < sepultura.capacidad) {
  console.log("La sepultura tiene espacio disponible.");
} else {
  console.log("La sepultura está llena.");
}

// Operador ternario ? :
const mensajeMantenimiento = sepultura.mantenimientoActivo 
  ? "⚠️ En mantenimiento" 
  : "✅ Disponible para uso";
console.log("Estado de mantenimiento:", mensajeMantenimiento);

// switch statement
switch (sepultura.categoria) {
  case "Sepultura simple":
    console.log("Categoría: sepultura para un solo cuerpo.");
    break;
  case "Sepultura doble":
    console.log("Categoría: sepultura para dos cuerpos.");
    break;
  default:
    console.log("Categoría: tipo no especificado.");
}

// Nullish coalescing ??
const telefonoResponsable = sepultura.contacto.telefono ?? "No registrado";
console.log("Teléfono del responsable:", telefonoResponsable);

// Optional chaining ?.
console.log("Nombre del responsable:", sepultura.contacto?.responsable);

// Truthy / falsy
const pagoRealizado = "";
if (pagoRealizado) {
  console.log("El pago fue registrado correctamente.");
} else {
  console.log("El pago aún no se ha realizado.");
}

// Operadores lógicos como condicionales
const puedeUsarse = sepultura.disponible && !sepultura.mantenimientoActivo;
console.log("¿Se puede usar la sepultura?:", puedeUsarse);

const descuentoEspecial = (sepultura.ocupadas >= sepultura.capacidad) || sepultura.codigo.startsWith("CEM");
console.log("¿Aplica descuento especial?:", descuentoEspecial);

console.log("\n=========================================");
console.log("  Script de condicionales ejecutado con éxito");
console.log("=========================================");
