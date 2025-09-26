// components/MarketingPDFDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

/*
// Font registration remains the same.
Font.register({
    family: 'Roboto',
    fonts: [
        { 
            src: '/marketing-quotient/fonts/Roboto-Regular.ttf', 
            fontWeight: 400, 
            fontStyle: 'normal' 
        },
        { 
            src: '/marketing-quotient/fonts/Roboto-Bold.ttf', 
            fontWeight: 700, 
            fontStyle: 'normal' 
        },
        { 
            src: '/marketing-quotient/fonts/Roboto-Italic.ttf', 
            fontWeight: 400, 
            fontStyle: 'italic' 
        },
        { 
            src: '/marketing-quotient/fonts/Roboto-BoldItalic.ttf', 
            fontWeight: 700, 
            fontStyle: 'italic' 
        },
    ]
});
*/

// Styles have been slightly adjusted for better list formatting.
const styles = StyleSheet.create({
    page: {
        paddingTop: '15mm',
        paddingBottom: '20mm',
        paddingHorizontal: '15mm',
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333333',
    },
    centerPage: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    logo: { width: 180, marginBottom: 15 },
    h1: { fontSize: 28, fontWeight: 700, color: '#1D2951', marginBottom: 15, textAlign: 'center' },
    h2: { fontSize: 18, fontWeight: 700, color: '#1D2951', borderBottom: 2, borderColor: '#4A90E2', paddingBottom: 8, marginBottom: 20, alignSelf: 'flex-start', width: '100%' },
    h3: { fontSize: 12, fontWeight: 700, color: '#1D2951', marginBottom: 10, marginTop: 15 },
    text: { marginBottom: 10, fontWeight: 400, textAlign: 'justify' },
    italic: { fontStyle: 'italic', color: '#555' },
    bold: { fontWeight: 700 },
    coverPageText: { fontFamily: 'Helvetica', fontSize: 12, marginTop: 80, fontWeight: 400 },
    coverPageName: { fontFamily: 'Helvetica', fontWeight: 700, fontSize: 20, color: '#1D2951', marginTop: 5 },
    analysisBox: 
    { marginTop: 15, padding: 15, backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: 5, marginBottom: 15 
    },
    reportBlock: {
    backgroundColor: '#F8F9FA',
    border: '1px solid #DEE2E6',
    borderRadius: 5,
    padding: '15px',
    marginBottom: '10px', // This creates the space between blocks
    },
    chartImage: { width: '90%', marginTop: 10, marginBottom: 15, alignSelf: 'center' },
    footer: { position: 'absolute', bottom: '10mm', left: '15mm', right: '15mm', textAlign: 'center', color: 'grey', fontSize: 8 },
    bulletContainer: { flexDirection: 'row', marginBottom: 5, paddingLeft: 10 },
    bulletPoint: { width: 10, fontSize: 10, marginRight: 5 },
    bulletText: { flex: 1 },
});

// Reusable Bullet component for lists.
const Bullet = ({ children }) => (
    <View style={styles.bulletContainer}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.bulletText}>{children}</Text>
    </View>
);

// New component for rich text bullets (bold title + regular text)
const RichBullet = ({ title, children }) => (
     <View style={styles.bulletContainer}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.bulletText}>
            <Text style={styles.bold}>{title}: </Text>
            {children}
        </Text>
    </View>
);


const Footer = () => (
    <Text style={styles.footer} fixed>
        www.leadershipaccel.com
    </Text>
);

const MarketingPDFDocument = ({ report, logoDataURI, chartImages }) => {
    if (!report) return <Document><Page><Text>Loading report data...</Text></Page></Document>;

    const { scoredResults, executiveSummary, detailedAnalysis, reportStructureData, executiveSummaryDescriptions } = report;

    return (
        <Document>
            {/* --- Cover Page --- 
            <Page size="A4" style={styles.page}>
                <View style={styles.centerPage}>
                    {logoDataURI && <Image style={styles.logo} src={logoDataURI} alt="Logo" />}
                    <Text style={styles.h1}>The Marketing Influence Quotient™</Text>
                    <Text style={{ color: '#4A90E2', fontSize: 14 }}>Accelerating Success</Text>
                    <Text style={styles.coverPageText}>Personalized Report For:</Text>
                    <Text style={styles.coverPageName}>{report.userInfo?.name || 'Valued Professional'}</Text>
                </View>
                <Footer />
            </Page>
*/}
            {/* --- "About" Pages --- */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.h2}>The Leadership Accelerator</Text>
                <Text style={styles.text}>Leadership Accelerator is a global platform committed to redefining professional excellence in the age of disruption. We empower leaders and innovators to sharpen their judgment, expand their influence, and accelerate their growth through cutting-edge learning experiences rooted in research and real-world application.</Text>
                <Text style={styles.text}>Our mission is not just to train professionals but to transform them into decision-makers who thrive in complexity, lead with clarity, and shape markets with confidence.</Text>
                <Text style={styles.text}>By combining rigorous assessments, advanced learning design, and actionable insights, we are building the next generation of leaders who will change the way the world does business.</Text>
                <Text style={styles.text}>At The Leadership Accelerator, everything begins with assessments.</Text>
                <Text style={styles.text}>We believe that transformation starts with clarity - knowing where you stand, what your strengths are, and where blind spots hold you back. </Text>
                <Text style={styles.text}>Our world-class diagnostic tools, like The Marketing Influence Quotient™, go beyond surface knowledge to reveal how you think, decide, and lead. These insights form the foundation of every journey we design.</Text>
                <Text style={styles.text}>From assessment, we move to action. Our next step is a portfolio of video-based learning programs, organized into ten specialized Schools of Leadership covering strategy, marketing, influence, decision-making, innovation, and more. Each school is crafted with global best practices, equipping professionals not just with skills but with the ability to apply them under real-world complexity.</Text>
                <Text style={styles.text}>We then extend learning through books that distil frameworks into stories, Masterclasses that create immersion, and 1-on-1 personal coaching that delivers bespoke guidance for high-stakes leaders.</Text>
                <Text style={styles.text}>Together, these offerings form an integrated ecosystem that supports leaders at every stage of their growth journey - from ambitious professionals accelerating their rise to senior executives redefining industries.</Text>
                <Text style={styles.text}>Our motto, “Accelerating Success,” is not a promise of speed alone, but of precision and direction. We exist to shorten the gap between potential and performance, between knowledge and influence, between ambition and achievement. By blending rigorous diagnostics with transformative learning and personalized mentorship, The Leadership Accelerator is changing the way professionals prepare for impact.</Text>
                <Text style={styles.text}>We are not here to create more managers; we are here to build leaders who thrive in ambiguity, inspire confidence, and shape markets.</Text>
                <Text style={styles.text}>This is how we accelerate success - for individuals, for organizations, and for the future of leadership itself.</Text>
                <Footer />
            </Page>
            <Page size="A4" style={styles.page}>
                <Text style={styles.h2}>The Marketing Influence Quotient™</Text>
                <Text style={styles.text}>The Marketing Influence Quotient™ (MIQ™) is the world’s most advanced diagnostic assessment for marketing professionals - a groundbreaking tool designed to measure not only what you know, but also how you think, decide, and lead. In an era where marketing demands extend far beyond technical skills, MIQ™ evaluates the multidimensional capability of a professional: strategic judgment, commercial acumen, leadership orientation, creativity, and numerical rigor.</Text>
                <Text style={styles.text}>Unlike conventional tests that reward surface-level memorization or textbook recall, MIQ™ is built to simulate the real tensions of marketing leadership. Each question is carefully engineered to force trade-offs, test adaptability under ambiguity, and reveal how individuals respond to the competing demands of short-term performance versus long-term brand equity, efficiency versus effectiveness, global alignment versus local nuance, and creativity versus discipline. This design ensures that results reflect how professionals will perform not in theory, but under the same high-pressure conditions they face in their careers.</Text>
                <Text style={styles.text}>What makes MIQ™ distinctive is its dual promise - it is both a diagnostic and a developmental engine. Every response is mapped into a detailed analytics framework that highlights strengths, exposes blind spots, and identifies patterns of contradiction or inconsistency. Yet, the assessment doesn’t stop at diagnosis. It directly connects outcomes to personalized learning pathways - including advanced video courses, targeted masterclasses, curated readings, and one-on-one coaching opportunities through The Leadership Accelerator.</Text>
                <Text style={styles.text}>Respected by executives and admired across industries, MIQ™ has become a benchmark of credibility and influence. It signals to employers, boards, and peers that a professional possesses not only technical mastery but also the rare ability to balance competing priorities with clarity, conviction, and creativity. For ambitious marketers, MIQ™ is more than an assessment - it is a career catalyst, designed to accelerate growth, strengthen leadership influence, and position you for lasting impact in the global marketplace.</Text>
                <Footer />
            </Page>

            {/* --- Assessment Details Page (FULLY UPDATED) --- */}
            <Page size="A4" style={styles.page} wrap>
                <Text style={styles.h2}>Assessment Details</Text>
                <Text style={styles.h3}>Purpose & Scope</Text>
                <Text style={styles.text}>The Marketing Influence Quotient™ (MIQ) is designed to measure not only what professionals know about marketing but how they think, decide, and influence outcomes in complex business environments. Its purpose is to provide a holistic, evidence-based view of marketing capability - one that goes beyond surface knowledge to uncover strengths, blind spots, and developmental opportunities that directly impact career progression and organizational performance.</Text>
                <Text style={styles.text}>The assessment is structured as a multi-module experience, balancing both conceptual and applied challenges. Participants complete a mix of Knowledge questions (theory and frameworks), Application exercises (real-world scenarios and trade-offs), Psychometric items (mirrored trade-offs and consistency checks), Creativity tasks (narrative and communication choices), Decision-Making dilemmas (ambiguous stakeholder challenges), Reflection items (self-awareness and adaptability), and Numeric rigor tests (CLV, ROI, ROMI, and other financial measures). Together, these modules ensure the MIQ captures both breadth and depth of marketing influence.</Text>
                <Text style={styles.text}>Results are delivered through a dual-mode feedback logic.</Text>
                <Text style={styles.text}>For correct responses, the system provides diagnostic insight into what the choice reveals about the participant’s strengths and orientations.</Text>
                <Text style={styles.text}>For incorrect responses, the system offers remediation guidance - explaining the conceptual gap and linking directly to targeted learning resources. </Text>
                <Text style={styles.text}>This approach ensures that the assessment functions not as a pass/fail exam but as a springboard for development, seamlessly connecting diagnostics with personalized growth pathways.</Text>
                <Text style={styles.h3}>Methodology & Psychometrics</Text>
                <Text style={styles.text}>The Marketing Influence Quotient™ has been developed through a rigorous multi-stage design process that combines marketing expertise, behavioural science, and psychometric best practice. Each item has been crafted to move beyond surface-level recall, with long-form multiple-choice questions that test conceptual depth, scenario-based applications that replicate real-world dilemmas, and mirrored trade-off statements that reveal underlying orientations and consistency of thought. Forced-choice tasks and allocation exercises are incorporated to simulate the ambiguity and prioritization pressures faced by senior marketers.</Text>
                <Text style={styles.text}>Reliability and validity have been central to test construction. Internal consistency is evaluated through measures such as Cronbach’s alpha and inter-item correlation checks across modules.</Text>
                <Text style={styles.text}>Pilot studies and item response analyses ensure that questions discriminate effectively between levels of proficiency while avoiding cultural or industry bias. Norms are continually updated through benchmarking against diverse peer groups and seniority cohorts, strengthening the robustness of comparative insights.</Text>
                <Text style={styles.text}>To mitigate the risk of “perfect-answer” bias - where participants attempt to present themselves as ideal rather than authentic - the MIQ integrates mirrored items, contradiction detection, and forced trade-offs. These mechanisms surface inconsistencies, reveal hidden biases, and highlight areas where stated preferences diverge from demonstrated choices. As a result, the MIQ not only measures capability but also captures orientation, adaptability, and credibility under pressure - dimensions that matter most for leadership in marketing.</Text>
                <Footer />
            </Page>
            
            {/* --- Scoring & Proprietary Analytics Page (FULLY UPDATED) --- */}
            <Page size="A4" style={styles.page} wrap>
                <Text style={styles.h2}>Scoring & Proprietary Analytics</Text>
                <Text style={styles.h3}>Scoring & Benchmarking Framework</Text>
                <Text style={styles.text}>The Marketing Influence Quotient™ (MIQ) is scored through a structured, multi-layered framework designed to capture both capability and orientation. Results are first broken down into dimension scores - covering areas such as knowledge mastery, application judgment, decision-making agility, creativity, numerical rigor, and leadership orientation. These dimension-level results are then aggregated into a composite MIQ score, which provides a single index of overall marketing influence capability.</Text>
                <Text style={styles.text}>Scoring follows a dual-mode logic. For correct responses, feedback emphasizes diagnostic interpretation - what the choice reveals about strengths and orientations. For incorrect responses, the system provides remediation guidance, identifying conceptual gaps and linking to targeted learning paths. Alongside this, a Contradiction Index tracks consistency across mirrored items and forced-choice trade-offs, surfacing areas where responses suggest impression management or hidden biases. Confidence intervals are applied to reflect the statistical reliability of each score, ensuring findings are interpreted with appropriate nuance.</Text>
                <Text style={styles.text}>Benchmarking gives the MIQ its comparative power. Individual results are expressed as both raw scores and percentile rankings, situating the participant against relevant peer groups. Norms are drawn from multiple cohorts - including role-level cohorts (e.g., mid-level marketer, senior CMO), industry-level cohorts (e.g., FMCG, technology, financial services), and age-level cohorts (e.g., early-career, mid-career, senior professionals). This ensures that results are contextualized, highlighting not just how a candidate performs in absolute terms, but how their influence capability compares to peers they are most likely to compete with in the marketplace.</Text>
                
                <Text style={styles.h2}>Proprietary Analytics</Text>
                <Text style={styles.h3}>What We Measure</Text>
                <Text style={styles.text}>The Marketing Influence Quotient™ goes beyond correct and incorrect answers to generate a suite of proprietary indices that together form a multidimensional picture of marketing capability. Each index captures a distinct aspect of influence, enabling both granular diagnostics and integrated leadership insights.</Text>
                <RichBullet title="Knowledge Mastery">Assesses depth of understanding across marketing theories, frameworks, and principles, with emphasis on nuanced distinctions rather than surface-level recall.</RichBullet>
                <RichBullet title="Application Judgment">Evaluates the ability to apply concepts under real-world complexity, balancing strategic frameworks with situational pragmatism.</RichBullet>
                <RichBullet title="Psychometric Consistency Index">Detects alignment or contradiction across mirrored trade-off items, surfacing whether choices reflect coherent orientations or impression management.</RichBullet>
                <RichBullet title="Trade-off Orientation Vector">Maps where a candidate consistently positions themselves across strategic tensions (e.g., brand vs performance, global vs local), revealing directional biases.</RichBullet>
                <RichBullet title="Decision-Making Agility">Measures speed, adaptability, and prioritization in forced-choice scenarios, reflecting capability under time and stakeholder pressure.</RichBullet>
                <RichBullet title="Creativity Index">Captures originality, narrative sophistication, and effectiveness in communication-based exercises, indicating power to shape brand meaning.</RichBullet>
                <RichBullet title="Execution Discipline Index">Gauges rigor in adhering to timelines, budgets, and deliverables, testing whether candidates can translate strategy into reliable operational results.</RichBullet>
                <RichBullet title="Numerical Rigor Score">Assesses accuracy and confidence with financial calculations (e.g., CLV, ROI, CAC), identifying commercial fluency critical for cross-functional credibility.</RichBullet>
                <RichBullet title="Ethics & Trust Index">Evaluates responses to dilemmas involving transparency, fairness, and stakeholder responsibility, highlighting orientation toward long-term trust over short-term gain.</RichBullet>
                <RichBullet title="Leadership Orientation">Analyzes trade-offs in managing teams, talent, and influence, surfacing readiness for senior marketing leadership roles.</RichBullet>
                <Text style={{...styles.text, marginTop: 10}}>Underlying these indices is a robust analytic framework. Responses are analyzed through pattern detection to reveal consistency, item response weighting to reflect difficulty levels, and advanced methods such as regression and cluster analysis to identify typologies of marketers. This ensures that the MIQ™ captures not only what participants know and decide, but also how they think, where they lean, and what kind of leader they are likely to become.</Text>
                <Footer />
            </Page>

            {/* --- Executive Summary Page --- */}
            <Page size="A4" style={styles.page} wrap>
                <Text style={styles.h2}>Executive Summary</Text>
                {Object.entries(executiveSummaryDescriptions).map(([key, value]) => (
                    <View key={key} style={{ marginBottom: 15 }} wrap={false}> 
                        <Text style={styles.h3}>{value.title}</Text>
                        <Text style={{ ...styles.italic, fontSize: 9, marginBottom: 5 }}>{value.description}</Text>
                        <Text style={{...styles.analysisBox, padding: 10}}>{executiveSummary[key]}</Text>
                    </View>
                ))}
                <Footer />
            </Page>

            {/* --- Key Findings Page (FULLY UPDATED) --- */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.h2}>Key Findings at a Glance</Text>
                <Text style={{ ...styles.italic, marginBottom: 10 }}>This section provides a visual summary of the participant’s performance across The Marketing Influence Quotient™ framework. The composite score is expressed both as a percentage and as a percentile rank, allowing direct comparison against peer groups and industry benchmarks.</Text>
                <Text style={styles.text}>Alongside this, a radar chart presents results across ten core dimensions - from knowledge mastery and applied judgment to decision-making agility, creativity, numerical rigor, and leadership orientation - offering an integrated view of the participant’s capability profile.</Text>
                <Text style={styles.text}>To aid interpretation, quick callouts highlight areas of relative strength (green), areas requiring sustained development (yellow), and dimensions that demand immediate attention (red).</Text>
                <Text style={styles.text}>This color-coded system ensures that the results are not just descriptive but actionable, helping individuals and organizations quickly identify where energy and investment should be focused to accelerate growth and performance.</Text>
                <Text style={{ ...styles.h1, fontSize: 20, marginBottom: 10, marginTop: 20 }}>Your Marketing Index: {scoredResults.percentage.toFixed(1)}%</Text>
                {chartImages['keyFindings'] && <Image style={{ ...styles.chartImage, width: '100%', marginTop: 20 }} src={chartImages['keyFindings']} alt="Key Findings Chart" />}
                <Footer />
            </Page>

            {/* --- Detailed Analysis Pages (RESTRUCTURED FOR PAGE BREAK) --- */}
            {/* --- Detailed Analysis Pages (Corrected Structure) --- */}
{Object.keys(reportStructureData).map((key) => {
    const staticData = reportStructureData[key];
    const aiAnalysis = detailedAnalysis[key];
    if (!staticData || !aiAnalysis) return null;
    const isTradeoff = !!staticData.subTopics;

    return (
        <React.Fragment key={key}>
            {/* PAGE 1: Static Content FOLLOWED BY Chart */}
            <Page size="A4" style={styles.page} wrap>
                {/* Static Content (description, bullets, etc.) */}
                <Text style={styles.h2}>{staticData.title}</Text>
                <Text style={{ ...styles.text, ...styles.italic }}>{staticData.mainDescription}</Text>
                
                {isTradeoff ? (
                    <>
                        <Text style={styles.h3}>{staticData.subTopicsTitle}</Text>
                        {staticData.subTopics.map((topic, i) => <Bullet key={i}>{topic}</Bullet>)}
                        {/*
                        <Text style={styles.h3}>{staticData.judgedByTitle}</Text>
                        {staticData.judgedByItems.map((item, i) => <Bullet key={i}>{item}</Bullet>)}
                        */}
                        <Text style={styles.h3}>{staticData.mattersWhyTitle}</Text>
                        <Text style={styles.text}>{staticData.mattersWhyText}</Text>
                    </>
                ) : (
                    <Text style={styles.text}>{staticData.performanceContext}</Text>
                )}

                {/* The Title and Chart Block now appears on the same page as the static content */}
                <View style={styles.reportBlock} wrap={false}>
                    <Text style={{ ...styles.h3, textAlign: 'center', marginTop: 0 }}>Your Personalized Analysis</Text>
                    {chartImages[key] && <Image style={styles.chartImage} src={chartImages[key]} alt={`Chart for ${staticData.title}`} />}
                </View>
                <Footer />
            </Page>

            {/* PAGE 2: The Text-Only Analysis Blocks start on a new page */}
            <Page size="A4" style={styles.page} wrap>
                <View style={styles.reportBlock} wrap={false}>
                    <Text style={styles.h3}>Diagnostic Review</Text>
                    <Text style={styles.text}>{aiAnalysis.diagnosticReview}</Text>
                </View>

                <View style={styles.reportBlock} wrap={false}>
                    <Text style={styles.h3}>Benchmark Comparison</Text>
                    <Text style={styles.text}>{aiAnalysis.benchmarkComparison}</Text>
                </View>

                <View style={styles.reportBlock} wrap={false}>
                    <Text style={styles.h3}>Career Implications</Text>
                    <Text style={styles.text}>{aiAnalysis.careerImplications}</Text>
                </View>
                
                <Footer />
            </Page>
        </React.Fragment>
    );
})}

            {/* --- Final Logo Page --- 
            <Page size="A4" style={styles.page}>
                <View style={styles.centerPage}>
                    {logoDataURI && <Image style={styles.logo} src={logoDataURI} alt="Logo" />}
                    <Text style={{ color: '#4A90E2', fontSize: 20 }}>Accelerating Success</Text>
                </View>
                <Footer />
            </Page>
            */}
        </Document>
    );
};

export default MarketingPDFDocument;