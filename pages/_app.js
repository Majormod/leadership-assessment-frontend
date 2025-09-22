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
    // We are on the server, so we fetch from the internal localhost address of the LMS
    const res = await fetch('http://localhost:5000/api/layout');
    const layoutData = await res.json();
    return { pageProps: layoutData };
};


export default MyApp;