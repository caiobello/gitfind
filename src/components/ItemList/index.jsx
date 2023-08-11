import React from 'react';
import './style.css';

function ItemList({ title, description }) {
  return (
    <div>
      <strong>{title}</strong>
      <p>{description}</p>
      <hr />
    </div>
  );
}

export { ItemList };
