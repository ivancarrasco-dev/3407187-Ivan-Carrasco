/**
 * SISTEMA CEMENTERIO CENTRAL - GESTIÓN POO
 * Ubicación: starter/script.js
 */

// --- 1. CLASES DE DOMINIO (HERENCIA Y ENCAPSULACIÓN) ---

class BaseRegistro {
    #id; #nombre; #ubicacion; #estaOcupado;

    constructor(nombre, ubicacion) {
        if (this.constructor === BaseRegistro) throw new Error("No puedes instanciar una clase abstracta");
        this.#id = crypto.randomUUID().split('-')[0].toUpperCase();
        this.#nombre = nombre;
        this.#ubicacion = ubicacion;
        this.#estaOcupado = false;
    }

    // Getters
    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get ubicacion() { return this.#ubicacion; }
    get estaOcupado() { return this.#estaOcupado; }

    // Métodos
    toggleEstado() { this.#estaOcupado = !this.#estaOcupado; }
    getType() { return this.constructor.name; }
    
    // Método que será sobreescrito (Polimorfismo)
    obtenerDetalle() { return ""; }
}

class Mausoleo extends BaseRegistro {
    #capacidad;
    constructor(n, u, cap) { super(n, u); this.#capacidad = cap; }
    obtenerDetalle() { return `Capacidad: ${this.#capacidad} féretros`; }
}

class Cripta extends BaseRegistro {
    #nivelSeguridad;
    constructor(n, u, nivel) { super(n, u); this.#nivelSeguridad = nivel; }
    obtenerDetalle() { return `Seguridad: ${this.#nivelSeguridad}`; }
}

class Nicho extends BaseRegistro {
    #fila;
    constructor(n, u, fila) { super(n, u); this.#fila = fila; }
    obtenerDetalle() { return `Fila/Nivel: ${this.#fila}`; }
}

// --- 2. MOTOR DEL SISTEMA ---

class SistemaCementerio {
    #inventario = [];
    #historial = [];

    // Bloque estático (Requerimiento POO)
    static {
        console.log("Sincronizando con el Archivo Distrital de Bogotá...");
    }

    registrarEntrada(objeto) {
        this.#inventario.push(objeto);
        this.logactividad(`NUEVO REGISTRO: ${objeto.nombre} ingresado como ${objeto.getType()}`);
    }

    logactividad(mensaje) {
        const fecha = new Date().toLocaleTimeString();
        this.#historial.unshift(`[${fecha}] ${mensaje}`);
    }

    get inventario() { return this.#inventario; }
    get historial() { return this.#historial; }

    getStats() {
        return {
            total: this.#inventario.length,
            ocupados: this.#inventario.filter(i => i.estaOcupado).length
        };
    }
}

const cementerio = new SistemaCementerio();

// --- 3. LÓGICA DE INTERFAZ (UI) ---

const UI = {
    // Renderizar lista de inventario
    renderInventario() {
        const lista = document.getElementById('list-container') || document.getElementById('items-list');
        const stats = cementerio.getStats();

        // Actualizar contadores superiores
        if(document.getElementById('stat-total')) document.getElementById('stat-total').textContent = stats.total;
        if(document.getElementById('stat-occ')) document.getElementById('stat-occ').textContent = stats.ocupados;

        if(!lista) return;

        lista.innerHTML = cementerio.inventario.map(item => `
            <div class="item-card ${item.estaOcupado ? 'occupied' : ''}">
                <div class="info">
                    <strong>${item.nombre}</strong> <small>#${item.id}</small>
                    <p>${item.ubicacion} | ${item.obtenerDetalle()}</p>
                </div>
                <button class="btn ${item.estaOcupado ? 'btn-secondary' : 'btn-main'}" 
                        onclick="cambiarEstado('${item.id}')">
                    ${item.estaOcupado ? 'LIBERAR' : 'OCUPAR'}
                </button>
            </div>
        `).join('');
    },

    // Renderizar historial
    renderHistorial() {
        const logDoc = document.getElementById('log-container') || document.getElementById('logs-container');
        if(!logDoc) return;
        logDoc.innerHTML = cementerio.historial.map(log => `
            <p style="font-size:0.85rem; border-bottom: 1px solid var(--border-color); padding: 5px;">${log}</p>
        `).join('');
    }
};

// --- 4. CONTROLADORES DE EVENTOS (WINDOW PARA ALCANCE GLOBAL) ---

// Cambiar estado de una tumba
window.cambiarEstado = (id) => {
    const item = cementerio.inventario.find(i => i.id === id);
    if(item) {
        item.toggleEstado();
        cementerio.logactividad(`ESTADO: ${item.nombre} ahora está ${item.estaOcupado ? 'OCUPADO' : 'DISPONIBLE'}`);
        UI.renderInventario();
    }
};

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- MANEJO DE PESTAÑAS ---
    const tabButtons = document.querySelectorAll('.tab-btn, .tab-link');
    const sections = document.querySelectorAll('.tab-section, .tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section || btn.dataset.tab;
            
            // Quitar activos
            tabButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Activar actual
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');

            if(target === 'history' || target === 'history') UI.renderHistorial();
        });
    });

    // --- MODO OSCURO ---
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if(isDark) {
                document.documentElement.removeAttribute('data-theme');
                themeBtn.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeBtn.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });

        // Cargar preferencia
        if(localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.textContent = '☀️';
        }
    }

    // --- FORMULARIO Y MODAL ---
    const modal = document.getElementById('modal-overlay') || document.getElementById('grave-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('record-form') || document.getElementById('grave-form');

    if(openBtn) openBtn.onclick = () => modal.style.display = 'flex';
    if(closeBtn) closeBtn.onclick = () => modal.style.display = 'none';

    if(form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const type = document.getElementById('field-type')?.value || document.getElementById('form-type')?.value;
            const name = document.getElementById('field-name')?.value || document.getElementById('form-name')?.value;
            const loc = document.getElementById('field-loc')?.value || document.getElementById('form-loc')?.value;
            const extra = document.getElementById('field-extra')?.value || document.getElementById('form-extra')?.value;

            let obj;
            if(type === 'Mausoleum') obj = new Mausoleo(name, loc, extra);
            else if(type === 'Niche') obj = new Nicho(name, loc, extra);
            else obj = new Cripta(name, loc, extra);

            cementerio.registrarEntrada(obj);
            UI.renderInventario();
            modal.style.display = 'none';
            form.reset();
        };
    }

    // Datos iniciales para que no esté vacío
    cementerio.registrarEntrada(new Mausoleo("Panteón Central", "Entrada Principal", "20"));
    UI.renderInventario();
});