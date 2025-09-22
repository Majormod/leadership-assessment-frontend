import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

const Layout = ({ children, headerHtml, footerHtml, bodyClassName }) => {
    const isInitializedRef = useRef(false);

    useEffect(() => {
        if (!headerHtml || isInitializedRef.current) return;

        const initializeLMSHeader = () => {
            console.log('🏗️ Initializing LMS header in Next.js');
            
            // Check if container exists
            const container = document.getElementById('search-dropdown-courses-container');
            console.log('📦 Container exists:', !!container);
            
            if (container) {
                console.log('🔍 Container content length:', container.innerHTML.length, 'characters');
            }

            // Method 1: Use our enhanced global function from main.js
            if (window.lmsPopulateSearchDropdown) {
                console.log('✅ Using window.lmsPopulateSearchDropdown');
                const result = window.lmsPopulateSearchDropdown();
                isInitializedRef.current = true;
                return true;
            }
            
            // Method 2: Check if original function exists
            if (typeof window.populateSearchDropdownCourses === 'function') {
                console.log('✅ Using window.populateSearchDropdownCourses');
                window.populateSearchDropdownCourses();
                isInitializedRef.current = true;
                return true;
            }
            
            // Method 3: Try to call MAIN.init if it exists
            if (window.MAIN && typeof window.MAIN.init === 'function') {
                console.log('✅ Using window.MAIN.init');
                window.MAIN.init();
                isInitializedRef.current = true;
                return true;
            }
            
            console.log('❌ No initialization function found');
            return false;
        };

        // Try initialization with multiple attempts
        const tryInitialization = () => {
            console.log('🔄 Attempting LMS header initialization');
            
            if (initializeLMSHeader()) {
                console.log('🎉 LMS header initialized successfully');
                return;
            }
            
            // Retry with increasing delays to account for script loading timing
            const retryAttempts = [100, 300, 500, 1000, 2000];
            
            retryAttempts.forEach((delay, index) => {
                setTimeout(() => {
                    console.log(`🔄 Retry attempt ${index + 1} after ${delay}ms`);
                    if (initializeLMSHeader()) {
                        console.log('🎉 LMS header initialized on retry');
                    } else if (index === retryAttempts.length - 1) {
                        console.error('💥 All initialization attempts failed');
                    }
                }, delay);
            });
        };

        // Start initialization process after main.js has time to load
        const initTimer = setTimeout(tryInitialization, 200);

        // Set up search icon click handler for Next.js environment
        const handleSearchClick = (event) => {
            const searchIcon = event.target.closest('#search-icon, .search-toggle, .search-icon, .rbt-search-btn');
            if (searchIcon) {
                console.log('🔍 Search icon clicked in Next.js, re-initializing courses');
                // Delay to ensure dropdown is visible
                setTimeout(() => {
                    if (window.lmsPopulateSearchDropdown) {
                        window.lmsPopulateSearchDropdown();
                    } else if (window.populateSearchDropdownCourses) {
                        window.populateSearchDropdownCourses();
                    }
                }, 300);
            }
        };

        // Also handle search input focus
        const handleSearchFocus = (event) => {
            if (event.target.id === 'main-search-input' || event.target.closest('#main-search-form')) {
                console.log('⌨️ Search input focused, populating courses');
                setTimeout(() => {
                    if (window.lmsPopulateSearchDropdown) {
                        window.lmsPopulateSearchDropdown();
                    }
                }, 200);
            }
        };

        document.addEventListener('click', handleSearchClick);
        document.addEventListener('focusin', handleSearchFocus);

        return () => {
            clearTimeout(initTimer);
            document.removeEventListener('click', handleSearchClick);
            document.removeEventListener('focusin', handleSearchFocus);
        };
    }, [headerHtml]);

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

            {/* VENDOR JS */}
            <Script src="/assets/js/vendor/modernizr.min.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
            <Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/sal.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/js.cookie.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/jquery.style.switcher.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/swiper.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/jquery-appear.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/odometer.js" strategy="lazyOnload" />
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
            <Script src="/assets/js/vendor/countdown.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/plyr.js" strategy="lazyOnload" />
            <Script src="/assets/js/vendor/Sortable.min.js" strategy="lazyOnload" />

            {/* MAIN JS - Enhanced with proper initialization triggers */}
            <Script 
                src="/assets/js/main.js" 
                strategy="lazyOnload"
                onLoad={() => {
                    console.log('✅ main.js loaded successfully');
                    // Trigger initialization after main.js loads
                    setTimeout(() => {
                        if (window.lmsPopulateSearchDropdown) {
                            console.log('🚀 Manually triggering course population');
                            window.lmsPopulateSearchDropdown();
                        } else if (window.populateSearchDropdownCourses) {
                            console.log('🚀 Using original populate function');
                            window.populateSearchDropdownCourses();
                        } else if (window.MAIN && window.MAIN.init) {
                            console.log('🚀 Using MAIN.init');
                            window.MAIN.init();
                        }
                    }, 100);
                }}
                onError={(error) => {
                    console.error('❌ Failed to load main.js:', error);
                }}
            />
            
            <Script src="/assets/js/ecommerce.js" strategy="lazyOnload" />
            <Script src="/assets/js/nav.js" strategy="lazyOnload" />

            {/* Debug script to check environment */}
            <Script
                id="debug-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        console.log('🐛 DEBUG: Window environment check');
                        console.log('🐛 DEBUG: Document readyState:', document.readyState);
                        console.log('🐛 DEBUG: Search container exists:', !!document.getElementById('search-dropdown-courses-container'));
                        console.log('🐛 DEBUG: lmsPopulateSearchDropdown exists:', !!window.lmsPopulateSearchDropdown);
                        console.log('🐛 DEBUG: populateSearchDropdownCourses exists:', !!window.populateSearchDropdownCourses);
                        console.log('🐛 DEBUG: MAIN.init exists:', !!(window.MAIN && window.MAIN.init));
                        console.log('🐛 DEBUG: API_BASE_URL:', window.API_BASE_URL);
                        
                        // Test the API endpoint directly
                        setTimeout(() => {
                            fetch('/api/courses?limit=1')
                                .then(r => {
                                    console.log('🐛 DEBUG: API status:', r.status);
                                    return r.json();
                                })
                                .then(data => console.log('🐛 DEBUG: API response:', data))
                                .catch(err => console.error('🐛 DEBUG: API test failed:', err));
                        }, 500);
                    `
                }}
            />
        </>
    );
};

export default Layout;