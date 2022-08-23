import classes from "./PaymentTabs.module.css";

const PaymentTabs = (props) => {
  return (
    <div className={classes.btnGroup} aria-label="Payment Tabs">
      {props.children}
    </div>
  );
};

export default PaymentTabs;
