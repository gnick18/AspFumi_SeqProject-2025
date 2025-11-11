'use client';

import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

const GoogleTranslate = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    initializeTranslate();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      // Monitor for language selection changes
      const checkForSelect = setInterval(() => {
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement && !selectRef.current) {
          selectRef.current = selectElement;
          
          // Add event listener for language changes
          selectElement.addEventListener('change', handleLanguageChange);
        }
      }, 500);

      return () => {
        clearInterval(checkForSelect);
        if (selectRef.current) {
          selectRef.current.removeEventListener('change', handleLanguageChange);
        }
      };
    }
  }, [isInitialized]);

  const handleLanguageChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const selectedLanguage = target.value;
    
    // Show warning if a language other than English is selected
    if (selectedLanguage && selectedLanguage !== '' && selectedLanguage !== 'en') {
      // Reset the select to empty/English temporarily
      target.value = '';
      setShowWarning(true);
    }
  };

  const initializeTranslate = () => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'es,fr,de,zh-CN,zh-TW,ja,pt,ar,ru,it,ko,nl,pl,tr,hi,sv,no,da,fi,cs,el,he,id,th,vi,uk,ro,hu,bg,hr,sk,sl,lt,lv,et',
            layout: 0, // Simple layout
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setIsInitialized(true);
      }
    };

    // Load Google Translate script if not already loaded
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Script already loaded, just initialize
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
      }
    }
  };

  const handleAccept = () => {
    setShowWarning(false);
    
    // Trigger the translation by programmatically changing the select
    setTimeout(() => {
      if (selectRef.current) {
        const lastSelectedValue = selectRef.current.getAttribute('data-pending-language');
        if (lastSelectedValue) {
          selectRef.current.value = lastSelectedValue;
          selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
          selectRef.current.removeAttribute('data-pending-language');
        }
      }
    }, 100);
  };

  const handleCancel = () => {
    setShowWarning(false);
    // Reset select to English
    if (selectRef.current) {
      selectRef.current.value = '';
      selectRef.current.removeAttribute('data-pending-language');
    }
  };

  // Store the selected language when warning is shown
  useEffect(() => {
    if (showWarning && selectRef.current) {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        const options = select.options;
        const selectedIndex = select.selectedIndex;
        if (selectedIndex > 0) {
          select.setAttribute('data-pending-language', options[selectedIndex].value);
        }
      }
    }
  }, [showWarning]);

  return (
    <>
      <div className="google-translate-wrapper">
        <div id="google_translate_element"></div>
      </div>

      {showWarning && (
        <div className="translation-warning-overlay">
          <div className="translation-warning-modal">
            <div className="translation-warning-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="warning-icon"
              >
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <h3>Translation Notice</h3>
            </div>
            
            <div className="translation-warning-content">
              <p className="warning-main-text">
                This translation feature is powered by <strong>Google Translate</strong>, an automated translation service.
              </p>
              
              <div className="warning-points">
                <p><strong>⚠️ Important:</strong></p>
                <ul>
                  <li>Scientific terminology may not be accurately translated</li>
                  <li>Technical terms and gene names may be mistranslated</li>
                  <li>For the most accurate information, please view the page in English</li>
                  <li>This is an automated service and translations are not reviewed by experts</li>
                </ul>
              </div>
              
              <p className="warning-footer-text">
                By proceeding, you acknowledge that translations may contain errors and should be used for general understanding only.
              </p>
            </div>
            
            <div className="translation-warning-buttons">
              <button
                onClick={handleCancel}
                className="warning-btn warning-btn-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="warning-btn warning-btn-accept"
              >
                I Understand, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleTranslate;