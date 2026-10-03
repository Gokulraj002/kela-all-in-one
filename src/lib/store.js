/* tiny localStorage store */
function read(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } }
function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
export const store = {
  favs: () => read('atelier_favs', []),
  toggleFav: (id) => { const f = read('atelier_favs', []); const i = f.indexOf(id); i === -1 ? f.push(id) : f.splice(i, 1); write('atelier_favs', f); return f; },
  recent: () => read('atelier_recent', []),
  pushRecent: (id) => { const r = [id, ...read('atelier_recent', []).filter((x) => x !== id)].slice(0, 8); write('atelier_recent', r); return r; },
  custom: (key) => read('atelier_custom_' + key, null),
  setCustom: (key, v) => write('atelier_custom_' + key, v),
  delCustom: (key) => { try { localStorage.removeItem('atelier_custom_' + key); } catch (e) {} },
};
