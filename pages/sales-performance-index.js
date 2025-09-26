import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LmsLayout from '../components/LmsLayout'; // Assuming your main layout component
import SalesPerformanceReport from '../components/SalesPerformanceReport'; // The report component we just created
import McqStatement from '../components/McqStatement'; // A component to render each MCQ question

// This should point to your AI backend, likely an environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

const SalesPerformanceIndexPage = () => {
    const [assessmentState, setAssessmentState] = useState('loading'); // loading, in_progress, evaluating, completed, error
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [jobId, setJobId] = useState(null);
    const [report, setReport] = useState(null);
    
    const router = useRouter();
    const userName = router.isReady ? (router.query.name || 'Valued Professional') : 'Valued Professional';

    // Effect to fetch questions when the page loads
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/sales/questions`);
                if (!res.ok) throw new Error(`Server responded with ${res.status}`);
                const salesQuestions = await res.json();
                
                setQuestions(salesQuestions);
                setAssessmentState('in_progress');
            } catch (error) {
                console.error("Failed to fetch sales questions:", error);
                setAssessmentState('error');
            }
        };
        fetchQuestions();
    }, []);

    // Effect to poll for the report status once a job ID is received
    useEffect(() => {
        if (!jobId) return;

        const intervalId = setInterval(async () => {
            try {
                const res = await fetch(`${apiUrl}/api/sales/status/${jobId}`);
                if (!res.ok) throw new Error(`Status check failed`);
                const data = await res.json();

                if (data.status === 'completed') {
                    clearInterval(intervalId);
                    setReport(data.result); // The backend sends the report in the 'result' field
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
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId);
    }, [jobId]);

    const handleAnswerSelect = (questionId, value) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: value }));
    };

    const handleSubmit = async () => {
        setAssessmentState('evaluating');
        try {
            const res = await fetch(`${apiUrl}/api/sales/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers })
            });

            if (!res.ok) throw new Error(`Submit request failed with status ${res.status}`);
            
            const data = await res.json();
            if (data.jobId) {
                setJobId(data.jobId);
            } else {
                throw new Error("Did not receive a job ID from the server.");
            }
        } catch (error) {
            console.error("Failed to submit sales assessment:", error);
            setAssessmentState('error');
        }
    };

    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const isSubmitDisabled = answeredQuestions < totalQuestions;

    return (
        <LmsLayout>
            <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: 'auto', padding: '20px', backgroundColor: 'white', color: 'black' }}>
                
                {assessmentState === 'loading' && <div><h2>Loading Assessment...</h2></div>}
                
                {assessmentState === 'error' && <div><h2>An Error Occurred</h2><p>Could not load or process the sales assessment. Please try again later.</p></div>}
                
                {assessmentState === 'evaluating' && <div><h2>Analyzing Your Submission...</h2><p>Your detailed sales performance report is being generated. This may take a few moments.</p></div>}

                {assessmentState === 'completed' && report && (
                    <SalesPerformanceReport report={{ ...report, userInfo: { name: userName } }} />
                )}

                {assessmentState === 'in_progress' && (
                    <>
                        <header style={{ textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
                            <Image src="/logo.png" alt="Company Logo" width={180} height={72} unoptimized />
                            <h1 style={{ color: '#003366', marginTop: '10px' }}>The Sales Performance Index™</h1>
                            <p style={{ fontStyle: 'italic', color: '#555' }}>Please respond to the following questions.</p>
                        </header>
                        <main>
                            {questions.map((q, index) => (
                                <div key={q.id} style={{ marginBottom: '40px' }}>
                                    <p style={{fontWeight: 'bold', color: '#666'}}>Question {index + 1} of {totalQuestions}</p>
                                    <McqStatement 
                                        question={q}
                                        currentAnswer={answers[q.id]}
                                        onAnswerSelect={handleAnswerSelect}
                                    />
                                </div>
                            ))}
                        </main>
                        <footer style={{ position: 'sticky', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '20px', borderTop: '1px solid #eee', textAlign: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
                            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold' }}>Progress: {answeredQuestions} / {totalQuestions}</p>
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

export default SalesPerformanceIndexPage;