// src/hooks/useCookieConsent.ts
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_CONSENT_KEY = "pomodoro_cookie_consent";

interface UseCookieConsentReturn {
  showCookieConsent: boolean;
  cookieConsentGiven: boolean;
  handleCookieConsent: (accepted: boolean) => void;
}

export const useCookieConsent = (): UseCookieConsentReturn => {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [cookieConsentGiven, setCookieConsentGiven] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_CONSENT_KEY);
    if (consent === 'accepted') {
      setCookieConsentGiven(true);
    } else if (!consent) {
      // Only show consent if it hasn't been explicitly declined or accepted
      setShowCookieConsent(true);
    }
  }, []);

  const handleCookieConsent = (accepted: boolean) => {
    if (accepted) {
      Cookies.set(COOKIE_CONSENT_KEY, 'accepted', { expires: 365, secure: true, sameSite: 'Lax' });
      setCookieConsentGiven(true);
    } else {
      Cookies.set(COOKIE_CONSENT_KEY, 'declined', { expires: 365, secure: true, sameSite: 'Lax' });
      setCookieConsentGiven(false);
    }
    setShowCookieConsent(false);
  };

  return { showCookieConsent, cookieConsentGiven, handleCookieConsent };
};