import { createContext, useState } from "react";

export const CreditCardFormContext = createContext({
  cardNum: "",
  setCardNum: () => {},
  cardExpMonth: "",
  setCardExpMonth: () => {},
  cardExpYear: "",
  setCardExpYear: () => {},
  cardHolder: "",
  setCardHolder: () => {},
  setCardCVV: "",
  setCardHolder: () => {},
  isTermsAccepted: false,
  setIsTermsAccepted: () => {},
});

export const CreditCardFormContextProvider = (props) => {
  const [cardNum, setCardNum] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const cardNumHandler = (name) => {
    setCardNum(name);
  };
  const cardExpMonthHandler = (name) => {
    setCardExpMonth(name);
  };
  const cardExpYearHandler = (name) => {
    setCardExpYear(name);
  };
  const cardHolderHandler = (name) => {
    setCardHolder(name);
  };
  const cardCVVHandler = (name) => {
    setCardCVV(name);
  };
  const isTermsAcceptedHandler = (name) => {
    setIsTermsAccepted(name);
  };

  return (
    <CreditCardFormContext.Provider
      value={{
        cardNum: cardNum,
        setCardNum: cardNumHandler,
        cardExpMonth: cardExpMonth,
        setCardExpMonth: cardExpMonthHandler,
        cardExpYear: cardExpYear,
        setCardExpYear: cardExpYearHandler,
        cardHolder: cardHolder,
        setCardHolder: cardHolderHandler,
        cardCVV: cardCVV,
        setCardCVV: cardCVVHandler,
        isTermsAccepted: isTermsAccepted,
        setIsTermsAccepted: isTermsAcceptedHandler,
      }}
    >
      {props.children}
    </CreditCardFormContext.Provider>
  );
};

export default CreditCardFormContextProvider;
