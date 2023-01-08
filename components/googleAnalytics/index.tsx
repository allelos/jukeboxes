import Script from "next/script";

const getScript = () =>
  `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-9C8H7K3BF3');`;

const GoogleAnalytics = () => (
  <>
    <Script
      strategy="lazyOnload"
      src="https://www.googletagmanager.com/gtag/js?id=G-9C8H7K3BF3"
    />
    <Script id="googleAnalytics" strategy="lazyOnload">
      {getScript()}
    </Script>
  </>
);

export default GoogleAnalytics;
