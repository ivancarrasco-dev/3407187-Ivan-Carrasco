/**
 * SISTEMA CENTRAL DE REGISTROS - POO SEMANA 3
 */

// --- 1. CLASES (POO) ---
class Grave {
  #id; #name; #loc; #status;
  constructor(name, loc) {
    this.#id = Math.random().toString(36).substr(2, 5).toUpperCase();
    this.#name = name;
    this.#loc = loc;
    this.#status = false; // false = Libre
  }
  get id() { return this.#id; }
  get name() { return this.#name; }
  get loc() { return this.#loc; }
  get status() { return this.#status; }
  
  toggle() { this.#status = !this.#status; }
  getType() { return this.constructor.name; }
  getInfo() { return ""; }
}

class Mausoleum extends Grave {
  #cap; constructor(n, l, c) { super(n, l); this.#cap = c; }
  getInfo() { return `Capacidad: ${this.#cap} cuerpos`; }
}

class Niche extends Grave {
  #lvl; constructor(n, l, v) { super(n, l); this.#lvl = v; }
  getInfo() { return `Nivel: ${this.#lvl}`; }
}

class Plot extends Grave {
  #depth; constructor(n, l, d) { super(n, l); this.#depth = d; }
  getInfo() { return `Tipo: ${this.#depth}`; }
}

// --- 2. SISTEMA ---
class Cemetery {
  #items = [];
  #logs = [];

  addItem(obj) { 
    this.#items.push(obj); 
    this.addLog(`CREADO: ${obj.name} (${obj.getType()})`);
  }
  addLog(m) { this.#logs.unshift(`[${new Date().toLocaleTimeString()}] ${m}`); }
  get items() { return this.#items; }
  get logs() { return this.#logs; }
}

const db = new Cemetery();

// --- 3. LÓGICA DE INTERFAZ (DOM) ---
const UI = {
  render() {
    // Stats
    const total = db.items.length;
    const occ = db.items.filter(i => i.status).length;
    document.getElementById('stat-total').innerText = total;
    document.getElementById('stat-occ').innerText = occ;

    // Lista de Inventario
    const container = document.getElementById('list-container');
    container.innerHTML = db.items.map(item => `
      <div class="item-card ${item.status ? 'occupied' : ''}">
        <div>
          <strong>${item.name}</strong> <small>#${item.id}</small>
          <p style="font-size:0.8rem; color:#666">${item.loc} | ${item.getInfo()}</p>
        </div>
        <button class="btn" onclick="app.toggleItem('${item.id}')">
          ${item.status ? 'LIBERAR' : 'OCUPAR'}
        </button>
      </div>
    `).join('');

    // Historial
    document.getElementById('log-container').innerHTML = db.logs.map(l => `<p style="font-size:0.8rem; border-bottom:1px solid #eee; padding:5px">${l}</p>`).join('');
  },

  switchTab(targetId, btn) {
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    btn.classList.add('active');
  }
};

// --- 4. CONTROLADOR ---
const app = {
  init() {
    // Listeners de Pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.onclick = () => UI.switchTab(btn.dataset.section, btn);
    });

    // Modales
    document.getElementById('open-modal-btn').onclick = () => document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('close-modal-btn').onclick = () => document.getElementById('modal-overlay').style.display = 'none';

    // Formulario
    document.getElementById('record-form').onsubmit = (e) => {
      e.preventDefault();
      const type = document.getElementById('field-type').value;
      const name = document.getElementById('field-name').value;
      const loc = document.getElementById('field-loc').value;
      const extra = document.getElementById('field-extra').value;

      let newItem;
      if(type === "Mausoleum") newItem = new Mausoleum(name, loc, extra);
      else if(type === "Niche") newItem = new Niche(name, loc, extra);
      else newItem = new Plot(name, loc, extra);

      db.addItem(newItem);
      UI.render();
      document.getElementById('modal-overlay').style.display = 'none';
      e.target.reset();
    };

    UI.render();
  },

  toggleItem(id) {
    const item = db.items.find(i => i.id === id);
    item.toggle();
    db.addLog(`ESTADO: ${item.name} -> ${item.status ? 'Ocupado' : 'Libre'}`);
    UI.render();
  }
};

window.onload = app.init;