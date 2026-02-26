# 🏛️ Sistema de Gestión - Cementerio Central de Bogotá

Este proyecto es una aplicación web diseñada para la administración y control de registros de sepulturas del Cementerio Central. Desarrollado bajo los principios de **Programación Orientada a Objetos (POO)**, cumple con los requerimientos técnicos de la Semana 3.

## 🚀 Características del Proyecto
- **Gestión CRUD:** Capacidad de crear, leer, actualizar y eliminar registros oficiales.
- **Interfaz Institucional:** Diseño basado en la estética de la Alcaldía de Bogotá (Semana 2).
- **Modo Oscuro:** Interfaz adaptable con persistencia de datos (LocalStorage).
- **Sistema de Auditoría:** Registro histórico de movimientos en tiempo real.

## 🛠️ Conceptos de POO Aplicados
El motor del sistema (`script.js`) implementa los pilares fundamentales de la POO:

### 1. Herencia y Polimorfismo
Se utiliza una clase base llamada `BaseRegistro` de la cual heredan tres clases específicas:
* **Mausoleo**: Gestión de panteones familiares con control de capacidad.
* **Nicho**: Administración de galerías por niveles y filas.
* **Cripta**: Registros especiales con protocolos de seguridad.

### 2. Encapsulamiento
Se implementó el uso de **campos privados** (`#`) para proteger la integridad de los datos sensibles (ID, nombre, estado), permitiendo su acceso y modificación únicamente a través de *Getters* y métodos controlados como `actualizar()`.

### 3. Abstracción
La clase `BaseRegistro` actúa como un modelo conceptual que no puede ser instanciado directamente, obligando al sistema a trabajar siempre con tipos de sepultura específicos.



## 📂 Estructura de Archivos
```text
/
├── index.html          # Estructura principal y modales
├── styles.css          # Estilos institucionales y variables de tema
└── starter/
    └── script.js       # Lógica de clases y control de la UI 