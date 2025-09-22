import '../styles/globals.css'; // Your existing global styles
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // The header/footer HTML is passed in via pageProps from each page
  return (
    <Layout 
        headerHtml={pageProps.headerHtml} 
        footerHtml={pageProps.footerHtml}
        bodyClassName="rbt-header-sticky" // Applying the class from the original <body> tag
    >
      <Component {...pageProps} />
    </Layout>
  );
}

// This function fetches the layout for EVERY page in the app.
// Note: This disables Automatic Static Optimization, which is fine for your app.
MyApp.getInitialProps = async (context) => {
    try {
        const layoutUrl = 'http://localhost:5000/api/layout';
        console.log(`[DEBUG] Attempting to fetch layout from: ${layoutUrl}`);

        const res = await fetch(layoutUrl);
        console.log(`[DEBUG] Fetch response status: ${res.status}`);

        if (!res.ok) {
            // If response is not 200-299, throw an error to be caught below
            throw new Error(`Failed to fetch with status: ${res.status}`);
        }

        const layoutData = await res.json();
        console.log('[DEBUG] Successfully fetched and parsed layout JSON.');
        return { pageProps: layoutData };

    } catch (error) {
        console.error('[ERROR] CRITICAL: Failed to fetch layout data.', error);
        // On failure, return empty props so the app doesn't crash
        return { pageProps: {} }; 
    }
};


export default MyApp;