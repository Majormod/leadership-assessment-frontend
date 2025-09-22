// In pages/_app.js

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // This file now simply renders the current page, nothing more.
  return <Component {...pageProps} />;
}

export default MyApp;