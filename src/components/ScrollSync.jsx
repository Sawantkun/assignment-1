import React, { useState, useRef, useEffect } from 'react';
import { inputData, outputData } from '../data/ScrollSync'; // Adjust the import based on your file structure
import Modal from './Modal'; // Adjust the import based on your file structure

const ScrollSyncComponent = () => {
    const [highlightedWordId, setHighlightedWordId] = useState(null);
    const [occurrences, setOccurrences] = useState([]);
    const [currentOccurrenceIndex, setCurrentOccurrenceIndex] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({ inputData, outputData });
    const inputRef = useRef(null);
    const outputRef = useRef(null);

    const findOccurrences = (word) => {
        const newOccurrences = [];
        data.inputData.forEach((item) => {
            const words = item.text.split(' ');
            words.forEach((w, index) => {
                if (w === word) {
                    newOccurrences.push(`${item.id}-${index}`);
                }
            });
        });
        setOccurrences(newOccurrences);
    };

    const handleScroll = (event) => {
        const word = event.target.dataset.word;
        setHighlightedWordId(word);
        findOccurrences(word);
        setCurrentOccurrenceIndex(0);
    };

    const scrollToOccurrence = (index) => {
        if (index >= 0 && index < occurrences.length) {
            const targetElement = document.getElementById(occurrences[index]);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setCurrentOccurrenceIndex(index);
        }
    };

    useEffect(() => {
        const outputElements = outputRef.current.querySelectorAll("[data-word]");
        outputElements.forEach(element => element.addEventListener("click", handleScroll));

        return () => {
            outputElements.forEach(element => element.removeEventListener("click", handleScroll));
        };
    }, [data]);

    useEffect(() => {
        if (currentOccurrenceIndex >= 0 && currentOccurrenceIndex < occurrences.length) {
            scrollToOccurrence(currentOccurrenceIndex);
        }
    }, [currentOccurrenceIndex, occurrences]);

    const handleAddText = (newText) => {
        const newInputData = [...data.inputData, { id: data.inputData.length + 1, text: newText }];
        const newOutputData = [...data.outputData, { id: data.outputData.length + 1, text: newText }];
        setData({ inputData: newInputData, outputData: newOutputData });
    };

    return (
        <div className="scrollSync" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', position: 'fixed', top: 0, left: 90 }}>
                <button className='modal-btn' onClick={() => setIsModalOpen(true)} style={{ marginLeft: '10px' }}>
                    Add Text
                </button>
                <button
                    onClick={() => scrollToOccurrence(currentOccurrenceIndex - 1)}
                    disabled={currentOccurrenceIndex <= 0}
                    className='btn'
                >
                    Previous
                </button>
                <button
                    onClick={() => scrollToOccurrence(currentOccurrenceIndex + 1)}
                    disabled={currentOccurrenceIndex >= occurrences.length - 1}
                    className='btn2'
                >
                    Next
                </button>
                <span style={{ marginLeft: '10px' }}>
                    {currentOccurrenceIndex + 1} / {occurrences.length}
                </span>
            </div>
            <div style={{ display: 'flex' }}>
                <div
                    ref={inputRef}
                    id="InputBox"
                    className="inputBox"
                    style={{ flex: 1, overflowY: 'scroll', padding: '10px', borderRight: '1px solid #ccc' }}
                >
                <h1 className='output-heading'>( Input )</h1>
                    {data.inputData.map(item => (
                        <div key={item.id}>
                            {item.text.split(' ').map((word, index) => (
                                <span
                                    key={`${item.id}-${index}`}
                                    id={`${item.id}-${index}`}
                                    style={{
                                        marginRight: '5px',
                                        display: 'inline-block',
                                        color: highlightedWordId === word ? 'red' : 'black',
                                        fontWeight: highlightedWordId === word ? 'bold' : 'normal',
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
                <div
                    ref={outputRef}
                    id="OutputBox"
                    className="outputBox"
                    style={{ flex: 1, overflowY: 'scroll', padding: '10px' }}
                >
                    <h1 className='output-heading'>( Output ) Click Any Word From Here!</h1>
                    {data.outputData.map(item => (
                        <div key={item.id}>
                            {item.text.split(' ').map((word, index) => (
                                <span
                                    key={`${item.id}-${index}`}
                                    data-word={word}
                                    style={{
                                        cursor: 'pointer',
                                        marginRight: '5px',
                                        display: 'inline-block',
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddText}
            />
        </div>
    );
};

export default ScrollSyncComponent;
