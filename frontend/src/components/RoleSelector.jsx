import React from 'react';
import './RoleSelector.css';

const RoleSelector = ({ onRoleSelect, onSurpriseHero }) => {
  return (
    <div className="role-select-container">
      <h1 className="role-title">Select a Role</h1>
      <div className="role-icons">
        <img src="/images/tank.webp" alt="Tank" onClick={() => onRoleSelect('Tank')} />
        <img src="/images/dps.webp" alt="DPS" onClick={() => onRoleSelect('DPS')} />
        <img src="/images/support.webp" alt="Support" onClick={() => onRoleSelect('Support')} />
      </div>
      <button className="surprise-btn" onClick={onSurpriseHero}>Surprise Me</button>
    </div>
  );
};

export default RoleSelector;
