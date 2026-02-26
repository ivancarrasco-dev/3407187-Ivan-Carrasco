/**
 * SISTEMA CEMENTERIO CENTRAL - GESTIÓN COMPLETA (CRUD + POO)
 * Ubicación: starter/script.js
 */

// --- 1. MODELO DE DATOS (CLASES POO) ---

class BaseRegistro {
    #id; #nombre; #ubicacion; #estaOcupado;

    constructor(nombre, ubicacion, id = null) {
        if (this.constructor === BaseRegistro) throw new Error("No se puede instanciar una clase abstracta.");
        this.#id = id || crypto.randomUUID().split('-')[0].toUpperCase();
        this.#nombre = nombre;
        this.#ubicacion = ubicacion;
        this.#estaOcupado = false;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get ubicacion() { return this.#ubicacion; }
    get estaOcupado() { return this.#estaOcupado; }

    // Método central para la edición (Actualización)
    actualizar(nombre, ubicacion) {
        this.#nombre = nombre;
        this.#ubicacion = ubicacion;
    }

    toggleEstado() { this.#estaOcupado = !this.#estaOcupado; }
    getType() { return this.constructor.name; }
}

class Mausoleo extends BaseRegistro {
    #capacidad;
    constructor(n, u, cap, id) { super(n, u, id); this.#capacidad = cap; }
    get extra() { return this.#capacidad; }
    actualizar(n, u, cap) { super.actualizar(n, u); this.#capacidad = cap; }
    obtenerDetalle() { return `Capacidad: ${this.#capacidad} féretros`; }
}

class Nicho extends BaseRegistro {
    #fila;
    constructor(n, u, fila, id) { super(n, u, id); this.#fila = fila; }
    get extra() { return this.#fila; }
    actualizar(n, u, fila) { super.actualizar(n, u); this.#fila = fila; }
    obtenerDetalle() { return `Fila/Nivel: ${this.#fila}`; }
}

class Cripta extends BaseRegistro {
    #seguridad;
    constructor(n, u, seg, id) { super(n, u, id); this.#seguridad = seg; }
    get extra() { return this.#seguridad; }
    actualizar(n, u, seg) { super.actualizar(n, u); this.#seguridad = seg; }
    obtenerDetalle() { return `Seguridad: ${this.#seguridad}`; }
}

// --- 2. CONTROLADOR DEL SISTEMA ---

class SistemaCementerio {
    #inventario = [];
    #historial = [];

    agregar(obj) {
        this.#inventario.push(obj);
        this.registrarLog(`REGISTRO: ${obj.nombre} (${obj.getType()}) creado.`);
    }

    eliminar(id) {
        const item = this.#inventario.find(i => i.id === id);
        this.#inventario = this.#inventario.filter(i => i.id !== id);
        this.registrarLog(`ELIMINADO: Registro #${id} (${item.nombre})`);
    }

    registrarLog(msg) {
        const hora = new Date().toLocaleTimeString();
        this.#historial.unshift(`[${hora}] ${msg}`);
    }

    get inventario() { return this.#inventario; }
    get historial() { return this.#historial; }
    get metricas() {
        return {
            total: this.#inventario.length,
            ocupados: this.#inventario.filter(i => i.estaOcupado).length
        };
    }
}

const db = new SistemaCementerio();
let idEnEdicion = null; // Control para saber si el modal edita o crea

// --- 3. LÓGICA DE INTERFAZ (UI) ---

const UI = {
    refrescar() {
        const contenedor = document.getElementById('list-container');
        const m = db.metricas;
        
        // Actualizar contadores
        document.getElementById('stat-total').textContent = m.total;
        document.getElementById('stat-occ').textContent = m.ocupados;

        // Renderizar lista
        contenedor.innerHTML = db.inventario.map(item => `
            <div class="item-card ${item.estaOcupado ? 'occupied' : ''}">
                <div class="info">
                    <strong>${item.nombre}</strong> <small>#${item.id}</small>
                    <p>${item.ubicacion} | ${item.obtenerDetalle()}</p>
                </div>
                <div class="actions">
                    <button class="btn-icon" onclick="abrirEditor('${item.id}')" title="Editar">✏️</button>
                    <button class="btn-icon" onclick="confirmarBorrado('${item.id}')" title="Eliminar">🗑️</button>
                    <button class="btn ${item.estaOcupado ? 'btn-secondary' : 'btn-main'}" onclick="alternarEstado('${item.id}')">
                        ${item.estaOcupado ? 'LIBERAR' : 'OCUPAR'}
                    </button>
                </div>
            </div>
        `).join('');

        // Renderizar Historial
        const logDoc = document.getElementById('log-container');
        if(logDoc) logDoc.innerHTML = db.historial.map(h => `<p class="log-p">${h}</p>`).join('');
    }
};

// --- 4. FUNCIONES GLOBALES (EVENTOS) ---

window.alternarEstado = (id) => {
    const item = db.inventario.find(i => i.id === id);
    item.toggleEstado();
    db.registrarLog(`ESTADO: ${item.nombre} -> ${item.estaOcupado ? 'OCUPADO' : 'LIBRE'}`);
    UI.refrescar();
};

window.confirmarBorrado = (id) => {
    if(confirm("¿Desea eliminar permanentemente este registro del archivo oficial?")) {
        db.eliminar(id);
        UI.refrescar();
    }
};

window.abrirEditor = (id) => {
    const item = db.inventario.find(i => i.id === id);
    idEnEdicion = id;
    
    // Llenar formulario con datos actuales
    document.getElementById('field-type').value = item.getType();
    document.getElementById('field-name').value = item.nombre;
    document.getElementById('field-loc').value = item.ubicacion;
    document.getElementById('field-extra').value = item.extra;
    
    document.querySelector('.modal-card h3').textContent = "Editar Registro";
    document.getElementById('modal-overlay').style.display = 'flex';
};

document.addEventListener('DOMContentLoaded', () => {
    
    // Gestión de Pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn, .tab-section').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.section).classList.add('active');
        };
    });

    // Abrir modal para nuevo
    document.getElementById('open-modal-btn').onclick = () => {
        idEnEdicion = null;
        document.getElementById('record-form').reset();
        document.querySelector('.modal-card h3').textContent = "Nueva Inscripción";
        document.getElementById('modal-overlay').style.display = 'flex';
    };

    // Cerrar modal
    document.getElementById('close-modal-btn').onclick = 
    document.getElementById('cancel-btn').onclick = () => {
        document.getElementById('modal-overlay').style.display = 'none';
    };

    // Formulario: Guardar (Nuevo o Editado)
    document.getElementById('record-form').onsubmit = (e) => {
        e.preventDefault();
        const tipo = document.getElementById('field-type').value;
        const nombre = document.getElementById('field-name').value;
        const ubicacion = document.getElementById('field-loc').value;
        const extra = document.getElementById('field-extra').value;

        if (idEnEdicion) {
            // EDITAR EXISTENTE
            const item = db.inventario.find(i => i.id === idEnEdicion);
            item.actualizar(nombre, ubicacion, extra);
            db.registrarLog(`EDITADO: Registro #${idEnEdicion} actualizado.`);
        } else {
            // CREAR NUEVO
            let nuevo;
            if(tipo === 'Mausoleum') nuevo = new Mausoleo(nombre, ubicacion, extra);
            else if(tipo === 'Niche') nuevo = new Nicho(nombre, ubicacion, extra);
            else nuevo = new Cripta(nombre, ubicacion, extra);
            db.agregar(nuevo);
        }

        UI.refrescar();
        document.getElementById('modal-overlay').style.display = 'none';
    };

    // Modo Oscuro
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.onclick = () => {
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
        themeBtn.textContent = dark ? '🌙' : '☀️';
    };

    // Registro inicial de ejemplo
    db.agregar(new Mausoleo("Familia Santander", "Eje Central - Cuadro 1", "10"));
    UI.refrescar();
});