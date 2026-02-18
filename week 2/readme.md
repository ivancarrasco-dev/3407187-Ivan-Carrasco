# ⚖️ Sistema de Gestión de Necrópolis - Archivo Central

Aplicación web moderna diseñada para la administración y registro de inscripciones en el Cementerio Central. Este proyecto demuestra el dominio de **JavaScript Moderno (ES2022+)**, aplicando técnicas avanzadas de manipulación de datos y una interfaz de usuario solemne y funcional.

---

## 🎯 Objetivos del Proyecto

Implementar un sistema de gestión de registros (CRUD) utilizando estándares modernos de programación, enfocándose en la inmutabilidad de los datos y el uso de métodos funcionales de arrays.

## 🚀 Tecnologías y Conceptos Aplicados (Semana 2)

El desarrollo integra los siguientes pilares de JavaScript moderno:

* **Spread Operator (`...`)**: Utilizado para agregar nuevos registros al estado sin mutar el array original y para actualizar propiedades de objetos manteniendo su integridad.
* **Rest Parameters**: Implementados en la función `logEvent` para gestionar un número variable de detalles en la consola del sistema.
* **Default Parameters**: La fábrica de objetos `createItem` utiliza valores por defecto para garantizar que cada registro tenga una estructura válida (ej. 'Sin nombre', categoría 'mausoleum').
* **Métodos de Arrays Modernos**:
    * `map()`: Para transformar el estado en elementos HTML y para actualizaciones selectivas de registros.
    * `filter()`: Implementado en el sistema de búsqueda multicriterio (búsqueda por texto, estado y categoría).
    * `reduce()`: Utilizado para calcular estadísticas en tiempo real, agrupando conteos totales y por categorías.
* **Shorthand Properties**: Definición simplificada de objetos en categorías y fábricas de datos.
* **Computed Property Names**: Generación dinámica de claves de estadísticas (ej. `cat_mausoleum`) dentro del acumulador de `reduce`.
* **ES2022 `Object.hasOwn()`**: Verificación segura de propiedades existentes en el objeto de estadísticas.

---

## 🏛️ Estructura del Dominio

El sistema clasifica las inscripciones según su ubicación y prioridad legal:

| Sector | Descripción |
| :--- | :--- |
| **Mausoleo** | Espacios monumentales familiares. |
| **Cripta** | Espacios de inhumación bajo suelo o muros. |
| **Jardín** | Áreas verdes de descanso. |
| **Cenisario** | Destino final para restos cremados. |

**Prioridades de Mantenimiento:**
* **Perpetuidad (High)**: Registros vitalicios.
* **Temporal (Medium)**: Contratos por periodos definidos.
* **Muerte Violenta (Low)**: Registros bajo custodia de Fiscalía.

---

## 🛠️ Funcionalidades Principales

1.  **Registro e Inscripción**: Formulario dinámico con validación de campos obligatorios.
2.  **Edición en Tiempo Real**: Permite modificar epitafios o sectores sin recargar la página.
3.  **Sistema de Archivados**: Posibilidad de marcar registros como inactivos (archivados) y eliminarlos masivamente.
4.  **Estadísticas Dinámicas**: Resumen automático de la ocupación total y desglose por sectores.
5.  **Modo Oscuro (Soledad/Paz)**: Interfaz adaptable para facilitar la lectura en diferentes condiciones de iluminación.

---

## 📄 Instrucciones de Instalación

1.  Clonar el repositorio o descargar los archivos.
2.  Asegurarse de mantener la estructura de carpetas:
    ```text
    ├── index.html
    ├── styles.css
    └── starter/
        └── script.js
    ```
3.  Abrir `index.html` en cualquier navegador moderno.

---

> **Nota de Desarrollo**: Este proyecto prioriza el código limpio (Clean Code) y el uso de comentarios descriptivos para facilitar el mantenimiento del archivo histórico.