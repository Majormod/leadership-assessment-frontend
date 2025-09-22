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
            // In components/Layout.js

{/* ... The rest of your Layout component is above this ... */}

{/* VENDOR JS - REPLACE your current <Script> tags with this full block */}
<Script src="/assets/js/vendor/modernizr.min.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
<Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/sal.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/js.cookie.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/jquery.style.switcher.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/swiper.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/jquery-appear.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/odometer.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/backtotop.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/isotop.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/imageloaded.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/wow.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/waypoint.min.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/easypie.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/text-type.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/jquery-one-page-nav.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/bootstrap-select.min.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/jquery-ui.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/magnify-popup.min.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/paralax-scroll.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/paralax.min.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/countdown.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/plyr.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/jodit.min.js" strategy="lazyOnload" />
<Script src="/assets/js/vendor/Sortable.min.js" strategy="lazyOnload" />
{/* Note: The slick.min.js path from your file was invalid, so I've omitted it. */}

{/* MAIN JS - These must come after the vendor scripts */}
<Script src="/assets/js/main.js" strategy="lazyOnload" />
<Script src="/assets/js/ecommerce.js" strategy="lazyOnload" />
<Script src="/assets/js/nav.js" strategy="lazyOnload" />
        </>
    );
};

export default Layout;