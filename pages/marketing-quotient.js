// pages/marketing-quotient.js

// In pages/marketing-quotient.js

// --- FIX 1: Added missing imports ---
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LmsLayout from '../components/LmsLayout'; 

// --- FIX 2: Assuming these child components exist ---
// You will need to import your actual components. These are placeholders.
import LikertStatement from '../components/LikertStatement';
import McqStatement from '../components/McqStatement';
import MarketingReport from '../components/MarketingReport';

// --- FIX 3: Added missing variables (UPDATE THESE VALUES) ---
// This should point to your AI backend, likely an environment variable
const marketingAnswerKey = { /* Paste your answer key object here */ };

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

// ADD THIS HELPER FUNCTION
const sanitizeAnalysisText = (text) => {
  if (!text) return '';
  let sanitizedText = text;

  // Rule 1: Replace "the candidate" with "you"/"your"
  sanitizedText = sanitizedText.replace(/The candidate's/g, "Your");
  sanitizedText = sanitizedText.replace(/the candidate's/g, "your");
  sanitizedText = sanitizedText.replace(/The candidate/g, "You");
  sanitizedText = sanitizedText.replace(/the candidate/g, "you");

  // Rule 2: Remove the raw score and answer details
  sanitizedText = sanitizedText.replace(/\s?\([a-zA-Z\s.,:]+\d+[,.\s\w:]+\d+\)/g, '');

  return sanitizedText;
};

const MarketingQuotientPage = () => {
    const [assessmentState, setAssessmentState] = useState('loading');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [jobId, setJobId] = useState(null);
    const [report, setReport] = useState(null);
    
    const router = useRouter();
    const userName = router.isReady ? (router.query.name || 'Valued Professional') : 'Valued Professional';

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                console.log("DEBUG: Fetching from URL:", `${apiUrl}/marketing/questions`);
                const res = await fetch(`${apiUrl}/marketing/questions`);
                if (!res.ok) throw new Error(`Server responded with ${res.status}`);
                const allQuestions = await res.json();
                
                // Grouping and jumbling logic...
                const sections = { A: [], B: [], C: [], D: [], E: [] };
                allQuestions.forEach(q => {
                    if (sections[q.section]) {
                        sections[q.section].push(q);
                    }
                });
                for (const key in sections) {
                    sections[key].sort(() => Math.random() - 0.5);
                }
                const jumbledInSections = [ ...sections.A, ...sections.B, ...sections.C, ...sections.D, ...sections.E ];

                setQuestions(jumbledInSections);
                setAssessmentState('in_progress');
            } catch (error) {
                console.error("Failed to fetch marketing questions:", error);
                setAssessmentState('error');
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (!jobId) return;
        const intervalId = setInterval(async () => {
            try {
                const res = await fetch(`${apiUrl}/marketing/status/${jobId}`);
                if (!res.ok) throw new Error(`Status check failed`);
                const data = await res.json();

                if (data.status === 'completed') {
                    clearInterval(intervalId);
                    setReport(data.report);
                    setAssessmentState('completed');
                } else if (data.status === 'failed') {
                    clearInterval(intervalId);
                    setAssessmentState('error');
                }
            } catch (error) {
                console.error("Error polling for report status:", error);
                setAssessmentState('error');
                clearInterval(intervalId);
            }
        }, 5000);
        return () => clearInterval(intervalId);
    }, [jobId]);

    const handleAnswerSelect = (questionId, value) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: value }));
    };

    const handleAutoAnswer = () => {
        if (questions.length === 0) return;
        const newAnswers = {};
        questions.forEach(q => {
            if (q.questionId >= 195 && q.questionId <= 213) {
                newAnswers[q.questionId] = marketingAnswerKey[q.questionId];
            } else {
                if (q.type === 'tradeoff') {
                    newAnswers[q.questionId] = Math.floor(Math.random() * 6) + 1;
                } else if (q.type === 'mcq') {
                    const options = Object.keys(q.options);
                    newAnswers[q.questionId] = options[Math.floor(Math.random() * options.length)];
                }
            }
        });
        console.log("DEV: Auto-answering with the 'Analytics' section answered correctly.");
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        setAssessmentState('evaluating');
        console.log("Submitting this payload to the backend:", JSON.stringify(answers, null, 2));
        try {
            const res = await fetch(`${apiUrl}/marketing/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });
            if (!res.ok) throw new Error(`Submit request failed`);
            const data = await res.json();
            if (data.jobId) {
                setJobId(data.jobId);
            } else {
                throw new Error("Did not receive a job ID from the server.");
            }
        } catch (error) {
            console.error("Failed to submit assessment:", error);
            setAssessmentState('error');
        }
    };

    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const isSubmitDisabled = answeredQuestions < totalQuestions;

    // A helper function to sanitize text from the report
    const sanitizeAnalysisText = (text) => text || "";

    // --- FIX 4: Refactored rendering to use a single return statement ---
    // All of the 'if (assessmentState === ...)' checks have been moved inside the layout.
    return (
        <LmsLayout>
            <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: 'auto', padding: '20px', backgroundColor: 'white', color: 'black' }}>
                
                {assessmentState === 'loading' && <div>Loading Assessment...</div>}
                
                {assessmentState === 'error' && <div><h2>An Error Occurred</h2><p>Could not load or process the assessment.</p></div>}
                
                {assessmentState === 'evaluating' && <div><h2>Analyzing Your Submission...</h2><p>Your detailed report is being generated. This may take a moment.</p></div>}

                {assessmentState === 'completed' && report && (
                    <MarketingReport report={{
                         ...report,
                         userInfo: { ...report.userInfo, name: userName },
                         detailedAnalysis: Object.entries(report.detailedAnalysis).reduce((acc, [key, value]) => {
                             acc[key] = {
                                 diagnosticReview: sanitizeAnalysisText(value.diagnosticReview),
                                 benchmarkComparison: sanitizeAnalysisText(value.benchmarkComparison),
                                 careerImplications: sanitizeAnalysisText(value.careerImplications),
                             };
                             return acc;
                         }, {})
                    }} />
                )}

                {assessmentState === 'in_progress' && (
                    <>
                        <header style={{ textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
                            <Image src="/logo.png" alt="Company Logo" width={180} height={72} unoptimized />
                            <h1 style={{ color: '#003366', marginTop: '10px' }}>The Marketing Influence Quotient™</h1>
                            <p style={{ fontStyle: 'italic', color: '#555' }}>Please respond to the following statements and questions.</p>
                        </header>
                        <main>
                            {questions.map((q, index) => (
                                <div key={q.questionId} style={{ marginBottom: '40px' }}>
                                    <p style={{fontWeight: 'bold', color: '#666'}}>Question {index + 1} of {totalQuestions}</p>
                                    {q.type === 'tradeoff' && (
                                        <LikertStatement 
                                            statement={{ id: q.questionId, text: q.text }} 
                                            currentAnswer={answers[q.questionId]} 
                                            onAnswerSelect={handleAnswerSelect} 
                                        />
                                    )}
                                    {q.type === 'mcq' && (
                                        <McqStatement 
                                            question={q}
                                            currentAnswer={answers[q.questionId]}
                                            onAnswerSelect={handleAnswerSelect}
                                        />
                                    )}
                                </div>
                            ))}
                        </main>
                        <footer style={{ position: 'sticky', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '20px', borderTop: '1px solid #eee', textAlign: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
                            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold' }}>Progress: {answeredQuestions} / {totalQuestions}</p>
                            {process.env.NEXT_PUBLIC_SHOW_DEV_TOOLS === 'true' && (
                                <button onClick={handleAutoAnswer} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', marginRight: '15px' }}>
                                    Dev: Auto-Answer All
                                </button>
                            )}
                            <button onClick={handleSubmit} disabled={isSubmitDisabled} style={{ padding: '15px 40px', fontSize: '1.2em', fontWeight: 'bold', cursor: isSubmitDisabled ? 'not-allowed' : 'pointer', backgroundColor: isSubmitDisabled ? '#ccc' : '#28a745', color: 'white', border: 'none', borderRadius: '5px', opacity: isSubmitDisabled ? 0.6 : 1 }}>
                                Submit for Analysis
                            </button>
                        </footer>
                    </>
                )}
            </div>
        </LmsLayout>
    );
};

export default MarketingQuotientPage;