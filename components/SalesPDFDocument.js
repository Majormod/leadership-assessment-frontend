import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// --- STYLES (Adapted from your MarketingPDFDocument for consistency) ---
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
    h2: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        color: '#1D2951',
        borderBottom: 2,
        borderColor: '#4A90E2',
        paddingBottom: 8,
        marginBottom: 20,
    },
    h3: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: '#1D2951',
        marginBottom: 10,
        marginTop: 15,
    },
    text: {
        marginBottom: 10,
        textAlign: 'justify',
    },
    italic: {
        fontFamily: 'Helvetica-Oblique',
        color: '#555',
    },
    analysisBox: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#F8F9FA',
        border: '1px solid #DEE2E6',
        borderRadius: 5,
    },
    chartImage: {
        width: '90%',
        marginTop: 20,
        marginBottom: 15,
        alignSelf: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: '10mm',
        left: '15mm',
        right: '15mm',
        textAlign: 'center',
        color: 'grey',
        fontSize: 8,
    },
});

const Footer = () => (
    <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => (
        `The Sales Performance Index™ | Page ${pageNumber} of ${totalPages}`
    )} />
);

const SalesPDFDocument = ({ report, logoDataURI, chartImages }) => {
    if (!report || !report.analysis) {
        return <Document><Page style={styles.page}><Text>Loading report data...</Text></Page></Document>;
    }

    const {
        analysis,
        executiveSummaryDescriptions,
        salesReportGroups,
        salesReportIndices
    } = report;

    return (
        <Document>
            {/* --- "About the Index" Page --- */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.h2}>The Sales Performance Index™</Text>
                <Text style={styles.text}>
                    [cite_start]At The Leadership Accelerator, we believe that sales is not just a function it is the frontline of value creation, where markets are won or lost one conversation at a time. In an age of complex buyer journeys, fragmented channels, and relentless competition, true sales excellence is not about charm or persistence alone, but about judgment, discipline, and adaptability under pressure. [cite: 1849, 1850]
                </Text>
                <Text style={styles.text}>
                    The Sales Performance Index™ is our proprietary diagnostic designed to measure and elevate these very capabilities. Built on research across B2B, B2C, retail, and distribution contexts, it goes beyond product knowledge or closing skills. [cite_start]Instead, it evaluates the eight dimensions that define modern sales performance - from opportunity sensing and competitive positioning, to negotiation discipline, execution habits, and team leadership. [cite: 1851, 1852, 1853]
                </Text>
                <Text style={styles.text}>
                    This is not a test of memory or jargon. It is a lens into how sales professionals think, decide, and act in real-world trade-offs when pricing integrity collides with volume pressure, when local signals contradict market data, when nurturing a prospect risks pipeline efficiency, or when defending share requires swift counter-positioning. [cite_start]By confronting candidates with dilemmas that have no easy answers, the Sales Performance Index™ reveals the instincts, biases, and strategies that shape sales outcomes. [cite: 1855, 1856]
                </Text>
                 <Text style={styles.text}>
                    The Sales Performance Index™ is not a one-time test; it is the foundation of a growth ecosystem. It informs personalized coaching, team development strategies, and organizational sales enablement. [cite_start]It identifies hunters, farmers, negotiators, and leaders ensuring that people are deployed where they can thrive, and coached where they must grow. [cite: 1862, 1863, 1864]
                </Text>
                <Footer />
            </Page>

            {/* --- Executive Summary Page --- */}
            <Page size="A4" style={styles.page} wrap>
                <Text style={styles.h2}>Executive Summary</Text>
                {Object.entries(analysis.executiveSummary).map(([key, value]) => (
                    <View key={key} style={{ marginBottom: 15 }} wrap={false}>
                        <Text style={styles.h3}>{executiveSummaryDescriptions[key]?.title}</Text>
                        <Text style={{ ...styles.italic, fontSize: 9, marginBottom: 5 }}>
                            {executiveSummaryDescriptions[key]?.description}
                        </Text>
                        <Text style={styles.analysisBox}>{value}</Text>
                    </View>
                ))}
                <Footer />
            </Page>

            {/* --- Key Findings Page with Radar Chart --- */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.h2}>Key Findings at a Glance</Text>
                <Text style={styles.text}>
                    This section delivers a clear and visual summary of your performance across the Sales Performance Index™ framework. [cite_start]The radar chart maps your results across the eight critical dimensions, providing an integrated capability profile that captures both breadth and depth of sales effectiveness. [cite: 1902, 1904]
                </Text>
                {chartImages['radarChart'] && (
                    <Image style={{ ...styles.chartImage, width: '100%', marginTop: 20 }} src={chartImages['radarChart']} />
                )}
                <Footer />
            </Page>

            {/* --- Detailed Pages for 8 Main Groups --- */}
            {Object.entries(salesReportGroups).map(([key, content]) => (
                <Page key={key} size="A4" style={styles.page} wrap>
                    <Text style={styles.h2}>{content.title}</Text>
                    <Text style={{ ...styles.text, ...styles.italic }}>{content.description}</Text>
                    {chartImages[key] && <Image style={styles.chartImage} src={chartImages[key]} />}
                    <Text style={styles.h3}>Diagnostic Analysis</Text>
                    <Text style={styles.analysisBox}>{analysis.groups[key]}</Text>
                    <Footer />
                </Page>
            ))}

            {/* --- Detailed Pages for Proprietary Indices --- */}
            {Object.entries(salesReportIndices).map(([key, content]) => (
                <Page key={key} size="A4" style={styles.page} wrap>
                    <Text style={styles.h2}>{content.title}</Text>
                    <Text style={{ ...styles.text, ...styles.italic }}>{content.description}</Text>
                    {chartImages[key] && <Image style={styles.chartImage} src={chartImages[key]} />}
                    <Text style={styles.h3}>Diagnostic Analysis</Text>
                    <Text style={styles.analysisBox}>{analysis.indices[key]}</Text>
                    <Footer />
                </Page>
            ))}
        </Document>
    );
};

export default SalesPDFDocument;