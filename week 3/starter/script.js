/**
 * SISTEMA CEMENTERIO CENTRAL - VERSIÓN POO ES2023
 */

// 1. CLASES DE DOMINIO (POO)
class GraveSite {
  #id; #name; #location; #occupied;
  constructor(name, location) {
    if (this.constructor === GraveSite) throw new Error("Clase abstracta");
    this.#id = Math.random().toString(36).substr(2, 5).toUpperCase();
    this.#name = name;
    this.#location = location;
    this.#occupied = false;
  }
  get id() { return this.#id; }
  get name() { return this.#name; }
  get location() { return this.#location; }
  get isOccupied() { return this.#occupied; }
  
  toggle() { this.#occupied = !this.#occupied; }
  getType() { return this.constructor.name; }
}

class Niche extends GraveSite { 
    #level; 
    constructor(n, l, lvl) { super(n, l); this.#level = lvl; }
    getInfo() { return `Nivel: ${this.#level}`; }
}
class Mausoleum extends GraveSite { 
    #cap; 
    constructor(n, l, c) { super(n, l); this.#cap = c; }
    getInfo() { return `Capacidad: ${this.#cap}`; }
}
class Plot extends GraveSite { 
    #depth; 
    constructor(n, l, d) { super(n, l); this.#depth = d; }
    getInfo() { return `Tipo: ${this.#depth}`; }
}

// 2. SISTEMA CENTRAL
class CemeterySystem {
  #items = [];
  #logs = [];

  static {
    this.INSTITUTION = "Cementerio Central Bogotá";
  }

  addItem(item) {
    this.#items.push(item);
    this.addLog(`Registro creado: ${item.name} (${item.getType()})`);
  }

  addLog(msg) {
    const time = new Date().toLocaleTimeString();
    this.#logs.unshift(`[${time}] ${msg}`);
  }

  getStats() {
    return {
      total: this.#items.length,
      occ: this.#items.filter(i => i.isOccupied).length
    };
  }

  getAll() { return this.#items; }
  getLogs() { return this.#logs; }
}

const central = new CemeterySystem();

// 3. LÓGICA DE INTERFAZ (UI)
const renderInventory = (data = central.getAll()) => {
  const list = document.getElementById('grave-list');
  const stats = central.getStats();
  
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-occ').textContent = stats.occ;

  list.innerHTML = data.map(item => `
    <div class="task-item ${item.isOccupied ? 'occupied' : ''}">
      <div>
        <strong>${item.name}</strong> <small>(${item.id})</small>
        <p style="font-size: 0.8rem; color: #777;">📍 ${item.location} | ${item.getInfo()}</p>
      </div>
      <div class="task-actions">
        <button class="btn-small btn" onclick="handleToggle('${item.id}')">
          ${item.isOccupied ? '🔓 LIBERAR' : '🔒 OCUPAR'}
        </button>
      </div>
    </div>
  `).join('');
};

const renderHistory = () => {
  const container = document.getElementById('history-log');
  container.innerHTML = central.getLogs().map(log => `<p style="padding:0.5rem; border-bottom:1px solid #eee; font-size:0.8rem">${log}</p>`).join('');
};

// EVENTOS DE PESTAÑAS
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn, .tab-pane').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
    if(btn.dataset.tab === 'history') renderHistory();
  });
});

// FORMULARIO Y MODALES
window.closeModal = (id) => document.getElementById(id).style.display = 'none';

document.getElementById('btn-add-grave').addEventListener('click', () => {
  document.getElementById('modal-grave').style.display = 'flex';
});

document.getElementById('form-grave').addEventListener('submit', (e) => {
  e.preventDefault();
  const type = document.getElementById('grave-type').value;
  const name = document.getElementById('grave-name').value;
  const loc = document.getElementById('grave-loc').value;
  const extra = document.getElementById('grave-extra').value;

  let newItem;
  if(type === 'Niche') newItem = new Niche(name, loc, extra);
  else if(type === 'Mausoleum') newItem = new Mausoleum(name, loc, extra);
  else newItem = new Plot(name, loc, extra);

  central.addItem(newItem);
  renderInventory();
  closeModal('modal-grave');
  e.target.reset();
});

window.handleToggle = (id) => {
  const item = central.getAll().find(i => i.id === id);
  item.toggle();
  central.addLog(`Estado cambiado: ${item.name} a ${item.isOccupied ? 'Ocupado' : 'Disponible'}`);
  renderInventory();
};

// Datos iniciales
central.addItem(new Mausoleum("Panteón Reyes", "Av. Principal", 10));
renderInventory();