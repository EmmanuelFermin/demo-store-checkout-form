import { useRef } from "react";
import classes from "./PaymentForm.module.css";

const PaymentForm = (props) => {
  const cardNumInputRef = useRef();
  const cardExpInputRef = useRef();
  const cardHolderInputRef = useRef();
  const cardCVVInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredCardNum = cardNumInputRef.current.value;
    const enteredCardExp = cardExpInputRef.current.value;
    const enteredCardHolder = cardHolderInputRef.current.value;
    const enteredCardCVV = cardCVVInputRef.current.value;

    const paymentData = {
      cardNum: enteredCardNum,
      cardExpiration: enteredCardExp,
      cardHolder: enteredCardHolder,
      cardCVV: enteredCardCVV,
    };

    props.onPlaceOrder(paymentData);
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset>
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
          <input
            type="number"
            id="card-expiration"
            ref={cardExpInputRef}
            required
          />
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
      </fieldset>

      <div className={classes.control}>
        <label htmlFor="card-cvv">CVV/CVC *</label>
        <input type="number" id="card-cvv" ref={cardCVVInputRef} required />
      </div>

      <div className={classes.control}>
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
