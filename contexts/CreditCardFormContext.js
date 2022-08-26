import { createContext, useState } from "react";
// Just a sample on how to use Context API

//Improve intellisense
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

// Main Provider Function for Parent App
export const CreditCardFormContextProvider = (props) => {
  const [cardNum, setCardNum] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const cardNumHandler = (number) => {
    setCardNum(number);
  };
  const cardExpMonthHandler = (month) => {
    setCardExpMonth(month);
  };
  const cardExpYearHandler = (year) => {
    setCardExpYear(year);
  };
  const cardHolderHandler = (name) => {
    setCardHolder(name);
  };
  const cardCVVHandler = (cvv) => {
    setCardCVV(cvv);
  };
  const isTermsAcceptedHandler = (isAccepted) => {
    setIsTermsAccepted(isAccepted);
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
