// components/McqStatement.js
import React from 'react';

const McqStatement = ({ question, currentAnswer, onAnswerSelect }) => {
    return (
        <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
            <p style={{ lineHeight: '1.6', fontSize: '1.1em', marginTop: 0, whiteSpace: 'pre-wrap' }}>{question.text}</p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.entries(question.options).map(([key, value]) => (
                    <button
                        key={key}
                        onClick={() => onAnswerSelect(question.questionId, key)}
                        style={{
                            padding: '12px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            border: `2px solid ${currentAnswer === key ? '#0575E6' : '#ccc'}`,
                            backgroundColor: currentAnswer === key ? '#e7f3ff' : 'white',
                            color: '#333',
                            borderRadius: '5px',
                            fontSize: '1em'
                        }}
                    >
                        <strong>{key}:</strong> {value}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default McqStatement;