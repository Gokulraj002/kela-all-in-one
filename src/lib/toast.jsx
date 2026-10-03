import React, { useCallback, useEffect, useState } from 'react';

let push = null;
export function toast(msg) { if (push) push(msg); }

export function ToastHost() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    push = (msg) => {
      const id = Math.random().toString(36).slice(2);
      setItems((p) => [...p, { id, msg }]);
      setTimeout(() => setItems((p) => p.filter((x) => x.id !== id)), 2600);
    };
    return () => { push = null; };
  }, []);
  return (
    <div className="toasts">
      {items.map((t) => <div key={t.id} className="toast">{t.msg}</div>)}
    </div>
  );
}
