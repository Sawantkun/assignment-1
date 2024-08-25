import React from 'react';

const Instructions = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -20%)',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            textAlign: 'base'
        }}>
            <h2>How to Use ScrollSync</h2>
            <p>
                1. Click on any word in the right pane to highlight it in the left pane.
                <br />
                2. Use the Previous and Next buttons to navigate through the occurrences of the highlighted word.
                <br />
                3. Click on any highlighted word in the left pane to view it in the right pane.
                <br />
                <br />
                4. Click the "Add Text" button to open a modal.
                <br />
                5. Enter new text in the modal and click "Save" to add it to both panes.
                <br />
                6. Close the modal by clicking the "Close" button or outside the modal.
            </p>
            <button onClick={onClose} style={{ marginTop: '20px' }}>
                Understood
            </button>
        </div>
    );
};

export default Instructions;
