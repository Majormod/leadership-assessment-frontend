import React from 'react';

const McqStatement = ({ question, currentAnswer, onAnswerSelect }) => {
    // --- INTELLIGENT DATA HANDLING ---
    // Check if options is an array (new Sales format) or an object (old Marketing format)
    const isSalesFormat = Array.isArray(question.options);

    // Determine the correct question ID key
    const questionId = isSalesFormat ? question.id : question.questionId;

    // Normalize the options into a consistent array format for rendering
    const optionsArray = isSalesFormat 
        ? question.options 
        : Object.entries(question.options).map(([key, value]) => ({ id: key, text: value }));

    return (
        <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
            <p style={{ lineHeight: '1.6', fontSize: '1.1em', marginTop: 0, whiteSpace: 'pre-wrap' }}>
                {question.text}
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {optionsArray.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onAnswerSelect(questionId, option.id)}
                        style={{
                            padding: '12px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            border: `2px solid ${currentAnswer === option.id ? '#0575E6' : '#ccc'}`,
                            backgroundColor: currentAnswer === option.id ? '#e7f3ff' : 'white',
                            color: '#333',
                            borderRadius: '5px',
                            fontSize: '1em'
                        }}
                    >
                        <strong>{option.id}:</strong> {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default McqStatement;