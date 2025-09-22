import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

// This component will wrap every page of your AI assessment app
const Layout = ({ children, headerHtml, footerHtml, bodyClassName }) => {

    useEffect(() => {
        // This is a crucial step. Many of the old jQuery scripts run on page load.
        // After React loads and inserts the HTML, we need to re-trigger the logic
        // in those scripts. This assumes your 'main.js' can re-initialize.
        if (window.MAIN) {
            window.MAIN.init(); // Or whatever the main initialization function is called
        }
    }, [headerHtml]); // Re-run if the header changes

    return (
        <>
            <Head>
                <title>The Marketing Influence Quotient™</title>
                <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />
                
                {/* All CSS files from your original header.html */}
                <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
                <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
                <link rel="stylesheet" href="/assets/css/plugins/feather.css" />
                <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" />
                {/* ... add all other CSS links here ... */}
                <link rel="stylesheet" href="/assets/css/styles.css" />
            </Head>

            <div className={bodyClassName}>
                {headerHtml && (
                    <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
                )}

                <main className="rbt-main-wrapper">
                    {children}
                </main>

                {footerHtml && (
                    <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
                )}
            </div>

            {/* All JS files from your original file. Strategy 'beforeInteractive' is important for jQuery */}
            <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
            <Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
            {/* ... add all other vendor JS scripts here ... */}
            <Script src="/assets/js/main.js" strategy="lazyOnload" />
        </>
    );
};

export default Layout;