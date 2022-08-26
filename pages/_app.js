import "../styles/globals.css";
import CreditCardFormContextProvider from "../contexts/CreditCardFormContext";

function MyApp({ Component, pageProps }) {
  return (
    <CreditCardFormContextProvider>
      <Component {...pageProps} />
    </CreditCardFormContextProvider>
  );
}

export default MyApp;
