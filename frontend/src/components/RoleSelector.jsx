import React from 'react';
function RoleSelector({ onSelect }) {
  const roles = ['Tank', 'Damage', 'Support'];

  return (
    <div>
      <h2>Select a Role</h2>
      {roles.map(role => (
        <button key={role} onClick={() => onSelect(role)}>
          {role}
        </button>
      ))}
    </div>
  );
}

export default RoleSelector;
