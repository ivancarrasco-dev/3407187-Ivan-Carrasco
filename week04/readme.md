# 📦 Proyecto Semana 4 - Generador de Mensajes (Gestión de Cementerios)

Este proyecto corresponde al único entregable obligatorio de la **Semana 4**.  
El objetivo es construir un **generador de mensajes en consola** para el dominio **Gestión de Cementerios**, usando métodos de string y template literals.

---

## 🎯 Objetivos del Proyecto
- Declarar datos del dominio como strings (`const`).
- Usar al menos 5 métodos de string distintos:
  - `toUpperCase()`, `toLowerCase()`
  - `trim()`
  - `includes()`, `startsWith()`
  - `slice()`
  - `replace()`
- Construir la salida con **template literals** (sin concatenación con `+`).
- Generar dos tipos de mensajes:
  - Una ficha multilínea con los datos del dominio.
  - Un mensaje corto tipo notificación.
- Mostrar al menos una validación con `includes`, `startsWith` o `endsWith`.

---

## 📋 Ejemplo de Cálculos
- **Ficha multilínea**: muestra entidad, categoría, código y descripción.  
- **Validaciones**: verificar si el código empieza con "CEM" y si la descripción contiene "bloque".  
- **Mensaje corto**: alerta de nueva sepultura disponible.  

---

## ▶️ Ejecución
1. Abrir la carpeta del proyecto:
   ```bash
   cd /week04/starter
