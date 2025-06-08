import React from 'react';
import './RoleSelector.css';

function RoleSelector({ onSelect }) {
  return (
    <div className="role-selector">
      <h2>Select Your Role</h2>
      <div className="roles">
        <div onClick={() => onSelect('Tank')}>
          <img src="/images/tank.webp" alt="Tank" />
          <p>Tank</p>
        </div>
        <div onClick={() => onSelect('DPS')}>
          <img src="/images/dps.webp" alt="DPS" />
          <p>DPS</p>
        </div>
        <div onClick={() => onSelect('Support')}>
          <img src="/images/support.webp" alt="Support" />
          <p>Support</p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;
