import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";

import { LANGS, isValidLang } from "../../lib/i18n";
import { LocaleProvider } from "../../config/localeContext";
import SiteChrome from "../../components/SiteChrome";
import SmoothScroll from "../../components/SmoothScroll";
import Footer from "../../components/Footer";
import CookieBanner from "../../components/CookieBanner";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  return (
    <html lang={lang}>
      <head>
        {/* GDPR-safe consent defaults must run before any Google script */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });`}
        </Script>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NJXRGH8P');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MH96HQWDV8"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MH96HQWDV8');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJXRGH8P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <LocaleProvider lang={lang}>
          <SmoothScroll />
          <SiteChrome />
          <div className="bg-white" id="main-container">
            {children}
            <div className="-z-10">
              <Footer />
            </div>
          </div>
          <CookieBanner />
        </LocaleProvider>

        <Script
          id="chatnav-bot"
          src="https://diarhitekti.chatnav.xyz/static/chatbot/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
