// components/ImperiumReport.js

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ImperiumRadarChart from './ImperiumRadarChart';
import GaugeChart from './GaugeChart';
import DivergingBarChart from './DivergingBarChart';
import ChordDiagram from './ChordDiagram';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Centralized Theme (No changes)
const theme = {
    colors: {
        primary: '#021B79',
        accent: '#0575E6',
        text: '#333333',
        lightText: '#666666',
        background: '#FFFFFF',
        lightBackground: '#F7F9FA',
        borderColor: '#EAECEE',
    },
    fonts: {
        heading: "'Helvetica Neue', 'Arial', sans-serif",
        body: "'Helvetica Neue', Arial, sans-serif",
    },
};

// Helper Components (No changes)
const ScoreBar = ({ score, color }) => {
    const scorePercentage = (score / 10) * 100;
    return (
        <div style={{ height: '8px', width: '100%', backgroundColor: '#EAECEE', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${scorePercentage}%`, backgroundColor: color, borderRadius: '4px' }}></div>
        </div>
    );
};
const chordData = {
    labels: ['People', 'Results', 'Innovation', 'Stability', 'Risk'],
    colors: ['#0575E6', '#ED3F38', '#00D8A8', '#666666', '#f2b50a'],
    matrix: [[0, 5, 2, 3, 1], [5, 0, 6, 4, 2], [2, 6, 0, 1, 7], [3, 4, 1, 0, 2], [1, 2, 7, 2, 0]]
};
const SectionTitle = ({ children }) => (
    <h2 style={{ fontFamily: theme.fonts.heading, fontSize: '2.4em', color: theme.colors.primary, borderBottom: `3px solid ${theme.colors.accent}`, paddingBottom: '10px', marginBottom: '20px', marginTop: '40px' }}>{children}</h2>
);

// In ImperiumReport.js, replace your 'Page' component with this:

const Page = ({ children }) => (
    <div style={{
        pageBreakAfter: 'always',
        // UPDATED PADDING: 25mm top, 40px sides, 15mm bottom
        // This creates a dedicated "safe area" for the header and footer.
        padding: '25mm 40px 15mm 40px',
        backgroundColor: theme.colors.background,
        minHeight: '297mm', // A4 height
        boxSizing: 'border-box',
    }}>
        {children}
    </div>
);

const AnalysisCard = ({ title, score, analysis, isStrength }) => (
    <div style={{ backgroundColor: theme.colors.background, border: `1px solid ${theme.colors.borderColor}`, borderRadius: '8px', padding: '20px', marginBottom: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', pageBreakInside: 'avoid' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, margin: 0, fontSize: '1.1em' }}>{title}</h3>
            {score && <span style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, fontSize: '1.1em', fontWeight: 'normal' }}>{score}/10</span>}
        </div>
        {score && <ScoreBar score={score} color={isStrength ? theme.colors.accent : '#F5B7B1'} />}
        <p style={{ fontFamily: theme.fonts.body, color: theme.colors.text, lineHeight: '1.6', fontSize: '0.9em', whiteSpace: 'pre-wrap', margin: '15px 0 0 0' }}>{analysis}</p>
    </div>
);
const SectionIntro = ({ children }) => (
    <div style={{ fontStyle: 'normal', color: theme.colors.lightText, backgroundColor: theme.colors.lightBackground, borderLeft: `5px solid ${theme.colors.accent}`, padding: '20px', margin: '20px 0' }}>{children}</div>
);


const ImperiumReport = ({ report }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [logoBase64, setLogoBase64] = useState(null);
    const reportContentRef = useRef(null);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await fetch('/logo.png'); // Ensure logo.png is in the /public folder
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onload = () => setLogoBase64(reader.result);
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error("Error loading logo for PDF. Make sure /logo.png exists in the public directory.", error);
            }
        };
        fetchLogo();
    }, []);

    if (!report) {
        return <Page><h2>Generating Your Detailed Report... Please Wait.</h2></Page>;
    }

    // **FIXED**: Complete PDF generation logic with corrected drawing order for headers/footers
    const handleDownloadPDF = async () => {
        const input = reportContentRef.current;
        if (!input || !logoBase64) {
            alert("Report content or logo not ready. Please wait a moment and try again.");
            return;
        }

        setIsDownloading(true);
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const reportPages = input.children;
        const totalReportPages = reportPages.length;
        const totalPdfPages = totalReportPages + 1;

        try {
            for (let i = 0; i < totalReportPages; i++) {
                if (i > 0) pdf.addPage();
                
                const pageContent = reportPages[i];
                const canvas = await html2canvas(pageContent, { scale: 2, useCORS: true });
                const imgData = canvas.toDataURL('image/png');
                
                // STEP 1: Add the captured page content image FIRST
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0, undefined, 'FAST');

                // STEP 2: Draw header and footer ON TOP (for all pages except the first one)
                if (i > 0) {
                    // Header with logo
                    pdf.addImage(logoBase64, 'PNG', 10.6, 12, 25, 10); // Aligns header with 40px content padding

                    // Footer with page number
                    pdf.setFontSize(9);
                    pdf.setTextColor('#666666');
                    const footerText = `The Imperium Leadership Index™ | Page ${i + 1} of ${totalPdfPages}`;
                    pdf.text(footerText, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
                }
            }

            // STEP 3: Add the final blank page with the centered logo
            pdf.addPage();
            const logoWidth = 80;
            const logoHeight = 32;
            const centerX = (pdfWidth - logoWidth) / 2;
            const centerY = (pdfHeight - logoHeight) / 2;
            pdf.addImage(logoBase64, 'PNG', centerX, centerY, logoWidth, logoHeight);

            pdf.save("Imperium-Leadership-Report.pdf");

        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const { executiveSummary, powerQuadrant, breakthroughZone, tradeOffArenas, leadershipArchetype } = report;
    const chartData = powerQuadrant?.strengths?.map(s => ({ dimension: s.trait, score: parseFloat(s.score) })) || [];

    const mainArenas = tradeOffArenas?.arenas?.filter(arena => !arena.arenaName.includes("CoreForce") && !arena.arenaName.includes("FlexiMind") && !arena.arenaName.includes("ResilientSelf") && !arena.arenaName.includes("HorizonSense")) || [];
    const personalArenas = tradeOffArenas?.arenas?.filter(arena => arena.arenaName.includes("CoreForce") || arena.arenaName.includes("FlexiMind") || arena.arenaName.includes("ResilientSelf") || arena.arenaName.includes("HorizonSense")) || [];

    return (
        // **FIXED**: Changed background to white to remove grey bar
        <div style={{ fontFamily: 'sans-serif', color: '#333', maxWidth: '900px', margin: '0 auto', backgroundColor: '#FFFFFF' }}>
            <div style={{ textAlign: 'center', padding: '20px 40px', borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
                <p style={{ margin: '0 0 15px 0' }}>Your report is ready. You can download a high-quality PDF copy below.</p>
                <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading || !logoBase64}
                    style={{
                        padding: '12px 25px', fontSize: '1.1em', cursor: (isDownloading || !logoBase64) ? 'not-allowed' : 'pointer',
                        backgroundColor: isDownloading ? '#6c757d' : '#007bff', color: 'white', border: 'none',
                        borderRadius: '5px', transition: 'background-color 0.2s'
                    }}>
                    {isDownloading ? 'Generating PDF...' : 'Download Report as PDF'}
                </button>
            </div>

            <div ref={reportContentRef}>
                {/* --- A SINGLE, DEDICATED TITLE PAGE --- */}
                <Page>
                    <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src="/logo.png" alt="Company Logo" width={200} height={80} />
                        <h1 style={{ marginTop: '30px', color: '#003366', fontSize: '3em' }}>The Imperium Leadership Index™</h1>
                        <h2 style={{ fontStyle: 'italic', color: '#555' }}>Your Personalized Leadership Report</h2>
                    </div>
                </Page>

                {/* --- ALL OTHER REPORT PAGES (Your existing JSX logic remains untouched below) --- */}

                <Page>
                    <SectionTitle>Welcome to Your Personalized Leadership Journey</SectionTitle>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1em' }}>We're delighted to have you take this important step toward deepening your leadership capability. The assessment you've just completed is not an exam - it's a powerful tool designed to help you reflect, discover, and grow. Through this case-based, real-world simulation, you've been challenged to think, decide, and lead as modern leaders do across complexity, ambiguity, and competing priorities.</p>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1em', marginTop: '1em' }}>At Leadership Accelerator, we believe that leadership is not just a title - it's a craft. A craft that can be sharpened, evolved, and elevated at every stage of your career. This report is the first step in that ongoing process.</p>
                    <p style={{ fontWeight: 'bold', marginTop: '20px', fontSize: '1.1em' }}>Our promise to you:</p>
                    <ul style={{ lineHeight: '1.6', fontSize: '1.1em', listStylePosition: 'inside' }}>
                        <li>We will help you see your leadership strengths clearly.</li>
                        <li>We will help you identify practical areas to strengthen further.</li>
                        <li>And we will stand beside you as you translate insight into action, and action into impact.</li>
                    </ul>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1em', marginTop: '1em' }}>Thank you for trusting us to be part of your leadership journey. We look forward to supporting you in building the kind of leadership that inspires teams, drives results, and creates lasting value.</p>
                    <p style={{ marginTop: '50px', fontWeight: 'bold', fontSize: '1.1em' }}>The Leadership Accelerator Team</p>
                </Page>
                <Page>
                    <SectionTitle>Message to the Candidate</SectionTitle>
                    <p style={{ lineHeight: '1.6' }}>Congratulations on completing this leadership assessment. What you hold in your hands is more than just a report - it's a mirror reflecting how you approach complex leadership situations, make decisions under pressure, and navigate the realities of leading teams, stakeholders, and businesses in a changing world. This report is designed to give you a clear view of your leadership strengths - the qualities that already set you apart - and the areas where deeper growth can unlock even greater impact. We encourage you to treat this as a starting point for reflection and action, not as a final verdict.</p>
                    <h3 style={{ color: '#003366', marginTop: '30px' }}>How to use this report</h3>
                    <ul style={{ lineHeight: '1.6', listStylePosition: 'inside' }}>
                        <li>Take time to read through each section carefully and honestly reflect on what resonates with your experience.</li>
                        <li>Look at your identified strengths and ask: How can I apply these more intentionally in my daily leadership? How can I make them visible to others?</li>
                        <li>Look at the observed gaps or growth areas not as weaknesses, but as opportunities to stretch yourself, experiment with new approaches, and build leadership depth.</li>
                    </ul>
                    <h3 style={{ color: '#003366', marginTop: '30px' }}>How to start working on your growth</h3>
                    <ul style={{ lineHeight: '1.6', listStylePosition: 'inside' }}>
                        <li>Pick one or two strengths and challenge yourself to apply them in new, more impactful ways - for example, mentoring others using your strengths or leading a new initiative where they shine.</li>
                        <li>Choose one gap area and set a small, practical goal for improvement - whether it’s seeking feedback, trying a new technique, or practicing in safe environments.</li>
                        <li>Consider partnering with a coach or mentor to support your growth journey using the insights from this report.</li>
                    </ul>
                    <p style={{ lineHeight: '1.6', fontWeight: 'bold', marginTop: '20px' }}>Above all, remember: leadership is not a fixed trait - it’s a practice.</p>
                    <p style={{ lineHeight: '1.6' }}>This report is your guide to becoming the kind of leader who inspires, adapts, and thrives. We wish you success in building on your strengths and turning challenges into opportunities for lasting impact.</p>
                    <p style={{ marginTop: '50px', fontWeight: 'bold' }}>The Leadership Accelerator Team</p>
                </Page>
                <Page>
                    <SectionTitle>Your Privacy and Confidentiality Matter to Us</SectionTitle>
                    <p style={{ lineHeight: '1.6' }}>We want to assure you that this report and everything you have shared during the assessment - is completely confidential. The insights, responses, and results are meant solely for your personal development. No part of this report will be shared with anyone except you.</p>
                    <ul style={{ lineHeight: '1.6', listStylePosition: 'inside', marginTop: '20px' }}>
                        <li>Your data is not used for any other purpose no analysis, no benchmarking, no external sharing.</li>
                        <li>We do not store or reuse your individual responses in any way that links back to you personally.</li>
                    </ul>
                    <p style={{ lineHeight: '1.6', marginTop: '20px' }}>At Leadership Accelerator Company, we are deeply committed to your trust. This report is yours - for your reflection, growth, and use alone.</p>
                </Page>
                <Page>
                    <SectionIntro>
                        <h3 style={{ color: '#003366', marginBottom: '10px', marginTop: 0 }}>Executive Summary</h3>
                        <p style={{ margin: 0 }}>{executiveSummary}</p>
                    </SectionIntro>
                    <SectionTitle>Your Leadership Profile at a Glance</SectionTitle>
                    <p>This chart provides a holistic view of your leadership strengths based on your Power Quadrant™ results, visualizing your unique capabilities.</p>
                    <div style={{ height: '500px', maxWidth: '600px', margin: '40px auto' }}>
                        {chartData.length > 0 && <ImperiumRadarChart reportScores={chartData} />}
                    </div>
                </Page>
                {powerQuadrant && (<>
                    <Page>
                        <SectionTitle>{powerQuadrant.title}</SectionTitle>
                        <SectionIntro>
                            <p style={{ margin: 0 }}>The Power Quadrant&trade; represents the four distinct strengths that form the foundation of your unique leadership style. These traits are not just individual abilities - together, they create the force behind how you inspire, guide, and deliver impact in complex situations.</p>
                        </SectionIntro>
                        <div style={{ maxWidth: '600px', margin: '20px auto 40px auto' }}>
                            <GaugeChart strengths={powerQuadrant?.strengths} />
                        </div>
                    </Page>
                    <Page>
                        {powerQuadrant.strengths?.slice(0, 4).map((item, index) => (
                            <AnalysisCard key={`pq-${index}`} title={item.trait} score={item.score} analysis={item.analysis} isStrength={true} />
                        ))}
                    </Page>
                </>)}
                {breakthroughZone && (<>
                    <Page>
                        <SectionTitle>{breakthroughZone.title}</SectionTitle>
                        <SectionIntro>
                            <p style={{ margin: 0 }}>The Breakthrough Zone&trade; highlights the four key areas where intentional development will help you elevate your leadership impact. These are not weaknesses to be ashamed of - they are the very traits that, once strengthened, have the power to unlock your next level of effectiveness, influence, and success as a leader.</p>
                        </SectionIntro>
                        <div style={{ width: '100%', margin: '40px auto' }}>
                            <DivergingBarChart developmentAreas={breakthroughZone?.developmentAreas} />
                        </div>
                    </Page>
                    <Page>
                        {breakthroughZone.developmentAreas?.slice(0, 4).map((item, index) => (
                            <AnalysisCard key={`bz-${index}`} title={item.trait} score={item.score} analysis={item.analysis} isStrength={false} />
                        ))}
                    </Page>
                </>)}
                {mainArenas.length > 0 && (
                    <Page>
                        <SectionTitle>Trade-off Arenas Report</SectionTitle>
                        <SectionIntro>
                            <p style={{ margin: 0 }}>The <strong>Leadership Accelerator™ 8 Trade-off Arenas</strong> represent the core tensions that every modern leader must navigate. Leadership is rarely about clear-cut choices; it is about balancing competing demands with intention, clarity, and adaptability. This assessment offers a mirror that helps you see where you stand across these crucial arenas of leadership tension.</p>
                        </SectionIntro>
                    </Page>
                )}
                <Page>
                    <SectionTitle>Trade-off Arena Connections</SectionTitle>
                    <p>This diagram visualizes the interplay between core leadership values based on your decisions. The thickness of the bands (chords) indicates the strength of the connection in your leadership style.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <ChordDiagram data={chordData} />
                    </div>
                </Page>
                {mainArenas.map((item, index) => (
                    <Page key={`ta-${index}`}>
                        <SectionTitle>{item.arenaName}</SectionTitle>
                        {item.intro && <SectionIntro><p style={{ margin: 0 }}>{item.intro}</p></SectionIntro>}
                        <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.analysis}</div>
                    </Page>
                ))}
                {personalArenas.length > 0 && (
                    <Page>
                        <SectionTitle>Personal Trade-off Arenas Report</SectionTitle>
                        <SectionIntro>
                            <p style={{ margin: 0 }}>The <strong>Leadership Accelerator™ 4 Personal Trade-off Arenas</strong> represent the inner forces that quietly shape everything a leader does. This assessment offers a valuable opportunity to reflect on how your inner world shapes your outer impact - and to chart a path for stronger, more sustainable leadership.</p>
                        </SectionIntro>
                    </Page>
                )}
                {personalArenas.map((item, index) => (
                    <Page key={`pa-${index}`}>
                        <SectionTitle>{item.arenaName}</SectionTitle>
                        {item.intro && <SectionIntro><p style={{ margin: 0 }}>{item.intro}</p></SectionIntro>}
                        <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.analysis}</div>
                    </Page>
                ))}
                {leadershipArchetype && (
                    <Page>
                        <SectionTitle>{leadershipArchetype.title}</SectionTitle>
                        <SectionIntro>
                            <p style={{ margin: 0 }}>Sees and inspires others toward bold future possibilities, often focusing on the big picture over immediate details.</p>
                        </SectionIntro>
                        <AnalysisCard title={leadershipArchetype.archetype} analysis={leadershipArchetype.analysis} />
                    </Page>
                )}
            </div>
        </div>
    );
};

export default ImperiumReport;