import "../styles/globals.css";
import CreditCardFormContextProvider from "../contexts/CreditCardFormContext";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <CreditCardFormContextProvider>
        <Component {...pageProps} />
      </CreditCardFormContextProvider>
    </ReduxProvider>
  );
}

export default MyApp;
