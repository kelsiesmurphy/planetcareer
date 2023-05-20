import Cookies from "js-cookie";
import Link from "next/link";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { Flag } from "react-feather";

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365;

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <section className="fixed bottom-0 left-0 w-full py-2 md:py-4">
      <div className="flex flex-col items-start px-5 py-3 space-y-2 bg-green-700 text-white md:flex-row md:space-y-0 md:items-stretch md:space-x-2">
        <div className="flex items-center gap-x-4 flex-grow">
          <div className="bg-green-800 p-2 rounded-lg">
            <Flag size={20} />
          </div>
          <p className="text-sm font-medium">
            We only use the most essential cookies here at PlanetCareer.{" "}
            <span className="font-normal">
              Read our{" "}
              <a
                href="https://app.getterms.io/view/BI8dN/cookie/en-au"
                target="_blank"
                className="underline"
              >
                Cookie Policy
              </a>
              .
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <button className="btn-secondary" onClick={onClick}>
            Got it
          </button>
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;
