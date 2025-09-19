// components/LikertStatement.js

import React from 'react';

const LIKERT_OPTIONS = [
    { label: "Strongly Disagree", value: 1 },
    { label: "Disagree", value: 2 },
    { label: "Slightly Disagree", value: 3 },
    { label: "Slightly Agree", value: 4 },
    { label: "Agree", value: 5 },
    { label: "Strongly Agree", value: 6 }
];

const LikertStatement = ({ statement, currentAnswer, onAnswerSelect }) => {
    return (
        <div style={{
            margin: '25px 0',
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <p style={{
                fontSize: '1.1em',
                fontWeight: '500',
                lineHeight: '1.5',
                marginBottom: '20px' // Added a bit more space
            }}>
                {statement.text}
            </p>
            {/* --- FIX: Updated container style --- */}
            {/* Removed flexWrap and justifyContent, added gap for spacing */}
            <div style={{ display: 'flex', gap: '10px' }}>
                {LIKERT_OPTIONS.map(option => (
                    <button
                        key={option.value}
                        onClick={() => onAnswerSelect(statement.id, option.value)}
                        style={{
                            // --- FIX: Updated button style ---
                            // flex: 1 makes all buttons share space equally
                            flex: '1', 
                            padding: '10px 5px', // Adjusted padding
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            backgroundColor: currentAnswer === option.value ? '#007bff' : 'white',
                            color: currentAnswer === option.value ? 'white' : 'black',
                            fontWeight: currentAnswer === option.value ? 'bold' : 'normal',
                            transition: 'all 0.2s ease-in-out',
                            fontSize: '0.75em' // Ensures text fits
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LikertStatement;