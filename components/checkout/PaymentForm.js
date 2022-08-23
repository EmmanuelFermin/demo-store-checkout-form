import { useRef, useState } from "react";
import classes from "./PaymentForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isGreaterTwoChars = (value) => value.trim().length >= 3;
const isThreeChars = (value) => value.trim().length === 3;

const PaymentForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    cardNum: true,
    cardExpMonth: true,
    cardExpYear: true,
    cardHolder: true,
    cardCVV: true,
  });

  const cardNumInputRef = useRef();
  const cardExpMonthInputRef = useRef();
  const cardExpYearInputRef = useRef();
  const cardHolderInputRef = useRef();
  const cardCVVInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredCardNum = cardNumInputRef.current.value;
    const enteredCardExpMonth = cardExpMonthInputRef.current.value;
    const enteredCardExpYear = cardExpYearInputRef.current.value;
    const enteredCardHolder = cardHolderInputRef.current.value;
    const enteredCardCVV = cardCVVInputRef.current.value;

    const enteredCardNumIsValid = !isEmpty(enteredCardNum);
    const enteredCardExpMonthIsValid = isGreaterTwoChars(enteredCardExpMonth);
    const enteredCardExpYearIsValid = isGreaterTwoChars(enteredCardExpYear);
    const enteredCardHolderIsValid = !isEmpty(enteredCardHolder);
    const enteredCardCVVIsValid = isThreeChars(enteredCardCVV);

    setFormInputsValidity({
      cardNum: enteredCardNumIsValid,
      cardExpMonth: enteredCardExpMonthIsValid,
      cardExpYear: enteredCardExpYearIsValid,
      cardHolder: enteredCardHolderIsValid,
      cardCVV: enteredCardCVVIsValid,
    });

    const formIsValid =
      enteredCardNumIsValid &&
      enteredCardExpMonthIsValid &&
      enteredCardExpYearIsValid &&
      enteredCardHolderIsValid &&
      enteredCardCVVIsValid;

    const paymentData = {
      cardNum: enteredCardNum,
      cardExpiration: enteredCardExpMonth,
      cardHolder: enteredCardHolder,
      cardCVV: enteredCardCVV,
    };

    if (!formIsValid) return;

    props.onPlaceOrder(paymentData);
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset className={classes.formGroup}>
        <div className={classes.column__bordered}>
          <div className={classes.control}>
            <label htmlFor="card-number">Card Number*</label>
            <input
              type="number"
              id="card-number"
              ref={cardNumInputRef}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="card-expiration">{"Valid thru (mm/yy)"}*</label>
            <div className={classes.control_children}>
              <input
                type="number"
                id="card-expiration-month"
                name="card-expiration-month"
                ref={cardExpMonthInputRef}
                required
              />
              <span>/</span>
              <input
                type="number"
                id="card-expiration-year"
                ref={cardExpYearInputRef}
                required
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="card-holder">{"Cardholder's name"}*</label>
            <input
              type="text"
              id="card-holder"
              ref={cardHolderInputRef}
              required
            />
          </div>
        </div>

        <div className={classes.column}>
          <div className={classes.control}>
            <label htmlFor="card-cvv">CVV/CVC *</label>
            <input type="number" id="card-cvv" ref={cardCVVInputRef} required />
          </div>
        </div>
      </fieldset>

      <div>
        <input type="checkbox" id="terms" ref={cardCVVInputRef} required />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
      </div>

      <section className={classes.actions}>
        <button type="submit">Place order</button>
      </section>
    </form>
  );
};

export default PaymentForm;
