// components/AssessmentReport.js - FINAL LINTING-FIXED VERSION - 28-06-25

import React from 'react';
import Image from 'next/image';
import { ComparisonBarChart, LeadershipRadarChart } from './ReportCharts';

// Helper components to keep JSX clean and styled
const SectionTitle = ({ children }) => <h2 style={{ fontSize: '2em', color: '#003366', borderBottom: '2px solid #0056b3', paddingBottom: '10px', marginBottom: '20px' }}>{children}</h2>;
const SectionIntro = ({ children }) => <p style={{ fontStyle: 'italic', color: '#555', marginTop: '10px', lineHeight: '1.6', fontSize: '1.1em' }}>{children}</p>;
const Page = ({ children }) => <div style={{ pageBreakAfter: 'always', padding: '40px', backgroundColor: 'white' }}>{children}</div>;

const FacetItem = ({ facet }) => {
    if (!facet || facet.error) {
        return (
            <div className="facet-item" style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fff5f5'}}>
                <h3>{facet?.name || "Unnamed Facet"}</h3>
                <p style={{color: 'red'}}>An error occurred while generating this section.</p>
            </div>
        );
    }
    return (
        <div style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9'}}>
            <h3>{facet.name}</h3>
            <p style={{fontStyle: 'italic', fontSize: '0.9em', borderLeft: '3px solid #ccc', paddingLeft: '10px', color: '#444'}}>{facet.definition}</p>
            <h4>Evaluation</h4>
            <ul>{facet.evaluation?.map((e, i) => <li key={i} style={{lineHeight: '1.5'}}>{e}</li>)}</ul>
            <h4>Strengths Observed</h4>
            <ul>{facet.strengths?.map((s, i) => <li key={i} style={{lineHeight: '1.5'}}>{s}</li>)}</ul>
            <h4>Gaps Observed</h4>
            <ul>{facet.gaps?.map((g, i) => <li key={i} style={{lineHeight: '1.5'}}>{g}</li>)}</ul>
        </div>
    );
};

const AssessmentReport = React.forwardRef(({ report }, ref) => {
    if (!report) { return <Page><h2>Generating Report...</h2></Page>; }
    const { powerQuadrant, breakthroughZone, leadershipFacets, extendedFacets, depthMap } = report;

    return (
        <div ref={ref} style={{ fontFamily: 'sans-serif', color: '#333', maxWidth: '900px', margin: '0 auto', backgroundColor: 'white' }}>
            
            <Page>
                <Image src="/logo.png" alt="Leadership Accelerator Logo" width={200} height={80} />
                <h1 style={{ marginTop: '30px', color: '#003366' }}>Welcome to your personalized leadership journey.</h1>
                <p style={{lineHeight: '1.6'}}>We&apos;re delighted to have you take this important step toward deepening your leadership capability. The assessment you&apos;ve just completed is not an exam - it&apos;s a powerful tool designed to help you reflect, discover, and grow. Through this case-based, real-world simulation, you&apos;ve been challenged to think, decide, and lead as modern leaders do across complexity, ambiguity, and competing priorities.</p>
                <p style={{lineHeight: '1.6'}}>At Leadership Accelerator, we believe that leadership is not just a title - it&apos;s a craft. A craft that can be sharpened, evolved, and elevated at every stage of your career. This report is the first step in that ongoing process.</p>
                <p style={{fontWeight: 'bold', marginTop: '20px'}}>Our promise to you:</p>
                <ul style={{lineHeight: '1.6'}}>
                    <li>We will help you see your leadership strengths clearly.</li>
                    <li>We will help you identify practical areas to strengthen further.</li>
                </ul>
                <p style={{lineHeight: '1.6'}}>And we will stand beside you as you translate insight into action, and action into impact.</p>
                <p style={{lineHeight: '1.6'}}>Thank you for trusting us to be part of your leadership journey. We look forward to supporting you in building the kind of leadership that inspires teams, drives results, and creates lasting value.</p>
                <p style={{ marginTop: '50px', fontWeight: 'bold' }}>The Leadership Accelerator Team</p>
            </Page>

            <Page>
                <SectionTitle>The Power Quadrant&trade;</SectionTitle>
                <SectionIntro>The Power Quadrant&trade; represents the four distinct strengths that form the foundation of your unique leadership style. These traits are not just individual abilities - together, they create the force behind how you inspire, guide, and deliver impact in complex situations. These strengths have been identified through a meticulous analysis of your responses across the entire leadership assessment. By examining how you approached a wide range of scenarios - from strategic dilemmas to people challenges - and how consistently you applied sound judgment, emotional intelligence, and purposeful action, we&apos;ve been able to surface the traits that truly set you apart.</SectionIntro>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    {powerQuadrant?.filter(Boolean).map((item, index) => (
                        <div key={index} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}><h3>{item.name} - ({item.score}/10)</h3><p>{item.definition}</p></div>
                    ))}
                </div>
            </Page>
            
            <Page>
                <SectionTitle>The Breakthrough Zone&trade;</SectionTitle>
                <SectionIntro>The Breakthrough Zone&trade; highlights the four key areas where intentional development will help you elevate your leadership impact. These are not weaknesses to be ashamed of - they are the very traits that, once strengthened, have the power to unlock your next level of effectiveness, influence, and success as a leader. By working on these areas with intention - through reflection, practice, and coaching support - you have the opportunity to achieve meaningful breakthroughs that will not only enhance your leadership, but also strengthen the teams, projects, and organizations you serve.</SectionIntro>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    {breakthroughZone?.filter(Boolean).map((item, index) => (
                        <div key={index} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}><h3>{item.name} - ({item.score}/10)</h3><p>{item.definition}</p></div>
                    ))}
                </div>
            </Page>

            <Page>
                <SectionTitle>The Leadership Facets - Part A: Strategic & Cognitive</SectionTitle>
                <SectionIntro>The Strategic & Cognitive Facets of Leadership reflect how a leader thinks, analyses, and makes sense of complex situations. These facets shape how you see the bigger picture, balance short-term and long-term priorities, make decisions in uncertain environments, and anticipate risks or opportunities. They reveal your ability to connect the dots, focus on what truly matters, and guide your team or organization through complexity with clarity and purpose.</SectionIntro>
                {leadershipFacets?.strategicAndCognitive?.filter(Boolean).map((facet, index) => <FacetItem key={`A-${index}`} facet={facet} />)}
            </Page>

            <Page>
                <SectionTitle>The Leadership Facets - Part B: Interpersonal & Stakeholder</SectionTitle>
                <SectionIntro>The Interpersonal & Stakeholder Facets of Leadership reflect how a leader connects, influences, and builds relationships with others to create a culture of trust, inclusion, and collaboration. In today&apos;s interconnected, cross-functional, and global environment, these qualities are vital because leadership is no longer about authority alone it&apos;s about how effectively you inspire, empower, and unite people to achieve impact together.</SectionIntro>
                {leadershipFacets?.interpersonalAndStakeholder?.filter(Boolean).map((facet, index) => <FacetItem key={`B-${index}`} facet={facet} />)}
            </Page>

            <Page>
                <SectionTitle>The Leadership Facets - Part C: Personal Mastery & Values</SectionTitle>
                <SectionIntro>The Personal Mastery & Values Facets of Leadership reflect the inner strength, integrity, and self-awareness that guide how a leader shows up, sustains themselves, and sets an example for others. In today&apos;s high-stakes and high-visibility environment, these qualities are essential because true leadership is not just about external success it&apos;s about who you are when no one is watching, and how you inspire lasting trust and respect through your actions.</SectionIntro>
                {leadershipFacets?.personalMasteryAndValues?.filter(Boolean).map((facet, index) => <FacetItem key={`C-${index}`} facet={facet} />)}
            </Page>

            <Page>
                <SectionTitle>The Extended Leadership Facets</SectionTitle>
                <SectionIntro>This section provides a deeper, multi-dimensional view of your leadership approach. Each facet is broken down into four key sub-points, scored individually, and then benchmarked against an industry standard to give you a clearer picture of your relative strengths and growth opportunities.</SectionIntro>
                {extendedFacets?.filter(Boolean).map((facet, index) => (
                    <div key={index} style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '30px'}}>
                        <h3>{facet.title}</h3>
                        {/* This new layout stacks the charts vertically and gives them more space. */}
<div style={{ marginTop: '20px' }}>
    <div style={{ height: '400px', maxWidth: '500px', margin: '0 auto' }}>
        {facet.radarChartData && <LeadershipRadarChart id={`radar-${index}`} radarData={facet.radarChartData} />}
    </div>
    <div style={{ height: '120px', maxWidth: '500px', margin: '40px auto 0 auto' }}>
        {facet.averageScore && <ComparisonBarChart id={`bar-${index}`} score={facet.averageScore} industryStandard={facet.industryStandard} title="Average Score" />}
    </div>
</div>
                        {facet.subPointEvaluations?.filter(Boolean).map((sub, i) => (
                            <div key={i} style={{marginTop: '20px'}}>
                                <h4>{sub.name} (Score: {sub.score}/10)</h4>
                                <p style={{fontStyle: 'italic', fontSize: '0.9em', borderLeft: '3px solid #ccc', paddingLeft: '10px'}}>{sub.definition}</p>
                                <p>{sub.evaluation}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </Page>
            
             <Page>
                <SectionTitle>Your Leadership Depth Map&trade;</SectionTitle>
                <SectionIntro>At Leadership Accelerator, we believe that leadership isn&apos;t just a set of actions - it&apos;s a layered craft that reflects how you think, decide, relate, and endure. Each layer represents a critical dimension of what it takes to lead successfully in complex, high-stakes environments.</SectionIntro>
                {depthMap?.filter(Boolean).map((map, index) => (
                    <div key={index} style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px'}}>
                        <h3>{map.title}</h3>
                        <p style={{fontStyle: 'italic'}}>{map.definition}</p>
                        <div style={{height: '100px', margin: '20px 0'}}><ComparisonBarChart id={`depth-bar-${index}`} score={map.averageScore} industryStandard={map.industryStandard} title="Depth Score" /></div>
                        <h4>Key Inferences:</h4>
                        <ul style={{lineHeight: '1.6'}}>{map.inferences?.map((inf, i) => <li key={i}>{inf}</li>)}</ul>
                    </div>
                 ))}
            </Page>
        </div>
    );
});

AssessmentReport.displayName = 'AssessmentReport';
export default AssessmentReport;