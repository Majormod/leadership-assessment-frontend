import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

const Layout = ({ children, headerHtml, footerHtml, bodyClassName }) => {

    useEffect(() => {
        if (!headerHtml) return;

        const tryInitializeCourses = () => {
            console.log('🔄 Attempting to initialize courses');
            
            // Method 1: Use our enhanced global function
            if (window.lmsPopulateSearchDropdown) {
                console.log('✅ Using lmsPopulateSearchDropdown');
                window.lmsPopulateSearchDropdown();
                return true;
            }
            
            // Method 2: Check if original function exists
            if (typeof window.populateSearchDropdownCourses === 'function') {
                console.log('✅ Using populateSearchDropdownCourses');
                window.populateSearchDropdownCourses();
                return true;
            }
            
            console.log('❌ No course population function found yet');
            return false;
        };

        // Try initialization with retries
        if (!tryInitializeCourses()) {
            const retryTimer = setTimeout(() => {
                tryInitializeCourses();
            }, 500);
            
            return () => clearTimeout(retryTimer);
        }
    }, [headerHtml]);

    return (
        <>
            <Head>
                <title>The Marketing Influence Quotient™</title>
                <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />
                
                {/* Your existing CSS files */}
                <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
                <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
                <link rel="stylesheet" href="/assets/css/plugins/feather.css" />
                <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" />
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

            {/* Your existing JS files */}
            <Script src="/assets/js/vendor/modernizr.min.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
            <Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
            {/* ... all your other vendor scripts ... */}
            
            {/* MAIN JS - with initialization trigger */}
            <Script 
                src="/assets/js/main.js" 
                strategy="lazyOnload"
                onLoad={() => {
                    console.log('✅ main.js loaded');
                    // Trigger course population after main.js loads
                    setTimeout(() => {
                        if (window.lmsPopulateSearchDropdown) {
                            console.log('🚀 Triggering course population');
                            window.lmsPopulateSearchDropdown();
                        }
                    }, 200);
                }}
            />
            
            <Script src="/assets/js/ecommerce.js" strategy="lazyOnload" />
            <Script src="/assets/js/nav.js" strategy="lazyOnload" />
        </>
    );
};

export default Layout;