import classes from "./PaymentMethodTabs.module.css";

const PaymentMethodTabs = ({ children }) => {
  return (
    <div className={classes.btnGroup} aria-label="Payment Method Tabs">
      {children}
    </div>
  );
};

export default PaymentMethodTabs;
