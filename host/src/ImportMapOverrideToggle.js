import React, { useState, useEffect } from 'react';

const ImportMapOverrideToggle = ({ onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleEnabled = () => {
    const newEnabledState = !isEnabled;
    setIsEnabled(newEnabledState);
    onToggle(newEnabledState);
  };

  useEffect(() => {
    if (localStorage.getItem('devtools')) {
      const isEnabled = true;
      setIsEnabled(isEnabled);
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '15px',
      marginRight: '10px',
    }}>
      <button
        onClick={toggleEnabled}
        style={{
          backgroundColor: isEnabled ? '#4CAF50' : '#f44336',
          color: 'white',
          padding: '10px 24px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {isEnabled ? 'Disable' : 'Enable'} Import Map Overrides
      </button>
    </div>
  );
};

export default ImportMapOverrideToggle;
