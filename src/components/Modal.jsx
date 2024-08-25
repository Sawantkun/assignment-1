import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSave }) => {
    const [newText, setNewText] = useState('');

    const handleSave = () => {
        onSave(newText);
        setNewText('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            textAlign: 'center'
        }}>
            <h2>Add New Text</h2>
            <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                rows="4"
                cols="50"
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <div>
                <button onClick={handleSave} style={{ marginRight: '10px' }}>
                    Save
                </button>
                <button onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Modal;
