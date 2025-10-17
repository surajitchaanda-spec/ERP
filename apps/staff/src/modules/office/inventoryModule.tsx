import React from 'react';
import { useInventory } from './hooks/useInventory';

export const InventoryModule: React.FC = () => {
  const { items, updateQuantity } = useInventory();

  return (
    <section>
      <h2>Inventory</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity}
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+1</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
