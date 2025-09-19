// pages/index.js - FINAL COMPLETE VERSION /* 28-06-25 */

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AssessmentReport from '../components/AssessmentReport';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const AssessmentPage = () => {
    const [caseStudy, setCaseStudy] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [report, setReport] = useState(null);
    const reportRef = useRef();
    const [jobId, setJobId] = useState(null);
    const [assessmentState, setAssessmentState] = useState('loading');
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        setAssessmentState('loading');
        const fetchCaseStudy = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/case-study`, { cache: 'no-store' });
                if (!res.ok) throw new Error(`Server responded with ${res.status}`);
                const data = await res.json();
                setCaseStudy(data);
                setAssessmentState('in_progress');
            } catch (error) { console.error("Failed to fetch case study:", error); setAssessmentState('error'); }
        };
        fetchCaseStudy();
    }, []);

    useEffect(() => {
        if (!jobId) return;
        const intervalId = setInterval(async () => {
            try {
                const res = await fetch(`${apiUrl}/api/report-status/${jobId}`);
                if (!res.ok) throw new Error(`Status check failed`);
                const data = await res.json();
                if (data.status === 'complete') {
                    clearInterval(intervalId);
                    setReport(data.report);
                    setAssessmentState('complete');
                } else if (data.status === 'failed') {
                    clearInterval(intervalId);
                    setAssessmentState('error');
                }
            } catch (error) { console.error("Error polling:", error); setAssessmentState('error'); clearInterval(intervalId); }
        }, 10000);
        return () => clearInterval(intervalId);
    }, [jobId]);

    const handleAnswer = (questionId, optionId) => {
        setAnswers({ ...answers, [questionId]: optionId });
    };

    const submitAssessment = async () => {
        setAssessmentState('evaluating');
        try {
            const res = await fetch(`${apiUrl}/api/evaluate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers }) });
            if (!res.ok) throw new Error(`Evaluate request failed`);
            const data = await res.json();
            if (data.jobId) setJobId(data.jobId);
            else throw new Error("Did not receive a job ID.");
        } catch (error) { console.error("Failed to submit:", error); setAssessmentState('error'); }
    };

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        const reportElement = reportRef.current;
        if (!reportElement) {
            setIsDownloading(false);
            return;
        }

        const canvas = await html2canvas(reportElement, {
            scale: 2,
            useCORS: true,
            width: reportElement.scrollWidth,
            windowWidth: reportElement.scrollWidth,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pdfHeight;
        }

        pdf.save('Leadership_Accelerator_Report.pdf');
        setIsDownloading(false);
    };

    if (assessmentState === 'loading' || !caseStudy) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Assessment...</div>;
    }
    if (assessmentState === 'error') {
        return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}><h2>An Error Occurred</h2><p>Please refresh and try again. If the issue persists, contact support.</p></div>;
    }
    if (assessmentState === 'evaluating') {
        return (
            <div style={{ padding: '20px', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2>Thank you for your submission.</h2>
                <p>Your detailed leadership report is being generated by our AI. This will take several minutes.</p>
                <p>Please keep this page open.</p>
                <div style={{ marginTop: '30px' }}>
                    <div className="spinner"></div>
                    <p style={{marginTop: '10px'}}>Analyzing your responses...</p>
                </div>
                <style jsx>{`.spinner { border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 36px; height: 36px; animation: spin 1s linear infinite; margin: auto; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }
    if (assessmentState === 'complete' && report) {
        return (
            <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px', backgroundColor: 'white' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                    <p>Your report is ready. You can download a high-quality PDF copy below.</p>
                    <button onClick={handleDownloadPdf} disabled={isDownloading} style={{padding: '12px 25px', fontSize: '1.1em', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                        {isDownloading ? 'Generating PDF...' : 'Download Report as PDF'}
                    </button>
                </div>
                <div ref={reportRef}>
                    <AssessmentReport report={report} />
                </div>
            </div>
        );
    }
    if (assessmentState === 'in_progress') {
        const currentQuestion = caseStudy.questions[currentQuestionIndex];
        if (!currentQuestion) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading questions...</div>;
        return (
            // This is the updated code
<div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px', backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
                <Image src="/logo.png" alt="Company Logo" width={150} height={60} style={{ marginBottom: '20px' }} />
                <h1 style={{textAlign: 'center'}}>{caseStudy.title}</h1>
               {/* --- ADD THIS ENTIRE DIV TO DISPLAY THE CASE STUDY --- */}
<div style={{backgroundColor: '#f9f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #eee', margin: '20px 0', lineHeight: '1.6'}}>
    <h2>Background</h2>
    <p>{caseStudy.background}</p>

    <h3 style={{marginTop: '20px'}}>Key Characters</h3>
    <ul style={{paddingLeft: '20px'}}>
        {caseStudy.characters.map((char, index) => (
            <li key={index} style={{marginBottom: '10px'}}>
                <strong>{char.name}:</strong> {char.description}
            </li>
        ))}
    </ul>

    <h3 style={{marginTop: '20px'}}>The Crisis</h3>
    {caseStudy.crisis.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
    ))}

    <h3 style={{marginTop: '20px'}}>The Challenges</h3>
    <p>{caseStudy.challenges.intro}</p>
    {caseStudy.challenges.areas.map((area, index) => (
        <div key={index} style={{marginTop: '15px'}}>
            <h4>{area.title}</h4>
            <ul style={{paddingLeft: '20px', margin: '5px 0'}}>
                {area.points.map((point, pIndex) => (
                    <li key={pIndex} style={{marginBottom: '5px'}}>{point}</li>
                ))}
            </ul>
        </div>
    ))}
</div>
{/* --- END OF SECTION TO ADD --- */}
                <hr />
                <h2>Question {currentQuestionIndex + 1} of {caseStudy.questions.length}</h2>
                <p><strong>Perspective: {currentQuestion.perspective}</strong></p>
                <p style={{fontWeight: 'bold'}}>{currentQuestion.question}</p>
                <div>
                    {currentQuestion.options.map(option => (
                        <button key={option.id} onClick={() => handleAnswer(currentQuestion.id, option.id)} style={{ display: 'block', width: '100%', padding: '12px', margin: '5px 0', textAlign: 'left', backgroundColor: answers[currentQuestion.id] === option.id ? '#007bff' : '#f0f0f0', color: answers[currentQuestion.id] === option.id ? 'white' : 'black', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
                            <strong>{option.id}.</strong> {option.text}
                        </button>
                    ))}
                </div>
                <button onClick={() => { currentQuestionIndex < caseStudy.questions.length - 1 ? setCurrentQuestionIndex(currentQuestionIndex + 1) : submitAssessment(); }} style={{ marginTop: '25px', padding: '12px 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }} disabled={!answers[currentQuestion.id]}>
                    {currentQuestionIndex < caseStudy.questions.length - 1 ? 'Next Question' : 'Submit Assessment'}
                </button>
            </div>
        );
    }
    return <div>Initializing...</div>;
};

export default AssessmentPage;