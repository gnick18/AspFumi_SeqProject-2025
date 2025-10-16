'use client';

import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      {/* This is the main Google Analytics script that fetches the gtag.js library. */}
      {/* The 'afterInteractive' strategy ensures it loads after the page is usable, so it doesn't slow down your site. */}
      <Script 
        strategy="afterInteractive" 
        src="https://www.googletagmanager.com/gtag/js?id=G-7SQ61X38XP" 
      />
      
      {/* This is the inline script that configures gtag. */}
      {/* We use 'dangerouslySetInnerHTML' to inject this raw JavaScript onto the page. */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7SQ61X38XP');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;