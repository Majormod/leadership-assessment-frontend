import React, { useState, useRef, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Assuming these components are reusable or will be created
import SalesRadarChart from './SalesRadarChart'; // New chart for sales report
import RadialProgressChart from './RadialProgressChart';
// import SalesPDFDocument from './SalesPDFDocument'; // We will create this next

// --- Centralized Theme (Reused from MarketingReport) ---
const theme = {
    colors: {
        primary: '#1D2951', // Deeper Navy
        accent: '#4A90E2',  // Brighter Blue
        text: '#333333',
        lightText: '#555555',
        background: '#FFFFFF',
        lightBackground: '#F8F9FA',
        borderColor: '#DEE2E6',
    },
    fonts: { heading: "'Helvetica Neue', 'Arial', sans-serif", body: "'Helvetica Neue', Arial, sans-serif" },
};

// --- Helper Components (Reused from MarketingReport) ---
const Page = ({ children, className = '' }) => (
    <div className={`report-page ${className}`} style={{
        pageBreakAfter: 'always', padding: '20mm 15mm', backgroundColor: theme.colors.background,
        minHeight: '297mm', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
    }}>
        {children}
    </div>
);

const SectionTitle = ({ children }) => (
    <h2 style={{ fontFamily: theme.fonts.heading, fontSize: '2.2em', color: theme.colors.primary, borderBottom: `3px solid ${theme.colors.accent}`, paddingBottom: '10px', marginBottom: '25px' }}>{children}</h2>
);

const SubTitle = ({ children }) => ( <h4 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, marginTop: '25px', marginBottom: '10px' }}>{children}</h4> );

// --- NEW DATA STRUCTURES FOR SALES REPORT ---

// Contains all static text for the 8 main groups
const salesReportGroups = {
    'Market & Opportunity Sensing': {
        title: "Group 1. Market & Opportunity Sensing",
        description: "Sales excellence begins with the ability to read the landscape before others do. This group measures how effectively a professional anticipates demand shifts, interprets signals, and positions themselves ahead of the curve. It brings together five critical capabilities: awareness of how channels evolve, sensitivity to emerging opportunities, the skill to mine customer insights, the discipline to stay connected to ground realities, and the foresight to track competitors. Together, these traits reveal whether a salesperson operates reactively — responding only once the market has moved — or proactively, shaping opportunities before they become obvious. Strong performers in this group do not rely on a single source of intelligence; they integrate top-down analysis with bottom-up cues, translating noise from the field into structured action. In fast-moving, contested markets, this ability to sense and act early is what differentiates professionals who sustain growth from those who are surprised by it."
    },
    'Prospecting & Demand Creation': {
        title: "Group 2. Prospecting & Demand Creation",
        description: "No sales pipeline sustains itself. This group measures a professional's ability to consistently generate new opportunities, regardless of market conditions or temporary setbacks. It brings together five core traits: agility in sourcing leads across multiple channels, skill in designing activations that create customer interest, the approachability that opens conversations, the ability to leverage networks and referrals, and the resilience to keep prospecting with discipline even in difficult periods. Together, these capabilities determine whether a salesperson can keep the funnel healthy and future-oriented. Strong performers in this group do not rely on luck or sporadic bursts of activity; they create repeatable rhythms of prospecting that withstand rejection, market shifts, and competitive noise. In the long run, consistent demand creation is not only the fuel for short-term quota achievement but also the foundation for sustainable growth and career progression."
    },
    // ... Other 6 groups would be here
    'Team Management': {
        title: "Group 8. Team Management",
        description: "Sales leadership is not defined by personal performance alone but by the ability to build, align, and sustain effective teams. This group evaluates a professional's capacity to translate company targets into aligned goals, coach and develop talent, maintain motivation, manage performance with balance, and foster collaboration across the sales ecosystem. Together, these traits reveal whether an individual can move beyond individual contribution to collective impact. Strong performers in this group understand that sales growth depends on people as much as strategy. They set goals that inspire without overwhelming, invest in developing their team, and keep morale high even under pressure. They balance accountability with support, addressing underperformance without damaging trust. Most importantly, they build cultures of cohesion where knowledge flows freely and results are achieved together, rather than through isolated star performers. In today's competitive environment, these capabilities are the foundation of scalable, sustainable sales success."
    }
};

// Contains all static text for the Proprietary Indices
const salesReportIndices = {
    'Foresight-in-Action Index': {
        title: "Foresight-in-Action Index",
        description: "The Foresight-in-Action Index measures a salesperson's ability to anticipate opportunities before they become obvious and to act on them decisively. It combines macro vision - the skill of spotting emerging demand pockets, seasonal triggers, or competitive gaps with micro awareness drawn from distributor sentiment, local events, and frontline signals. High performance in this index reflects not just the ability to see change early, but also to translate foresight into decisive, practical action faster than competitors. In dynamic markets, this blend of vision and agility is often the difference between leading growth and playing catch-up."
    },
    // ... Other 12 indices would be here
    'Team Performance Engine': {
        title: "Team Performance Engine",
        description: "The Team Performance Engine measures a leader's ability to set direction, enforce accountability, build capability, and sustain cohesion. It integrates four critical leadership disciplines: performance management (monitoring and correcting results constructively), collaboration & cohesion (fostering teamwork and shared accountability), goal setting & alignment (translating company targets into clear, achievable objectives), and coaching & development (growing team capability through feedback and mentoring). High scores across this quad signal a leader who can balance stretch targets with people development, making them strong candidates for regional or multi-team responsibility. However, gaps within the pattern highlight risks: for example, strong goal-setting but weak coaching may create compliance without genuine skill-building, while strong coaching without performance management risks a lack of discipline. This index reflects not only management capability, but also the capacity to create sustainable, high-performing sales cultures."
    }
};


// Contains static descriptions for the Executive Summary sections
const executiveSummaryDescriptions = {
    composite: { title: "Composite Score", description: "A single index that reflects the participant's overall sales performance capability, benchmarked against peer groups and industry norms. It integrates opportunity sensing, prospecting agility, competitive acumen, customer engagement skill, negotiation discipline, execution consistency, relationship depth, and leadership orientation into one coherent measure." },
    strengths: { title: "Top Three Strengths", description: "The capabilities where the participant demonstrates consistent excellence. These strengths are derived from correct responses, calibrated judgment in complex trade-offs, and evidence of disciplined execution. They represent the foundation upon which sustainable sales performance, customer trust, and future leadership credibility can be built." },
    priorities: { title: "Top Three Development Priorities", description: "The areas where focused improvement will create the greatest sales impact. These priorities are identified not only through incorrect responses but also through patterns of inconsistency, over-reliance on narrow approaches, or risk blind spots that may restrict advancement into more complex sales roles." },
    flags: { title: "Immediate Attention Flags", description: "Critical findings that demand urgent focus. These may include severe margin misjudgments, channel management risks, or high inconsistency scores that could compromise forecast reliability, damage customer confidence, or weaken credibility with senior leadership if left unaddressed." },
    nextStep: { title: "Recommended Next Step", description: "A clear, practical call to action - whether a targeted module from the Sales Performance School, a specialized Masterclass on negotiation or channel strategy, or one-to-one coaching. This ensures the assessment transitions seamlessly into a personalized journey, converting diagnostic clarity into measurable improvement." },
    impact: { title: "Career Impact Statement", description: "The career impact statement distils the results of the Sales Performance Index™ into a single forward-looking line, connecting diagnostic insights with real-world sales outcomes. Its purpose is to translate scores into a clear expression of how an individual's sales capability positions them for quota achievement, account growth, and leadership progression. By compressing complex analytics into one precise sentence, it provides an immediate sense of professional trajectory whether signaling readiness for larger territories, highlighting areas that must be strengthened to win contested markets, or framing the developmental journey required to accelerate long-term success." }
};

// --- Main Report Component ---
const SalesPerformanceReport = ({ report }) => {
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const chartRefs = useRef({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleDownloadPdf = async () => {
        // This function would be a copy of the one in MarketingReport,
        // but it would call <SalesPDFDocument /> and save the file as
        // "Sales-Performance-Index-Report.pdf". For brevity, it is omitted here
        // but the logic is identical.
        alert("PDF generation logic would run here!");
    };

    if (!report || !report.analysis) {
        return <Page><h2>Generating Your Sales Performance Report...</h2></Page>;
    }

    const { userInfo, scores, analysis } = report;

    // Prepare data for the 8-group Radar Chart
    const radarChartData = scores.groups ? Object.keys(scores.groups).map(key => {
        // Split long group names into multi-line labels for the chart
        const label = key.replace(' & ', ' &\n').split(' ');
        const multiLineLabel = [];
        if (label.length > 3) {
             multiLineLabel.push(label.slice(0, 2).join(' '));
             multiLineLabel.push(label.slice(2).join(' '));
        } else {
            multiLineLabel.push(key);
        }
        
        return {
            dimension: multiLineLabel, // This now matches the expected prop key ('dimension')
            score: parseFloat(scores.groups[key].toFixed(1)) // This now matches ('score')
        };
    }) : [];

    return (
        <div style={{ fontFamily: theme.fonts.body, color: theme.colors.text, maxWidth: '900px', margin: '0 auto', backgroundColor: '#e9ecef' }}>
            <div style={{ padding: '20px', backgroundColor: 'white', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '1.1em' }}>Your personalized report is ready.</p>
                {isClient && (
                    <button onClick={handleDownloadPdf} disabled={isGenerating} style={{
                        padding: '12px 25px', fontSize: '1.1em', cursor: 'pointer', backgroundColor: theme.colors.accent,
                        color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px',
                        opacity: isGenerating ? 0.5 : 1
                    }}>
                        {isGenerating ? 'Generating PDF...' : 'Download Report as PDF'}
                    </button>
                )}
            </div>

            <div>
                {/* --- Static "About" Pages --- */}
                <Page>
                    <SectionTitle>The Sales Performance Index™</SectionTitle>
                    <p style={{ lineHeight: 1.7 }}>At The Leadership Accelerator, we believe that sales is not just a function it is the frontline of value creation, where markets are won or lost one conversation at a time. In an age of complex buyer journeys, fragmented channels, and relentless competition, true sales excellence is not about charm or persistence alone, but about judgment, discipline, and adaptability under pressure.</p>
                    <p style={{ lineHeight: 1.7 }}>The Sales Performance Index™ is our proprietary diagnostic designed to measure and elevate these very capabilities. Built on research across B2B, B2C, retail, and distribution contexts, it goes beyond product knowledge or closing skills. Instead, it evaluates the eight dimensions that define modern sales performance - from opportunity sensing and competitive positioning, to negotiation discipline, execution habits, and team leadership.</p>
                     {/*... More static text from the PDF would go here ...*/}
                </Page>

                {/* --- Executive Summary Page --- */}
                <Page>
                    <SectionTitle>Executive Summary</SectionTitle>
                    {Object.entries(analysis).slice(0, 6).map(([key, value]) => ( // Assuming first 6 are for the summary
                        <div key={key} style={{ marginBottom: '25px' }}>
                            <SubTitle>{executiveSummaryDescriptions[key]?.title || key}</SubTitle>
                            <p style={{ fontStyle: 'italic', color: theme.colors.lightText, marginTop: '-5px', marginBottom: '10px' }}>
                                {executiveSummaryDescriptions[key]?.description}
                            </p>
                            <div style={{ padding: '15px', border: `1px solid ${theme.colors.borderColor}`, borderRadius: '4px', background: theme.colors.lightBackground, whiteSpace: 'pre-wrap' }}>
                                {value}
                            </div>
                        </div>
                    ))}
                </Page>

                {/* --- Key Findings Page with Radar Chart --- */}
                <Page>
                    <SectionTitle>Key Findings at a Glance</SectionTitle>
                     <p style={{ lineHeight: 1.7 }}>This section delivers a clear and visual summary of the participant's performance across the Sales Performance Index™ framework. A radar chart maps results across eight critical dimensions spanning opportunity sensing, prospecting agility, competitive positioning, customer engagement, negotiation acumen, relationship depth, execution discipline, and team leadership - providing an integrated capability profile that captures both breadth and depth of sales effectiveness.</p>
                    <div ref={el => (chartRefs.current['radarChart'] = el)} style={{ width: '100%', height: '500px', marginTop: '40px' }}>
                        <SalesRadarChart data={radarChartData} />
                    </div>
                </Page>

                {/* --- Detailed Analysis for the 8 Groups --- */}
                {Object.entries(salesReportGroups).map(([key, content]) => (
                    <Page key={key}>
                        <SectionTitle>{content.title}</SectionTitle>
                        <p style={{ lineHeight: 1.7, fontStyle: 'italic', color: theme.colors.lightText }}>{content.description}</p>
                        <div style={{ marginTop: '30px', padding: '25px', backgroundColor: theme.colors.lightBackground, border: `1px solid ${theme.colors.borderColor}` }}>
                            <div ref={el => (chartRefs.current[key] = el)} style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                                <RadialProgressChart score={scores.groups[key]} benchmark={65} topPerformer={90} />
                            </div>
                            <h4 style={{fontFamily: theme.fonts.heading, color: theme.colors.primary, textAlign: 'center'}}>Diagnostic Analysis</h4>
                            <p style={{whiteSpace: 'pre-wrap', lineHeight: 1.7}}>{analysis.groups[key]}</p>
                        </div>
                    </Page>
                ))}

                {/* --- Detailed Analysis for the Proprietary Indices --- */}
                {Object.entries(salesReportIndices).map(([key, content]) => (
                     <Page key={key}>
                        <SectionTitle>{content.title}</SectionTitle>
                        <p style={{ lineHeight: 1.7, fontStyle: 'italic', color: theme.colors.lightText }}>{content.description}</p>
                         <div style={{ marginTop: '30px', padding: '25px', backgroundColor: theme.colors.lightBackground, border: `1px solid ${theme.colors.borderColor}` }}>
                            <div ref={el => (chartRefs.current[key] = el)} style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                                <RadialProgressChart score={scores.indices[key]} benchmark={65} topPerformer={90} />
                            </div>
                            <h4 style={{fontFamily: theme.fonts.heading, color: theme.colors.primary, textAlign: 'center'}}>Diagnostic Analysis</h4>
                            <p style={{whiteSpace: 'pre-wrap', lineHeight: 1.7}}>{analysis.indices[key]}</p>
                        </div>
                    </Page>
                ))}
            </div>
        </div>
    );
};

export default SalesPerformanceReport;