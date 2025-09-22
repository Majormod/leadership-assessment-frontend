// In components/LmsLayout.js

import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

const LmsLayout = ({ children }) => {
    // In components/LmsLayout.js

useEffect(() => {
    // Check if our new, safe re-initialize function exists
    if (typeof window.reinitializeLmsHeader === 'function') {

        // A tiny delay ensures React has finished rendering everything
        // before we try to make it interactive.
        setTimeout(() => {
            window.reinitializeLmsHeader();
        }, 100); // 100 milliseconds is imperceptible to the user
    }
}, []);

    return (
        <>
            <Head>
                <title>The Marketing Influence Quotient™</title>
                <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />

                {/* All CSS files from your LMS */}
                <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
                <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
                <link rel="stylesheet" href="/assets/css/plugins/feather.css" />
                <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" />
                {/* ... add any other necessary CSS links from your original header here ... */}
                <link rel="stylesheet" href="/assets/css/styles.css" />
            </Head>

            <div className="rbt-header-sticky">
                {/* ▼▼▼ PASTE YOUR FULL HEADER HTML HERE ▼▼▼ */}
                <header className="rbt-header rbt-header-10">
                    {/* ... your entire complex header HTML goes here ... */}
                </header>
                {/* ▲▲▲ END OF HEADER HTML ▲▲▲ */}

                <main className="rbt-main-wrapper">
                    {children}
                </main>

                {/* ▼▼▼ PASTE YOUR FULL FOOTER HTML HERE ▼▼▼ */}
                <footer className="rbt-footer footer-style-1">
                     {/* ... your entire footer HTML goes here ... */}
                </footer>
                {/* ▲▲▲ END OF FOOTER HTML ▲▲▲ */}
            </div>

            {/* All JS files needed for the header/footer to be interactive */}
            <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
            <Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
            <Script src="/assets/js/main.js" strategy="lazyOnload" />
            <Script src="/assets/js/nav.js" strategy="lazyOnload" />
        </>
    );
};

export default LmsLayout;