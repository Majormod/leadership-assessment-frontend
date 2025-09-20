// components/MarketingReport.js new Edit PDF Location //

import React, { useState, useRef, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { toPng } from 'html-to-image';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useImageDataURI } from '../hooks/useImageDataURI'; // Adjust path if needed
import MarketingPDFDocument from './MarketingPDFDocument'; // <-- NEW IMPORT
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MarketingRadarChart from './MarketingRadarChart';
import TradeoffChart from './TradeoffChart';
import ScoreBarChart from './ScoreBarChart';
import ScoreRadialChart from './ScoreRadialChart';
import MarketingChordDiagram from './MarketingChordDiagram';
import BenchmarkBarChart from './BenchmarkBarChart';
import BenchmarkGaugeChart from './BenchmarkGaugeChart';
import DivergingBarChart from './DivergingBarChart';
import BulletChart from './BulletChart';
import RadialProgressChart from './RadialProgressChart';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';


// --- Centralized Theme ---
const theme = {
    colors: {
        primary: '#1D2951', // Deeper Navy
        accent: '#4A90E2',  // Brighter Blue
        accent2: '#F5A623', // Gold/Orange
        success: '#50E3C2', // Teal
        danger: '#D0021B',   // Red
        text: '#333333',
        lightText: '#555555',
        background: '#FFFFFF',
        lightBackground: '#F8F9FA',
        borderColor: '#DEE2E6',
    },
    fonts: { heading: "'Helvetica Neue', 'Arial', sans-serif", body: "'Helvetica Neue', Arial, sans-serif" },
};

// --- Helper Components ---

const cleanText = (text) => {
    if (!text) return '';
    return text.replace(/\[cite.*?\]/g, '');
};

const Page = ({ children, className = '' }) => (
    <div className={`report-page ${className}`} style={{
        pageBreakAfter: 'always',
        padding: '20mm 15mm 20mm 15mm', // A4 padding
        backgroundColor: theme.colors.background,
        minHeight: '297mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    }}>
        {children}
    </div>
);

const SectionTitle = ({ children }) => (
    <h2 style={{ fontFamily: theme.fonts.heading, fontSize: '2.2em', color: theme.colors.primary, borderBottom: `3px solid ${theme.colors.accent}`, paddingBottom: '10px', marginBottom: '25px' }}>{children}</h2>
);

const SectionIntro = ({ children }) => (
    <p style={{ fontFamily: theme.fonts.body, fontSize: '1.1em', color: theme.colors.lightText, lineHeight: '1.6', backgroundColor: theme.colors.lightBackground, padding: '20px', borderLeft: `4px solid ${theme.colors.accent}` }}>
        {children}
    </p>
);


const SubTitle = ({ children }) => ( <h4 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, marginTop: '25px', marginBottom: '10px' }}>{children}</h4> );

// --- NEW Helper for MCQ Cluster Analysis ---
const McqClusterAnalysis = ({ title, analysis, score, benchmarkScore }) => (
    <div>
        <ScoreBarChart score={score} benchmarkScore={benchmarkScore} />
        <div style={{ borderTop: `1px solid ${theme.colors.borderColor}`, paddingTop: '20px' }}>
            <h4 style={{fontFamily: theme.fonts.heading, color: theme.colors.primary}}>Diagnostic Analysis</h4>
            <p style={{lineHeight: 1.7}}>{analysis.overallInference}</p>
            {/* You can add strengths/improvements back here if desired */}
        </div>
    </div>
);

// In components/MarketingReport.js, use this complete object

const tradeoffLabels = {
    strategicJudgment: { 
        left: 'Performance Focus', 
        right: 'Brand Focus', 
        labels: { 
            1: 'Brand vs Perf.', 3: 'Penetration vs. Loyalty', 5: 'Distinct vs. Differentiate', 7: 'Standard vs. Local', 9: 'Innovation vs. Consistency'
        } 
    },
    brandCommAcumen: { 
        left: 'Strategic Control', 
        right: 'Creative Authenticity', 
        labels: { 
            11: 'Control vs. Authenticity', 13: 'Consistency vs. Customization', 15: 'Emotional vs. Rational', 17: 'Mass vs. Niche'
        } 
    },
    commercialAcumen: { 
        left: 'Profit Optimization', 
        right: 'Market Accessibility', 
        labels: { 
            19: 'Value vs. Affordability', 21: 'Premium vs. Mass-market', 23: 'Dynamic vs. Trust', 25: 'Promotion vs. Equity', 27: 'Cost vs. Investment'
        } 
    },
    leadershipTeamOrientation: { 
        left: 'Structure & Discipline', 
        right: 'Flexibility & Agility', 
        labels: { 
            29: 'Specialists vs. Generalists', 31: 'In-house vs. Outsource', 33: 'Speed vs. Craft', 35: 'Centralized vs. Decentralized', 37: 'Discipline vs. Freedom', 39: 'Retention vs. Renewal', 41: 'KPIs vs. Development', 43: 'Collaboration vs. Accountability', 45: 'Structure vs. Agility', 47: 'Recognition vs. Resilience'
        } 
    },
    resourceAllocationDiscipline: { 
        left: 'Efficiency & Proven Channels', 
        right: 'Effectiveness & Experimentation', 
        labels: { 
            49: 'Brand vs. Performance', 51: 'Acquisition vs. Retention', 53: 'Digital vs. Traditional', 55: 'Global vs. Local', 57: 'Proven vs. Experiment', 59: 'Paid vs. Owned/Earned', 61: 'Always-on vs. Burst', 63: 'Cost Cut vs. Brand Defense', 65: 'Incremental vs. Zero-Based', 67: 'Efficiency vs. Effectiveness'
        } 
    },
    commercialGrowthOrientation: { 
        left: 'Short-term Revenue', 
        right: 'Long-term Value', 
        labels: { 
            69: 'Activation vs. Brand Building', 71: 'Targets vs. CX', 73: 'Sales Enable vs. Market Dev', 75: 'Quarterly vs. Market Share', 77: 'Sales vs. Innovation', 79: 'Conversion vs. Trust'
        } 
    }
};

const reportStructureData = {
    strategicJudgment: {
        title: "Strategic Judgment",
        mainDescription: "Strategic Judgment measures a marketer’s ability to navigate foundational tensions that define modern marketing strategy. It reflects not only whether the professional knows the research-backed answer but also how consistently they balance competing imperatives across contexts. Strong strategic judgment ensures marketers avoid simplistic extremes, recognize when to prioritize long-term vs short-term outcomes, and adapt orientation to business stage, category maturity, and competitive intensity.",
        subTopicsTitle: "This dimension is assessed through five pairs of mirrored trade-offs",
        subTopics: [
            "Brand Building vs Performance Marketing: Long-term equity vs short-term measurable ROI.",
            "Penetration vs Loyalty: Expanding customer base vs deepening engagement.",
            "Differentiation vs Distinctiveness: Meaningful uniqueness vs easy recognition.",
            "Standardization vs Localization: Global coherence vs local resonance.",
            "Innovation vs Consistency: Novelty and disruption vs reliability and trust."
        ],
        judgedByTitle: "How It Is Judged",
        judgedByItems: [
            "Correctness (Knowledge Mastery): Alignment with empirical evidence and leading frameworks (e.g., Ehrenberg-Bass, Binet & Field).",
            "Orientation (Trade-off Vector): The direction of leaning (e.g., performance-heavy vs brand-heavy), revealing biases.",
            "Consistency (Psychometric Check): Whether responses across mirrored items are coherent or contradictory.",
            "Adaptability (Application Judgment): Ability to balance novelty, cultural nuance, and strategic rigor depending on context."
        ],
        mattersWhyTitle: "Why It Matters",
        mattersWhyText: "Strategic Judgment determines whether a marketer can earn credibility in senior conversations with CEOs, CFOs, and boards. Poor judgment manifests as over-investment in short-term campaigns, inconsistent global/local execution, or blind adherence to fads. Strong Strategic Judgment signals readiness for leadership, category stewardship, and influence beyond the marketing silo."
    },
    brandCommAcumen: {
        title: "Brand & Communication Acumen",
        mainDescription: "Brand & Communication Acumen measures a marketer’s ability to balance creative freedom with strategic control, narrative inspiration with rational proof, and broad awareness with precise targeting. It reveals whether professionals can orchestrate communication that is consistent, resonant, and adaptable across today’s fragmented media ecosystem.",
        subTopicsTitle: "This dimension is assessed through four pairs of mirrored trade-offs",
        subTopics: [
            "Control vs Authenticity: Guarding strict brand guidelines vs giving influencers/creators freedom to adapt.",
            "Message Consistency vs Channel Customization: One unified story vs tailoring per platform.",
            "Emotional Storytelling vs Rational Proof Points: Inspiring imagination vs proving superiority with evidence.",
            "Mass Awareness vs Niche Precision: Broad campaigns vs hyper-targeted engagement."
        ],
        judgedByTitle: "How It Is Judged",
        judgedByItems: [
            "Correctness (Knowledge Mastery): Answers benchmarked against best practice (e.g., IMC theory, Ehrenberg-Bass critiques, influencer marketing guidelines).",
            "Orientation (Trade-off Vector): Leaning toward brand control vs creator freedom, or emotional vs rational emphasis.",
            "Consistency (Psychometric Check): Detecting contradictions across mirrored items (e.g., favouring strict control in Q11 but freedom in Q12).",
            "Adaptability (Application Judgment): Whether they flex strategies for context (e.g., tailoring for TikTok without losing global brand equity)."
        ],
        mattersWhyTitle: "Why It Matters",
        mattersWhyText: "Communication is often where marketing credibility is won or lost inside organizations. Leaders who lean too far toward control risk losing cultural relevance; those too far toward authenticity risk eroding equity. Balancing consistency and customization is essential for campaigns to work globally yet resonate locally. Emotional storytelling drives distinctiveness, but rational proof points build trust - over-indexing on one is a liability. Mastery here signals readiness to manage agencies, creators, and cross-channel execution without diluting the brand."
    },
    commercialAcumen: {
        title: "Commercial Acumen",
        mainDescription: "Commercial Acumen measures a marketer’s ability to balance financial rigor with brand stewardship when making pricing and budget allocation decisions. It reveals whether professionals can optimize revenue without eroding equity, protect fairness while pursuing growth, and defend marketing investment as a strategic lever rather than treating it as a discretionary cost.",
        subTopicsTitle: "This dimension is assessed through five mirrored trade-off pairs",
        subTopics: [
            "Value-based Pricing vs Affordability: Capturing willingness to pay vs ensuring accessibility.",
            "Premiumization vs Mass-market Reach: Elevating symbolic value vs maximizing penetration.",
            "Dynamic Pricing vs Trust Preservation: Optimizing revenue vs maintaining fairness and loyalty.",
            "Price Promotions vs Equity Reinforcement: Driving traffic vs avoiding commoditization.",
            "Marketing Investment vs Cost Efficiency: Defending budgets as growth levers vs cutting spend under pressure."
        ],
        judgedByTitle: "How It Is Judged",
        judgedByItems: [
            "Correctness (Knowledge Mastery): Benchmarked against established financial and marketing principles (e.g., CLV-based pricing, Binet & Field on budget defense, fairness perception studies).",
            "Orientation (Trade-off Vector): Leaning toward affordability, premiumization, efficiency, etc., showing financial vs brand bias.",
            "Consistency (Psychometric Check): Whether mirrored pairs align (e.g., not endorsing premiumization in Q21 and then arguing affordability in Q20 as a universal principle).",
            "Adaptability (Application Judgment): Recognizing when to flex - premiumization in luxury, affordability in mass-market, budget defense in downturns."
        ],
        mattersWhyTitle: "Why It Matters",
        mattersWhyText: "Pricing and budgeting are where marketers face the sharpest scrutiny from CFOs and CEOs. Poor judgment can mean over-promoting into commoditization, damaging trust through erratic pricing, or failing to defend investment during downturns. Strong Commercial Acumen signals cross-functional credibility, resource stewardship, and readiness for P&L ownership."
    },
    leadershipTeamOrientation: {
        title: "Leadership & Team Orientation",
        mainDescription: "Leadership & Team Orientation measures a marketer’s ability to lead, structure, and motivate teams under competing pressures. It reveals whether the professional can balance specialization with flexibility, speed with craft, autonomy with discipline, and short-term delivery with long-term development. This dimension is not about “one right answer” but about showing consistency, adaptability, and judgment in managing human capital - the true leverage point of marketing leadership.",
        subTopicsTitle: "This dimension is assessed through ten mirrored trade-off pairs",
        subTopics: [
            "Specialists vs Generalists: Depth in narrow skills vs breadth across functions.",
            "In-house vs Outsourced Talent: Building internal capability vs leveraging external partners.",
            "Speed vs Craft: Rapid execution vs creative refinement.",
            "Centralized vs Decentralized Decision-Making: HQ control vs regional autonomy.",
            "Creative Freedom vs Strategic Discipline: Experimentation vs alignment to brand guidelines.",
            "Retention vs Renewal: Developing existing talent vs bringing in fresh skills.",
            "Short-term Targets vs Long-term Development: Delivering KPIs now vs investing in growth and innovation.",
            "Collaboration vs Accountability: Shared responsibility vs individual ownership.",
            "Structure vs Agility: Defined hierarchies vs fluid project-based models.",
            "Recognition vs Resilience: Celebrating wins vs building toughness."
        ],
        judgedByTitle: "How It Is Judged",
        judgedByItems: [
            "Orientation (Trade-off Vector): Which side of each trade-off the candidate leans toward, revealing leadership style.",
            "Consistency (Psychometric Check): Whether mirrored items align (e.g., not endorsing full decentralization in Q35 but strict centralization in Q36).",
            "Adaptability (Application Judgment): Ability to flex style based on context (e.g., agility in startups vs structure in multinationals).",
            "Developmental Balance: Whether they show a bias toward short-term pressure (e.g., speed, KPIs, recognition) or long-term sustainability (e.g., craft, growth, resilience)."
        ],
        mattersWhyTitle: "Why It Matters",
        mattersWhyText: "Marketing leaders are judged not just by campaigns but by the teams they build and sustain. Extreme bias (e.g., speed at all costs, or only valuing specialists) risks burnout, churn, or underperformance. Strong Leadership & Team Orientation signals readiness to inspire, retain, and scale teams that deliver marketing excellence."
    },
    resourceAllocationDiscipline: {
        title: "Resource Allocation Discipline",
        mainDescription: "Resource Allocation Discipline measures a marketer’s ability to make balanced, defensible, and context-sensitive budget decisions. It captures how professionals allocate finite resources across time horizons (short vs long-term), customer lifecycle stages (acquisition vs retention), media choices (traditional vs digital, paid vs owned/earned), and strategic approaches (experimentation vs proven channels). The dimension highlights whether the professional treats marketing as a cost to be minimized or as an investment to be strategically deployed.",
        subTopicsTitle: "This dimension is assessed through ten mirrored trade-off pairs",
        subTopics: [
            "Brand Investment vs Performance Spend: Equity building vs ROI campaigns.",
            "Acquisition vs Retention Spend: New customer growth vs deepening loyalty.",
            "Traditional Media vs Digital Channels: Mass reach vs precision targeting.",
            "Global Campaigns vs Local Adaptations: Scale vs nuance.",
            "Experimentation vs Proven Channels: Testing innovation vs relying on track record.",
            "Paid Media vs Owned/Earned Media: Buying reach vs compounding visibility.",
            "Always-on vs Burst Campaigns: Steady presence vs concentrated impact.",
            "Short-term Cost Cutting vs Long-term Brand Defense: Responding to pressure vs investing for share.",
            "Zero-Based vs Incremental Budgeting: Rebuilding from scratch vs adjustments year-on-year.",
            "Efficiency vs Effectiveness: Lowering unit costs vs protecting intangible brand gains."
        ],
        judgedByTitle: "How It Is Judged",
        judgedByItems: [
            "Correctness (Knowledge Mastery): Benchmarked against empirical findings (e.g., Binet & Field on ESOV, Ehrenberg-Bass on acquisition vs loyalty, case evidence on ZBB vs incremental).",
            "Orientation (Trade-off Vector): Which way the candidate leans (e.g., ROI-heavy vs brand-heavy; efficiency-first vs effectiveness-first).",
            "Consistency (Psychometric Check): Contradictions flagged across mirrored pairs (e.g., advocating brand investment in Q49 but cost-cutting in Q63).",
            "Adaptability (Application Judgment): Whether they flex budgets according to context (e.g., experimentation in growth markets, proven channels in downturns)."
        ],
        mattersWhyTitle: "Why It Matters",
        mattersWhyText: "Budget allocation is the single most visible signal of marketing leadership to boards and CFOs. Over-indexing on short-term spend, efficiency, or promotions undermines long-term equity. Failing to experiment or defend budgets risks stagnation. Strong Resource Allocation Discipline signals readiness for P&L influence and boardroom credibility."
    },
    commercialGrowthOrientation: {
        title: "Commercial Growth Orientation",
        mainDescription: "Commercial Growth Orientation measures a marketer’s ability to balance immediate sales pressure with broader drivers of sustainable growth. It captures whether professionals can prioritize short-term conversion without undermining brand, customer experience, innovation, or trust. The dimension distinguishes transactional thinking from strategic stewardship, highlighting whether a marketer can create both today’s revenue and tomorrow’s category leadership.",
        subTopicsTitle: "This dimension is assessed through six mirrored trade-off pairs:",
        subTopics: [
            "Sales Activation vs Brand Building: Conversions vs long-term mental availability.",
            "Revenue Targets vs Customer Experience: Quarterly numbers vs delightful journeys.",
            "Sales Enablement vs Market Development: Tools for today’s deals vs creating category demand.",
            "Quarterly Targets vs Long-term Market Share: Near-term benchmarks vs durable leadership.",
            "Sales Pressure vs Innovation Investment: Pipeline funding vs innovation pipelines.",
            "Conversion at All Costs vs Trust Preservation: Maximization vs authenticity and privacy."
        ],
        judgedByTitle: "How It Is Judged",
        judgedByItems: [
            "Correctness (Knowledge Mastery): Benchmarked against growth evidence (e.g., Binet & Field’s balance rule, case studies on CX and trust as revenue drivers).",
            "Orientation (Trade-off Vector): Leaning toward revenue pressure vs long-term sustainability, showing candidate’s commercial bias.",
            "Consistency (Psychometric Check): Contradictions flagged (e.g., prioritizing trust in Q79 but “conversion at all costs” in Q70).",
            "Adaptability (Application Judgment): Whether candidate flexes appropriately (e.g., short-term sales push in launches vs brand building in maturity)."
        ],
        mattersWhyTitle: "Why It Matters",
        mattersWhyText: "Commercial leaders must reconcile sales urgency with brand building, innovation, and CX. Over-indexing on short-term sales destroys trust, erodes differentiation, and risks category stagnation. Strong Commercial Growth Orientation signals readiness to lead at the revenue–brand interface and build credibility with both CFOs and CMOs."
    },
    foundationsOfStrategy: {
        title: "Foundations of Strategy",
        mainDescription: "This section explores your command of the core strategic frameworks that shape modern marketing leadership. While campaigns and execution drive visibility, it is strategic knowledge that ensures marketing contributes directly to business outcomes. The questions in this section tested your ability to move beyond surface familiarity and apply concepts in contexts where choices are complex, ambiguous, or even contradictory. The focus areas covered included consumer behaviour theories, segmentation and positioning approaches, Jobs to be Done versus persona thinking, competition handling, Blue Ocean versus differentiation strategies, the building of competitive moats, brand equity models, and customer lifetime value with unit economics. Together, these areas form the intellectual foundation that allows marketers to argue confidently in the boardroom, defend budgets with evidence, and align campaigns with long-term enterprise growth.",
        performanceContext: "Performance in this section is significant because it reveals whether a marketer can connect theory to practice in ways that withstand scrutiny. Strong results point to a professional who can combine brand vision with economic logic, influence stakeholders at senior levels, and advise leadership on growth pathways. Lower results often suggest a gap between campaign-level execution and enterprise-level strategy - a signal for targeted development."
    },
    brandAndCommunicationsKnowledge: {
        title: "Brand & Communications",
        mainDescription: "This section examines your understanding of the ideas, frameworks, and models that underpin effective brand-building and communication. While execution brings campaigns to life, it is conceptual depth and evidence-based knowledge that determine whether communication truly drives brand equity, market salience, and consumer trust. The questions tested your grasp across six critical areas: storytelling and brand myth-making, cultural branding and semiotics, advertising effectiveness models, the science of distinctive brand assets and mental availability, integrated marketing communications in a fragmented digital world, and the principles of crisis communication and trust repair. Together, these areas represent the intellectual backbone of modern brand management.",
        performanceContext: "Performance in this section reflects more than recall of theory - it reveals whether you can distinguish between outdated models and contemporary critiques, and whether you understand how communication connects to long-term business value. Strong results in this section are often linked with marketers who can brief agencies more effectively, evaluate creative work with rigor, and defend investment in brand building in boardroom conversations. Gaps here may indicate a need for deeper study of the frameworks that shape how marketing effectiveness is measured and sustained."
    },
    pricingAndChannelsKnowledge: {
        title: "Pricing & Channels",
        mainDescription: "This section examines your understanding of pricing models and distribution dynamics - two of the most decisive levers in marketing strategy. Pricing is not simply a financial decision; it communicates value, frames brand positioning, and directly influences profitability. Distribution, in turn, determines how access, availability, and customer experience shape market outcomes. The questions tested your ability to navigate four critical areas: value-based and dynamic pricing, premium and freemium models, the shifting balance of power between retail, D2C, and e-commerce platforms, and the distinctions between omnichannel and multichannel approaches. Together, these concepts reveal whether a marketer can think beyond campaigns and creativity, and engage with the commercial mechanics that determine sustainable growth.",
        performanceContext: "Performance in this section signifies how confidently you can link marketing choices to business outcomes. Strong results demonstrate fluency in aligning pricing with value creation, managing channel conflicts, and designing journeys that balance convenience with profitability. Weaker performance typically reflects gaps in financial literacy or an overly narrow focus on communication over commercial architecture."
    },
    paucityOfBudgetsKnowledge: {
        title: "Budget & Scarcity Management",
        mainDescription: "This section evaluates your ability to navigate one of the most complex and high-stakes areas of marketing: managing budgets under scarcity and pressure. The choices marketers make here shape not only revenue and visibility but also the power dynamics between brands, retailers, platforms, and consumers. It tests your applied judgment in making disciplined, persuasive, and forward-looking decisions about marketing budgets, particularly when attribution is contested, or when economic pressures create demands for cuts.",
        performanceContext: "Performance in this section is significant because it reveals whether you are equipped to argue for marketing investment at the highest levels of the organization. Strong results signal readiness to engage in executive-level conversations about budget defense, reallocation, and long-term growth priorities. Weaker results often suggest difficulty in applying financial evidence persuasively or in framing marketing spend as an investment rather than an expense."
    },
    digitalAndDataKnowledge: {
        title: "Digital & Data",
        mainDescription: "This section evaluates your ability to navigate the data-driven side of marketing, where performance pressures, automation tools, and measurement models increasingly shape decision-making. In modern practice, marketers are expected not only to execute digital tactics but also to judge their effectiveness, understand their limits, and integrate them with long-term brand-building. The questions in this cluster explored three critical areas: the tension between growth marketing and brand marketing, the gap between the promise and reality of automation and personalization, and the strengths and weaknesses of attribution models ranging from last-click to multi-touch and incrementality testing. Together, these areas assess whether you can balance short-term performance with strategic brand impact, deploy technology responsibly, and interpret data with the rigor needed to influence cross-functional stakeholders.",
        performanceContext: "Performance in this section is significant because it highlights whether your digital orientation is grounded in evidence, not hype. Strong results signal the ability to challenge assumptions, separate signal from noise, and guide organizations through the complexity of digital investment. Lower results typically indicate overreliance on tools without questioning their effectiveness, or difficulty in balancing growth demands with brand health."
    },
    globalAndCulturalKnowledge: {
        title: "Global & Cultural Dimensions",
        mainDescription: "This section evaluates your understanding of how culture, geography, and market maturity shape marketing strategy. In an interconnected world, brand growth rarely depends on a single market; instead, it requires the ability to balance global consistency with local nuance, and to adapt strategies to environments with very different consumer expectations and economic realities. The questions in this cluster focused on three key areas: balancing standardization with local adaptation in global branding, applying cultural dimensions (such as Hofstede’s frameworks) to decode cross-cultural consumer behaviour, and designing strategies suited to emerging markets where frugal innovation and leapfrogging often redefine competitive dynamics. Collectively, these areas test whether you can think beyond familiar contexts and adapt marketing to diverse cultural and economic landscapes.",
        performanceContext: "Performance in this section is significant because it reveals whether you are prepared to lead in global or culturally diverse organizations. Strong results suggest an ability to navigate complexity, avoid cultural missteps, and design strategies that are both globally coherent and locally resonant. Lower results may indicate a reliance on universalist assumptions or a lack of exposure to marketing outside mature Western markets."
    },
    futureAndThoughtLeadership: {
        title: "Future & Thought Leadership",
        mainDescription: "This section explores your ability to engage with emerging trends, future-facing strategies, and the evolving role of marketing in the broader business landscape. It moves beyond established frameworks to test how you think about disruption, innovation, and the long-term forces reshaping markets and consumer expectations. The questions in this cluster focused on three critical areas: the impact of artificial intelligence and automation on marketing roles and creativity, the growing importance of sustainability and ethical branding in consumer decision-making, and the evolving dynamics of platform power, influencer marketing, and attention economics. Together, these areas assess whether you are equipped not only to manage the present but also to anticipate and lead through change.",
        performanceContext: "Performance in this section is significant because it signals your readiness to contribute to forward-looking conversations about marketing’s role in the organization and society. Strong results suggest curiosity, adaptability, and the ability to think critically about trends that are reshaping the profession. Lower results may indicate a focus on near-term execution at the expense of future vision or discomfort with ambiguity and rapid change."
    },
    strategyAndPositioningApplication: {
        title: "Strategy & Positioning",
        mainDescription: "This section assesses your ability to apply strategic frameworks in realistic, ambiguous, and high-stakes situations. While knowledge of theory is essential, it is the application of that knowledge that determines whether a marketer can shape business outcomes. The questions in this cluster presented scenarios that required you to make choices about market entry, competitive response, brand architecture, and strategic repositioning. They tested your ability to balance short-term pressures with long-term vision, to align brand strategy with business objectives, and to navigate complex trade-offs involving risk, investment, and organizational alignment.",
        performanceContext: "Performance in this section is significant because it reveals your readiness to contribute to strategic decision-making at senior levels. Strong results demonstrate an ability to translate theory into actionable plans, influence cross-functional stakeholders, and steer brands through competitive and disruptive environments. Weaker performance may indicate difficulty in applying frameworks under pressure or a tendency to prioritize tactical execution over strategic coherence."
    },
    brandAndCommunicationApplication: {
        title: "Brand & Communication",
        mainDescription: "This section evaluates your ability to apply branding and communication principles in dynamic, real-world contexts. It moves beyond theoretical knowledge to test your judgment in situations where creative, cultural, and commercial considerations intersect. The scenarios in this cluster required you to make decisions about campaign development, creative evaluation, channel selection, and crisis response. They assessed your ability to balance consistency with adaptability, creativity with effectiveness, and brand safety with cultural relevance in an increasingly fragmented and scrutinized media environment.",
        performanceContext: "Performance in this section is significant because it reflects your capacity to lead communication efforts that build brand equity and drive business results. Strong results suggest an ability to guide creative development, manage reputational risk, and orchestrate integrated campaigns across channels. Gaps here may indicate challenges in translating brand strategy into effective execution or in navigating the complexities of modern media landscapes."
    },
    customerAndGrowthApplication: {
        title: "Customer & Growth",
        mainDescription: "This section tests your ability to apply customer-centric thinking and growth strategies to practical business challenges. It focuses on your capacity to leverage insights about consumer behavior, journey design, and value creation to drive sustainable expansion. The scenarios in this cluster required you to make decisions about customer acquisition, retention, experience design, and growth model selection. They assessed your ability to balance investment across the customer lifecycle, personalize interactions at scale, and align growth initiatives with profitability and brand building.",
        performanceContext: "Performance in this section is significant because it reveals your effectiveness in designing and implementing strategies that acquire and retain valuable customers. Strong results demonstrate a mastery of growth frameworks, an ability to leverage data for insight, and a capacity to balance short-term acquisition goals with long-term relationship building. Weaker performance may indicate an overreliance on tactical acquisition methods or difficulty in connecting customer initiatives to financial outcomes."
    },
    channelsAndDistributionApplication: {
        title: "Channels & Distribution",
        mainDescription: "This section assesses your ability to navigate the complex dynamics of channel strategy and distribution management in evolving retail and digital landscapes. It tests your capacity to make decisions that balance reach with control, efficiency with experience, and short-term sales with long-term channel health. The scenarios in this cluster required you to address challenges such as channel conflict, direct-to-consumer transitions, omnichannel integration, and partner relationship management. They evaluated your ability to align channel choices with brand positioning, customer expectations, and economic realities.",
        performanceContext: "Performance in this section is significant because it reflects your understanding of how route-to-market decisions impact brand perception, competitive advantage, and commercial performance. Strong results suggest an ability to design channel architectures that deliver seamless customer experiences while optimizing for growth and profitability. Gaps here may indicate a narrow focus on communication channels at the expense of sales and distribution strategy, or difficulty in managing the tensions between direct and indirect channels."
    },
    pricingAndMonetizationApplication: {
        title: "Pricing & Monetization",
        mainDescription: "This section evaluates your ability to apply pricing strategies and monetization models to maximize value capture and market positioning. It tests your judgment in situations where pricing decisions intersect with brand perception, competitive dynamics, and financial objectives. The scenarios in this cluster required you to make choices about value-based pricing, discounting strategies, subscription models, and pricing architecture across product portfolios. They assessed your ability to balance revenue optimization with customer fairness, short-term gains with long-term equity, and simplicity with segmentation.",
        performanceContext: "Performance in this section is significant because it reveals your capacity to use pricing as a strategic tool for growth and positioning. Strong results demonstrate an understanding of how pricing communicates value, influences profitability, and shapes market perceptions. Weaker performance may indicate a tendency to default to cost-plus or competitive pricing approaches, or difficulty in defending value-based pricing decisions to commercial stakeholders."
    },
    marketingBudgetsApplication: {
        title: "Marketing Budgets",
        mainDescription: "This section assesses your ability to make strategic decisions about marketing investment, allocation, and measurement, particularly under conditions of scarcity or pressure. It tests your capacity to defend marketing spend, justify allocation choices, and demonstrate return on investment across different time horizons and objectives. The scenarios in this cluster required you to navigate tensions between brand building and performance marketing, global consistency and local adaptation, proven channels and innovation testing. They evaluated your ability to balance efficiency with effectiveness, short-term results with long-term health, and financial accountability with strategic ambition.",
        performanceContext: "Performance in this section is significant because it reflects your readiness to engage in financial conversations and resource negotiations at executive levels. Strong results suggest an ability to articulate the business case for marketing investment, allocate resources for maximum impact, and measure returns in ways that balance financial and brand outcomes. Gaps here may indicate difficulty in translating marketing activities into financial terms or in resisting pressures to prioritize short-term cost cutting over long-term value creation."
    },
    executionAndPrioritizationDiscipline: {
        title: "Execution & Prioritization Discipline",
        mainDescription: "This section evaluates your ability to translate strategy into action through effective prioritization, project management, and performance measurement. It tests your capacity to make tough choices about what to do first, what to do well, and what to stop doing when resources are constrained and expectations are high. The scenarios in this cluster required you to balance speed with quality, innovation with scalability, and strategic priorities with operational realities. They assessed your ability to set clear objectives, allocate resources effectively, manage cross-functional teams, and adapt plans based on performance data and changing conditions.",
        performanceContext: "Performance in this section is significant because it reveals your effectiveness in delivering results through disciplined execution. Strong results demonstrate an ability to focus efforts on high-impact activities, maintain alignment between strategy and tactics, and create accountability for outcomes. Weaker performance may indicate challenges in managing complexity, maintaining focus amid competing demands, or connecting daily activities to broader strategic objectives."
    },
    selfAwarenessAndReflection: {
        title: "Self-Awareness & Reflection",
        mainDescription: "This section assesses your capacity for introspection, learning, and adaptation based on experience and feedback. It evaluates your ability to recognize your own strengths and development areas, understand how your actions impact others, and modify your approach to improve effectiveness. The scenarios in this cluster required you to reflect on past decisions, seek and incorporate feedback, and demonstrate openness to alternative perspectives. They tested your humility, curiosity, and commitment to continuous improvement as a marketing leader.",
        performanceContext: "Performance in this section is significant because it reveals your potential for long-term growth and development as a leader. Strong results suggest a growth mindset, emotional intelligence, and the ability to learn from both success and failure. Gaps here may indicate blind spots in self-perception, resistance to feedback, or a fixed mindset that could limit future development and leadership impact."
    },
    creativityAndNarrativePower: {
        title: "Creativity & Narrative Power",
        mainDescription: "This section evaluates your ability to generate compelling ideas, craft persuasive narratives, and inspire action through storytelling. It tests your capacity to connect emotionally with audiences, simplify complex concepts, and create memorable messages that drive brand distinction and engagement. The scenarios in this cluster required you to develop creative concepts, refine messaging, and adapt stories for different audiences and channels. They assessed your originality, strategic storytelling ability, and skill in balancing creativity with commercial objectives.",
        performanceContext: "Performance in this section is significant because it reflects your capacity to create marketing that captures attention, builds emotional connections, and drives brand preference. Strong results suggest an ability to think differently, communicate persuasively, and elevate marketing from functional communication to inspirational engagement. Weaker performance may indicate a tendency to default to rational messaging, difficulty in translating strategy into creative expression, or challenges in crafting stories that resonate across diverse audiences."
    },
    analyticsKnowledge: {
        title: "Analytics",
        mainDescription: "This section examines your understanding of marketing analytics, measurement frameworks, and data interpretation techniques. It evaluates your ability to select appropriate metrics, design measurement systems, and derive actionable insights from marketing data. The questions tested your knowledge across key areas: attribution modeling and its limitations, brand vs performance measurement平衡, testing methodologies (e.g., A/B, MMM, incrementality), and the interpretation of key metrics such as CAC, LTV, and ROMI. This knowledge forms the foundation for evidence-based decision-making and marketing accountability.",
        performanceContext: "Performance in this section is significant because it reveals your ability to use data to guide strategy, optimize execution, and demonstrate marketing&apos;s impact on business outcomes. Strong results suggest fluency in connecting marketing activities to financial results, designing rigorous tests, and challenging flawed measurement practices. Gaps may indicate overreliance on vanity metrics, difficulty in communicating marketing&apos;s value in financial terms, or susceptibility to misleading attribution claims."
    }
};

// --- Main Report Component ---
const MarketingReport = ({ report }) => {
    // --- This is the complete and correct set of hooks ---
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const chartRefs = useRef({});
    const logoDataURI = useImageDataURI('/logo.png');

    useEffect(() => {
        setIsClient(true);
    }, []);


        // NEW FUNCTION to handle the entire PDF generation process
    // REPLACE the entire handleDownloadPdf function with this
const handleDownloadPdf = async () => {
    setIsGenerating(true);

    try {
        // Step 1: Generate chart images (same as before)
        const imagePromises = Object.entries(chartRefs.current).map(async ([key, node]) => {
    if (node) {
        try {
            const dataUrl = await toPng(node, {
                // ... your options
            });
            return [key, dataUrl];
        } catch (error) {
            console.error(`Could not generate image for chart: ${key}`, error);
            // This catch block might be missing a return statement
        }
    }
    return [key, null];
});
        const settledImages = await Promise.all(imagePromises);
        const chartImages = Object.fromEntries(settledImages.filter(entry => entry[1] !== null));

        // Step 2: Generate the core report PDF in memory
        const coreReportBlob = await pdf(
            <MarketingPDFDocument 
                report={{
                    ...report,
                    reportStructureData,
                    executiveSummaryDescriptions
                }} 
                logoDataURI={logoDataURI}
                chartImages={chartImages}
            />
        ).toBlob();
        const coreReportBuffer = await coreReportBlob.arrayBuffer();

        // Step 3: Fetch your cover PDFs
        const [frontCoverBuffer, backCoverBuffer] = await Promise.all([
            fetch('/pdf/Front-Cover.pdf').then(res => res.arrayBuffer()),
            fetch('/pdf/Back-Cover.pdf').then(res => res.arrayBuffer())
        ]);

        // Step 4: Create a new PDF and load all source PDFs
        const finalPdfDoc = await PDFDocument.create();
        const coreReportDoc = await PDFDocument.load(coreReportBuffer);
        const frontCoverDoc = await PDFDocument.load(frontCoverBuffer);
        const backCoverDoc = await PDFDocument.load(backCoverBuffer);

        // Step 5: Copy pages from all sources into the final document
        const [frontPage] = await finalPdfDoc.copyPages(frontCoverDoc, [0]);
        finalPdfDoc.addPage(frontPage);

        const corePages = await finalPdfDoc.copyPages(coreReportDoc, coreReportDoc.getPageIndices());
        corePages.forEach(page => finalPdfDoc.addPage(page));

        const [backPage] = await finalPdfDoc.copyPages(backCoverDoc, [0]);
        finalPdfDoc.addPage(backPage);

        // Step 6: "Stamp" the personalized text onto the new front page
        const { width, height } = frontPage.getSize();
        const font = await finalPdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await finalPdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        const name = report.userInfo?.name || 'Valued Professional';
        const nameWidth = boldFont.widthOfTextAtSize(name, 20);

        // REPLACE WITH THIS BLOCK
frontPage.drawText('Personalized Report For:', {
    x: (width - font.widthOfTextAtSize('Personalized Report For:', 12)) / 2,
    y: height * 0.25, // MOVED: From 50% down to the 25% mark
    size: 12,
    font: font,
    color: rgb(1, 1, 1), // CHANGED: To white
});

frontPage.drawText(name, {
    x: (width - nameWidth) / 2,
    y: (height * 0.25) - 25, // MOVED: Relative to the new position
    size: 20,
    font: boldFont,
    color: rgb(1, 1, 1), // CHANGED: To white
});

        // Step 7: Save and download the final, merged PDF
        const finalPdfBytes = await finalPdfDoc.save();
        const finalPdfBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });
        saveAs(finalPdfBlob, "Marketing-Influence-Quotient-Report.pdf");

    } catch (error) {
        console.error("Failed to generate PDF:", error);
    } finally {
        setIsGenerating(false);
    }
};

    if (!report) {
        return <Page><h2>Generating Your Report...</h2></Page>;
    }

    const { userInfo, scoredResults, executiveSummary, detailedAnalysis } = report;

    // --- ADD THIS NEW BLOCK TO PREPARE THE CHART DATA ---
    const chartData = scoredResults?.dimensionScores ? 
        Object.keys(scoredResults.dimensionScores).map(key => {
            let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            // Split long labels into an array of strings for multi-line display
            if (label.length > 25) {
                const words = label.split(' ');
                const midpoint = Math.ceil(words.length / 2);
                label = [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
            }
            return {
                dimension: label,
                score: parseFloat(scoredResults.dimensionScores[key].toFixed(1))
            };
        }) 
        : [];
    // --------------------------------------------------------


    // In components/MarketingReport.js, add this before the return statement

const sectionDescriptions = {
    strategicJudgment: "Strategic Judgment measures a marketer&apos;s ability to navigate foundational tensions that define modern marketing strategy. It reflects how consistently they balance competing imperatives, prioritize long-term vs. short-term outcomes, and adapt to business stage, category maturity, and competitive intensity.",
    brandCommAcumen: "Brand & Communication Acumen measures a marketer&apos;s ability to balance creative freedom with strategic control, narrative inspiration with rational proof, and broad awareness with precise targeting across today&apos;s fragmented media ecosystem.",
    commercialAcumen: "Commercial Acumen measures a marketer&apos;s ability to balance financial rigor with brand stewardship when making pricing and budget allocation decisions, signaling cross-functional credibility and readiness for P&L ownership.",
    leadershipTeamOrientation: "Leadership & Team Orientation measures a marketer’s ability to lead, structure, and motivate teams. It reveals whether the professional can balance specialization with flexibility, speed with craft, and short-term delivery with long-term development.",
    resourceAllocationDiscipline: "Resource Allocation Discipline measures a marketer’s ability to make balanced, defensible, and context-sensitive budget decisions, treating marketing as a strategic investment to be deployed rather than a cost to be minimized.",
    commercialGrowthOrientation: "Commercial Growth Orientation measures a marketer’s ability to balance immediate sales pressure with broader drivers of sustainable growth, distinguishing transactional thinking from strategic stewardship.",
    foundationsOfStrategy: "This section explores your command of the core strategic frameworks that shape modern marketing leadership, from consumer behaviour and STP to competitive moats and unit economics.",
    brandAndCommunicationsKnowledge: "This section examines your understanding of the ideas and models that underpin effective brand-building, from storytelling and cultural branding to advertising effectiveness and crisis communication.",
    pricingAndChannelsKnowledge: "This section examines your understanding of pricing models and distribution dynamics—two of the most decisive levers in marketing that link marketing choices directly to commercial outcomes.",
    paucityOfBudgetsKnowledge: "This section assesses your ability to make effective strategic decisions under conditions of budget scarcity, a critical skill in retail marketing and channel selection.",
    digitalAndDataKnowledge: "This section evaluates your ability to navigate the data-driven side of marketing, balancing short-term performance with strategic brand impact and interpreting data with rigor.",
    globalAndCulturalKnowledge: "This section evaluates your understanding of how culture, geography, and market maturity shape marketing strategy in an interconnected world.",
    futureAndThoughtLeadership: "This section evaluates your awareness of the shifts shaping the future of marketing, with a specific focus on the rise of influencer and creator-driven ecosystems.",
    strategyAndPositioningApplication: "This section assesses how well you translate strategic marketing frameworks into applied choices that create competitive advantage in crowded and dynamic markets.",
    brandAndCommunicationApplication: "This section evaluates your ability to apply communication frameworks in real-world, high-stakes contexts where brand credibility can be won or lost.",
    customerAndGrowthApplication: "This section evaluates your ability to design strategies that sustain customer relationships and drive long-term growth through retention and brand-aligned loyalty.",
    channelsAndDistributionApplication: "This section evaluates your ability to navigate the complex power dynamics between brands, retailers, platforms, and consumers to build brand salience.",
    pricingAndMonetizationApplication: "This section evaluates your ability to design and defend pricing strategies that balance profitability, brand positioning, and customer trust.",
    marketingBudgetsApplication: "This section evaluates your ability to make disciplined, persuasive, and forward-looking decisions about marketing budgets, especially under pressure.",
    executionAndPrioritizationDiscipline: "This section evaluates your ability to prioritize effectively and execute with discipline—two capabilities that determine whether strong ideas translate into measurable business outcomes.",
    selfAwarenessAndReflection: "This section evaluates your ability to reflect honestly on setbacks, learn from experience, and demonstrate humility—key predictors of long-term leadership growth.",
    creativityAndNarrativePower: "This section evaluates your ability to demonstrate creativity and harness the power of narrative to create the emotional resonance that drives brand distinctiveness.",
    analyticsKnowledge: "This section evaluates your mastery of the financial and analytical foundations that underpin marketing&apos;s credibility at the leadership table."
};

// Dynamically and safely get the capability names from the data we have.
const capabilityLabels = scoredResults?.coreCapabilityScores ? Object.keys(scoredResults.coreCapabilityScores) : [];

// Data for the Key Findings Chart (BenchmarkBarChart)
const coreCapabilityChartData = capabilityLabels.map(key => ({
    name: key,
    ...scoredResults.coreCapabilityScores[key]
}));

// Data for the Chord Diagram
const chordData = {
    matrix: scoredResults?.chordMatrix,
    labels: capabilityLabels,
    colors: [theme.colors.primary, theme.colors.accent, theme.colors.success, theme.colors.accent2, theme.colors.danger]
};

const dimensionBenchmarks = {
    foundationsOfStrategy: { avg: 68, top: 90 },
    brandAndCommunicationsKnowledge: { avg: 70, top: 92 },
    pricingAndChannelsKnowledge: { avg: 65, top: 88 },
    paucityOfBudgetsKnowledge: { avg: 60, top: 85 },
    digitalAndDataKnowledge: { avg: 72, top: 94 },
    globalAndCulturalKnowledge: { avg: 58, top: 82 },
    futureAndThoughtLeadership: { avg: 65, top: 90 },
    strategyAndPositioningApplication: { avg: 70, top: 91 },
    brandAndCommunicationApplication: { avg: 68, top: 89 },
    customerAndGrowthApplication: { avg: 71, top: 93 },
    channelsAndDistributionApplication: { avg: 66, top: 87 },
    pricingAndMonetizationApplication: { avg: 69, top: 91 },
    marketingBudgetsApplication: { avg: 73, top: 95 },
    executionAndPrioritizationDiscipline: { avg: 75, top: 96 },
    selfAwarenessAndReflection: { avg: 70, top: 90 },
    creativityAndNarrativePower: { avg: 65, top: 88 },
    analyticsKnowledge: { avg: 78, top: 98 },
    default: { avg: 65, top: 88 }
};

const executiveSummaryDescriptions = {
    prompt1Result: { title: "Composite Score", description: "A single index that reflects the participant&apos;s overall marketing influence capability, benchmarked against peer groups and industry norms. It integrates knowledge mastery, applied judgment, decision-making agility, creativity, numerical rigor, and leadership orientation into one coherent measure." },
    prompt2Result: { title: "Top Three Strengths", description: "The capabilities where the participant demonstrates consistent excellence. These strengths are derived from correct responses, psychometric alignment, and trade-off clarity, and represent the foundation upon which further influence and leadership can be built." },
    prompt3Result: { title: "Top Three Development Priorities", description: "The areas where improvement will generate the greatest career impact. These priorities are identified not only through incorrect answers but also through patterns of contradiction, inconsistency, or risk blind spots that may limit effectiveness in senior marketing roles." },
    prompt4Result: { title: "Immediate Attention Flags", description: "Critical findings that require urgent focus. These may include severe numeric misjudgments, ethical risk exposures, or high inconsistency scores that could undermine credibility with stakeholders or leadership teams if left unaddressed." },
    prompt5Result: { title: "Recommended Next Step", description: "A clear, practical call to action - whether a targeted video course, a School of Leadership pathway, a masterclass, or one-to-one coaching. This ensures the assessment transitions seamlessly into a personalized learning journey, turning diagnosis into measurable progress." },
    prompt6Result: { title: "Career Impact Statement", description: "The career impact statement distils the results of the Marketing Influence Quotient™ into a single forward-looking line, designed to connect diagnostic insight with real-world professional outcomes..." }
};

return (
    <div style={{ fontFamily: theme.fonts.body, color: theme.colors.text, maxWidth: '900px', margin: '0 auto', backgroundColor: '#e9ecef' }}>
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'white', borderBottom: '1px solid #dee2e6' }}>
            {/* --- REPLACE THE OLD BUTTON WITH THIS --- */}
                {/* --- Find and replace the download button's container div with this --- */}
<div style={{
    padding: '20px',
    backgroundColor: 'white',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
}}>
    <p style={{ margin: 0, fontSize: '1.1em' }}>Your personalized report is ready.</p>
    
    {/* This will only render on the client, preventing the page load freeze */}
    {isClient && (
        <button
    onClick={handleDownloadPdf}
    disabled={!isClient || isGenerating}
    style={{
        padding: '12px 25px',
        fontSize: '1.1em',
        cursor: 'pointer',
        backgroundColor: theme.colors.accent,
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        opacity: (!isClient || isGenerating) ? 0.5 : 1
    }}
>
    {isGenerating ? 'Generating PDF...' : 'Download Report as PDF'}
</button>
    )}
</div>
        </div>

        <div>
            {/* Page 1: Cover Page */}
            <Page className="cover-page">
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Image src="/logo.png" alt="Leadership Accelerator Logo" width={240} height={96} />
                    <h1 style={{ fontFamily: theme.fonts.heading, fontSize: '3em', color: theme.colors.primary, marginTop: '40px', marginBottom: '10px' }}>The Marketing Influence Quotient™</h1>
                    <p style={{ fontSize: '1.5em', color: theme.colors.accent }}>Accelerating Success</p>
                    <p style={{ fontSize: '1.2em', color: theme.colors.text, marginTop: '80px' }}>Personalized Report For:</p>
                    <p style={{ fontSize: '1.8em', fontFamily: theme.fonts.heading, color: theme.colors.primary }}>{report.userInfo?.name || 'Valued Professional'}</p>
                </div>
            </Page>

            {/* Page 2 & 3: About Pages */}
            <Page>
                <SectionTitle>The Leadership Accelerator</SectionTitle>
                <p style={{ lineHeight: 1.7 }}>Leadership Accelerator is a global platform committed to redefining professional excellence in the age of disruption. We empower leaders and innovators to sharpen their judgment, expand their influence, and accelerate their growth through cutting-edge learning experiences rooted in research and real-world application.</p>
                <p style={{ lineHeight: 1.7 }}>Our mission is not just to train professionals but to transform them into decision-makers who thrive in complexity, lead with clarity, and shape markets with confidence.</p>
                <p style={{ lineHeight: 1.7 }}>By combining rigorous assessments, advanced learning design, and actionable insights, we are building the next generation of leaders who will change the way the world does business.</p>
                <p style={{ lineHeight: 1.7, marginTop: '20px' }}>At The Leadership Accelerator, everything begins with assessments.</p>
                <p style={{ lineHeight: 1.7 }}>We believe that transformation starts with clarity - knowing where you stand, what your strengths are, and where blind spots hold you back.</p>
                <p style={{ lineHeight: 1.7 }}>Our world-class diagnostic tools, like The Marketing Influence Quotient™, go beyond surface knowledge to reveal how you think, decide, and lead. These insights form the foundation of every journey we design.</p>
                <p style={{ lineHeight: 1.7 }}>From assessment, we move to action. Our next step is a portfolio of video-based learning programs, organized into ten specialized Schools of Leadership covering strategy, marketing, influence, decision-making, innovation, and more. Each school is crafted with global best practices, equipping professionals not just with skills but with the ability to apply them under real-world complexity.</p>
                <p style={{ lineHeight: 1.7 }}>We then extend learning through books that distil frameworks into stories, Masterclasses that create immersion, and 1-on-1 personal coaching that delivers bespoke guidance for high-stakes leaders.</p>
                <p style={{ lineHeight: 1.7 }}>Together, these offerings form an integrated ecosystem that supports leaders at every stage of their growth journey - from ambitious professionals accelerating their rise to senior executives redefining industries.</p>
                <p style={{ lineHeight: 1.7 }}>Our motto, “Accelerating Success,” is not a promise of speed alone, but of precision and direction. We exist to shorten the gap between potential and performance, between knowledge and influence, between ambition and achievement. By blending rigorous diagnostics with transformative learning and personalized mentorship, The Leadership Accelerator is changing the way professionals prepare for impact.</p>
                <p style={{ lineHeight: 1.7 }}>We are not here to create more managers; we are here to build leaders who thrive in ambiguity, inspire confidence, and shape markets. </p>
                <p style={{ lineHeight: 1.7 }}>This is how we accelerate success - for individuals, for organizations, and for the future of leadership itself.</p>
            </Page>
            <Page>
                <SectionTitle>The Marketing Influence Quotient™</SectionTitle>
                <p style={{ lineHeight: 1.7 }}>The Marketing Influence Quotient™ (MIQ™) is the world’s most advanced diagnostic assessment for marketing professionals - a groundbreaking tool designed to measure not only what you know, but also how you think, decide, and lead. In an era where marketing demands extend far beyond technical skills, MIQ™ evaluates the multidimensional capability of a professional: strategic judgment, commercial acumen, leadership orientation, creativity, and numerical rigor.</p>
                <p style={{ lineHeight: 1.7 }}>Unlike conventional tests that reward surface-level memorization or textbook recall, MIQ™ is built to simulate the real tensions of marketing leadership. Each question is carefully engineered to force trade-offs, test adaptability under ambiguity, and reveal how individuals respond to the competing demands of short-term performance versus long-term brand equity, efficiency versus effectiveness, global alignment versus local nuance, and creativity versus discipline. This design ensures that results reflect how professionals will perform not in theory, but under the same high-pressure conditions they face in their careers.</p>
                <p style={{ lineHeight: 1.7 }}>What makes MIQ™ distinctive is its dual promise - it is both a diagnostic and a developmental engine. Every response is mapped into a detailed analytics framework that highlights strengths, exposes blind spots, and identifies patterns of contradiction or inconsistency. Yet, the assessment doesn’t stop at diagnosis. It directly connects outcomes to personalized learning pathways - including advanced video courses, targeted masterclasses, curated readings, and one-on-one coaching opportunities through The Leadership Accelerator.</p>
                <p style={{ lineHeight: 1.7 }}>Respected by executives and admired across industries, MIQ™ has become a benchmark of credibility and influence. It signals to employers, boards, and peers that a professional possesses not only technical mastery but also the rare ability to balance competing priorities with clarity, conviction, and creativity. For ambitious marketers, MIQ™ is more than an assessment - it is a career catalyst, designed to accelerate growth, strengthen leadership influence, and position you for lasting impact in the global marketplace.</p>
            </Page>

            {/* Page 4: Assessment Details - FIXED */}
             <Page>
                <SectionTitle>Assessment Details</SectionTitle>
                <SubTitle>Purpose & Scope</SubTitle>
                <p style={{lineHeight: 1.7}}>
                    {`The Marketing Influence Quotient™ (MIQ) is designed to measure not only what professionals know about marketing but how they think, decide, and influence outcomes in complex business environments. Its purpose is to provide a holistic, evidence-based view of marketing capability - one that goes beyond surface knowledge to uncover strengths, blind spots, and developmental opportunities that directly impact career progression and organizational performance.`}
                </p>
                <p style={{lineHeight: 1.7}}>
                    {`The assessment is structured as a multi-module experience, balancing both conceptual and applied challenges. Participants complete a mix of Knowledge questions (theory and frameworks), Application exercises (real-world scenarios and trade-offs), Psychometric items (mirrored trade-offs and consistency checks), Creativity tasks (narrative and communication choices), Decision-Making dilemmas (ambiguous stakeholder challenges), Reflection items (self-awareness and adaptability), and Numeric rigor tests (CLV, ROI, ROMI, and other financial measures). Together, these modules ensure the MIQ captures both breadth and depth of marketing influence.`}
                </p>
                <p style={{lineHeight: 1.7}}>
                    {`Results are delivered through a dual-mode feedback logic. For correct responses, the system provides diagnostic insight into what the choice reveals about the participant’s strengths and orientations. For incorrect responses, the system offers remediation guidance - explaining the conceptual gap and linking directly to targeted learning resources. This approach ensures that the assessment functions not as a pass/fail exam but as a springboard for development, seamlessly connecting diagnostics with personalized growth pathways.`}
                </p>
                <SubTitle>Methodology & Psychometrics</SubTitle>
                <p style={{lineHeight: 1.7}}>
                    {`The Marketing Influence Quotient™ has been developed through a rigorous multi-stage design process that combines marketing expertise, behavioural science, and psychometric best practice. Each item has been crafted to move beyond surface-level recall, with long- form multiple-choice questions that test conceptual depth, scenario-based applications that replicate real-world dilemmas, and mirrored trade-off statements that reveal underlying orientations and consistency of thought. Forced-choice tasks and allocation exercises are incorporated to simulate the ambiguity and prioritization pressures faced by senior marketers.`}
                </p>
                 <p style={{lineHeight: 1.7}}>
                    {`Reliability and validity have been central to test construction. Internal consistency is evaluated through measures such as Cronbach’s alpha and inter-item correlation checks across modules.`}
                </p>
                 <p style={{lineHeight: 1.7}}>
                    {`Pilot studies and item response analyses ensure that questions discriminate effectively between levels of proficiency while avoiding cultural or industry bias. Norms are continually updated through benchmarking against diverse peer groups and seniority cohorts, strengthening the robustness of comparative insights.`}
                </p>
                 <p style={{lineHeight: 1.7}}>
                    {`To mitigate the risk of “perfect-answer” bias - where participants attempt to present themselves as ideal rather than authentic - the MIQ integrates mirrored items, contradiction detection, and forced trade-offs. These mechanisms surface inconsistencies, reveal hidden biases, and highlight areas where stated preferences diverge from demonstrated choices. As a result, the MIQ not only measures capability but also captures orientation, adaptability, and credibility under pressure - dimensions that matter most for leadership in marketing.`}
                </p>
            </Page>

            {/* Page 5: Scoring & Proprietary Analytics - FIXED */}
            <Page>
                <SectionTitle>Scoring & Proprietary Analytics</SectionTitle>
                <SubTitle>Scoring & Benchmarking Framework</SubTitle>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`The Marketing Influence QuotientTM (MIQ) is scored through a structured, multi-layered framework designed to capture both capability and orientation. Results are first broken down into dimension scores - covering areas such as knowledge mastery, application judgment, decision-making agility, creativity, numerical rigor, and leadership orientation. These dimension-level results are then aggregated into a composite MIQ score, which provides a single index of overall marketing influence capability.`)}
                </p>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`Scoring follows a dual-mode logic. For correct responses, feedback emphasizes diagnostic interpretation - what the choice reveals about strengths and orientations. For incorrect responses, the system provides remediation guidance, identifying conceptual gaps and linking to targeted learning paths. Alongside this, a Contradiction Index tracks consistency across mirrored items and forced-choice trade-offs, surfacing areas where responses suggest impression management or hidden biases. Confidence intervals are applied to reflect the statistical reliability of each score, ensuring findings are interpreted with appropriate nuance.`)}
                </p>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`Benchmarking gives the MIQ its comparative power. Individual results are expressed as both raw scores and percentile rankings, situating the participant against relevant peer groups. Norms are drawn from multiple cohorts - including role-level cohorts (e.g., mid-level marketer, senior CMO), industry-level cohorts (e.g., FMCG, technology, financial services), and age-level cohorts (e.g., early-career, mid-career, senior professionals). This ensures that results are contextualized, highlighting not just how a candidate performs in absolute terms, but how their influence capability compares to peers they are most likely to compete with in the marketplace.`)}
                </p>
                <SectionTitle>Proprietary Analytics</SectionTitle>
                <SubTitle>What We Measure</SubTitle>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`The Marketing Influence Quotient™ goes beyond correct and incorrect answers to generate a suite of proprietary indices that together form a multidimensional picture of marketing capability. Each index captures a distinct aspect of influence, enabling both granular diagnostics and integrated leadership insights.`)}
                </p>
                <ul style={{ lineHeight: 1.8, paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li><strong>Knowledge Mastery:</strong> {cleanText(`Assesses depth of understanding across marketing theories, frameworks, and principles, with emphasis on nuanced distinctions rather than surface-level recall.`)}</li>
                    <li><strong>Application Judgment:</strong> {cleanText(`Evaluates the ability to apply concepts under real-world complexity, balancing strategic frameworks with situational pragmatism.`)}</li>
                    <li><strong>Psychometric Consistency Index:</strong> {cleanText(`Detects alignment or contradiction across mirrored trade-off items, surfacing whether choices reflect coherent orientations or impression management.`)}</li>
                    <li><strong>Trade-off Orientation Vector:</strong> {cleanText(`Maps where a candidate consistently positions themselves across strategic tensions (e.g., brand vs performance, global vs local), revealing directional biases.`)}</li>
                    <li><strong>Decision-Making Agility:</strong> {cleanText(`Measures speed, adaptability, and prioritization in forced-choice scenarios, reflecting capability under time and stakeholder pressure.`)}</li>
                    <li><strong>Creativity Index:</strong> {cleanText(`Captures originality, narrative sophistication, and effectiveness in communication-based exercises, indicating power to shape brand meaning.`)}</li>
                    <li><strong>Execution Discipline Index:</strong> {cleanText(`Gauges rigor in adhering to timelines, budgets, and deliverables, testing whether candidates can translate strategy into reliable operational results.`)}</li>
                    <li><strong>Numerical Rigor Score:</strong> {cleanText(`Assesses accuracy and confidence with financial calculations (e.g., CLV, ROI, CAC), identifying commercial fluency critical for cross-functional credibility.`)}</li>
                    <li><strong>Ethics & Trust Index:</strong> {cleanText(`Evaluates responses to dilemmas involving transparency, fairness, and stakeholder responsibility, highlighting orientation toward long-term trust over short-term gain.`)}</li>
                    <li><strong>Leadership Orientation:</strong> {cleanText(`Analyzes trade-offs in managing teams, talent, and influence, surfacing readiness for senior marketing leadership roles.`)}</li>
                </ul>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`Underlying these indices is a robust analytic framework. Responses are analyzed through pattern detection to reveal consistency, item response weighting to reflect difficulty levels, and advanced methods such as regression and cluster analysis to identify typologies of marketers. This ensures that the MIQTM captures not only what participants know and decide, but also how they think, where they lean, and what kind of leader they are likely to become.`)}
                </p>
            </Page>

            {/* Page 6: Executive Summary */}
            <Page>
                <SectionTitle>Executive Summary</SectionTitle>
                <h3 style={{ textAlign: 'center', fontFamily: theme.fonts.heading, color: theme.colors.primary, marginBottom: '30px' }}>The Marketing Influence Quotient™</h3>
                {executiveSummary && Object.keys(executiveSummaryDescriptions).map(key => (
                    <div key={key} style={{ marginBottom: '25px' }}>
                        <SubTitle>{executiveSummaryDescriptions[key].title}</SubTitle>
                        <p style={{ fontStyle: 'italic', color: theme.colors.lightText, marginTop: '-5px', marginBottom: '10px' }}>{executiveSummaryDescriptions[key].description}</p>
                        <div style={{ padding: '15px', border: `1px solid ${theme.colors.borderColor}`, borderRadius: '4px', background: theme.colors.lightBackground, whiteSpace: 'pre-wrap' }}>
                            {executiveSummary[key]}
                        </div>
                    </div>
                ))}
            </Page>

            {/* Page 7: Key Findings at a Glance */}
            <Page>
                <SectionTitle>Key Findings at a Glance</SectionTitle>
                <SectionIntro>This section provides a visual summary of the participant’s performance across The Marketing Influence Quotient™ framework. The composite score is expressed both as a percentage and as a percentile rank, allowing direct comparison against peer groups and industry benchmarks.</SectionIntro>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`Alongside this, a radar chart presents results across ten core dimensions - from knowledge mastery and applied judgment to decision-making agility, creativity, numerical rigor, and leadership orientation - offering an integrated view of the participant’s capability profile.`)}
                </p>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`To aid interpretation, quick callouts highlight areas of relative strength (green), areas requiring sustained development (yellow), and dimensions that demand immediate attention (red).`)}
                </p>
                <p style={{ lineHeight: 1.7 }}>
                    {cleanText(`This color-coded system ensures that the results are not just descriptive but actionable, helping individuals and organizations quickly identify where energy and investment should be focused to accelerate growth and performance.`)}
                </p>
                {scoredResults && (
                    <div style={{ textAlign: 'center', margin: '40px 0' }}>
                        <p style={{ fontSize: '1.2em' }}>Your Marketing Index:</p><br />
                        <p style={{ fontSize: '4em', fontWeight: 'bold', color: theme.colors.primary, margin: '10px 0' }}>{scoredResults.percentage.toFixed(1)}%</p>
                    </div>
                )}
                <div 
                ref={(el) => (chartRefs.current['keyFindings'] = el)} 
                style={{ width: '100%', height: '450px', marginTop: '40px', padding: '20px' }}>
                    <h3 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, textAlign: 'center', marginBottom: '20px' }}>Core Capability Benchmarks</h3>
                    <BenchmarkBarChart data={coreCapabilityChartData} />
                </div>
            </Page>

            {/* --- DETAILED ANALYSIS PAGES (FULL & CORRECTED LAYOUT) --- */}
{detailedAnalysis && Object.keys(reportStructureData).map((key) => {
    const staticData = reportStructureData[key];
    const aiAnalysis = detailedAnalysis[key];
    const dimensionScore = scoredResults.dimensionScores[key];

    if (!staticData || !aiAnalysis) {
        console.warn(`Data not found for section: ${key}`);
        return null;
    }

    const isTradeoff = !!staticData.subTopics;

    return (
        <Page key={key}>
            <SectionTitle>{staticData.title}</SectionTitle>
            
            {/* --- All Static Text Renders First --- */}
            <p style={{lineHeight: 1.7, fontStyle: 'italic', color: theme.colors.lightText}}>{staticData.mainDescription}</p>
            {isTradeoff ? (
                <>
                    <div style={{margin: '20px 0', paddingLeft: '20px', borderLeft: `3px solid ${theme.colors.accent}`}}>
                        <SubTitle>{staticData.subTopicsTitle}</SubTitle>
                        <ul style={{paddingLeft: '20px'}}>
                            {staticData.subTopics.map((topic, i) => <li key={i} style={{marginBottom: '10px'}}>{topic}</li>)}
                        </ul>
                    </div>
                    <SubTitle>{staticData.judgedByTitle}</SubTitle>
                    <ul style={{paddingLeft: '20px'}}>
                        {staticData.judgedByItems && staticData.judgedByItems.map((item, i) => <li key={i} style={{marginBottom: '10px'}}>{item}</li>)}
                    </ul>
                    <SubTitle>{staticData.mattersWhyTitle}</SubTitle>
                    <p style={{lineHeight: 1.7}}>{staticData.mattersWhyText}</p>
                </>
            ) : (
                <p style={{lineHeight: 1.7, marginTop: '15px'}}>{staticData.performanceContext}</p>
            )}

            {/* --- Styled Analysis Section with Chart and AI Text --- */}
            <div style={{
                marginTop: '30px',
                padding: '25px',
                backgroundColor: theme.colors.lightBackground,
                border: `1px solid ${theme.colors.borderColor}`,
                borderRadius: '8px'
            }}>
                <h3 style={{fontFamily: theme.fonts.heading, color: theme.colors.primary, marginTop: 0, textAlign: 'center'}}>
                    Your Personalized Analysis
                </h3>

                {/* --- Chart is now placed correctly here --- */}
                <div 
    ref={(el) => (chartRefs.current[key] = el)} 
    style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '20px 0', // Add padding to ensure legend is not clipped
        backgroundColor: theme.colors.lightBackground // Match the analysis box background
    }}
>
                    {isTradeoff ? (
                        <DivergingBarChart
                            dataPairs={scoredResults.pairs.filter(p => tradeoffLabels[key]?.labels[p.qA])}
                            labels={tradeoffLabels[key]}
                        />
                    ) : (
                        <RadialProgressChart 
                            score={dimensionScore} 
                            benchmark={dimensionBenchmarks[key]?.avg || 65} 
                            topPerformer={dimensionBenchmarks[key]?.top || 90} 
                        />
                    )}
                </div>
                
                {/* --- AI-generated text in two columns --- */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start'}}>
                    <div>
                        <h4 style={{fontFamily: theme.fonts.heading, color: theme.colors.primary, borderBottom: `2px solid ${theme.colors.borderColor}`, paddingBottom: '5px'}}>
                            Diagnostic Review
                        </h4>
                        <p style={{whiteSpace: 'pre-wrap', lineHeight: 1.7}}>{aiAnalysis.diagnosticReview}</p>
                    </div>
                    <div>
                        <h4 style={{fontFamily: theme.fonts.heading, color: theme.colors.primary, borderBottom: `2px solid ${theme.colors.borderColor}`, paddingBottom: '5px'}}>
                            Benchmark Comparison
                        </h4>
                        <p style={{whiteSpace: 'pre-wrap', lineHeight: 1.7}}>{aiAnalysis.benchmarkComparison}</p>
                        <h4 style={{fontFamily: theme.fonts.heading, color: theme.colors.primary, borderBottom: `2px solid ${theme.colors.borderColor}`, paddingBottom: '5px', marginTop: '20px'}}>
                            Career Implications
                        </h4>
                        <p style={{whiteSpace: 'pre-wrap', lineHeight: 1.7}}>{aiAnalysis.careerImplications}</p>
                    </div>
                </div>
            </div>
        </Page>
    );
})}
        </div>
        {/* ...the end of your .map() loop... */}
        {/* ADD THIS NEW PAGE AT THE VERY END */}
        <Page>
            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <Image src="/logo.png" alt="Leadership Accelerator Logo" width={240} height={96} alt="Leadership Accelerator Logo" />
                <p style={{ fontSize: '1.5em', color: theme.colors.accent, marginTop: '20px' }}>
                    Accelerating Success
                </p>
            </div>
        </Page>
    </div>
);
    
};

export default MarketingReport;