import React, { useState } from 'react';
import ScrollSyncComponent from './components/ScrollSync';
import Instructions from './components/Instructions';

const App = () => {
    const [showInstructions, setShowInstructions] = useState(true);

    const handleCloseInstructions = () => {
        setShowInstructions(false);
    };

    return (
        <div className='wrapper'>
            <h1>ScrollSync</h1>
            {showInstructions ? (
                <Instructions onClose={handleCloseInstructions} />
            ) : (
                <ScrollSyncComponent />
            )}
        </div>
    );
};

export default App;
