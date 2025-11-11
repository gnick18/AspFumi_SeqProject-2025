'use client';

import { useEffect, useState } from 'react';

const TranslationDisclaimer = () => {
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    // Check if page is translated by looking for Google Translate elements
    const checkTranslation = () => {
      const translateElement = document.querySelector('.goog-te-banner-frame');
      const bodyClass = document.body.className;
      setIsTranslated(translateElement !== null || bodyClass.includes('translated'));
    };

    // Check immediately and set up interval to monitor
    checkTranslation();
    const interval = setInterval(checkTranslation, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isTranslated) return null;

  return (
    <div className="translation-disclaimer">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-start gap-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 flex-shrink-0 mt-0.5"
          >
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">
              Automatic Translation Active
            </p>
            <p className="text-xs">
              This page has been automatically translated. Scientific terminology and technical terms may not be accurate. 
              For the most accurate information, please view the page in English.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationDisclaimer;