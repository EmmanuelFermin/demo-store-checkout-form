import classes from "./CheckoutBilling.module.css";
import { useEffect, useState, useCallback } from "react";
import CheckoutItem from "./CheckoutItem";
import PaymentMethodTabs from "./PaymentMethodTabs";
import CreditCardForm from "./CreditCardPaymentForm";

const tabs = [
  {
    label: "Credit card",
    value: "isCreditCard",
  },
  {
    label: "Gift card",
    value: "isGiftCard",
  },
  {
    label: "PayPal",
    value: "isPaypal",
  },
];

// Main FC (Functional Component)
const CheckoutBilling = ({ products, shipping }) => {
  const [currentTab, setCurrentTab] = useState("isCreditCard");
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  //Gets some shipping fee to be added on final order price
  const getShippingFee = useCallback(async () => {
    const fee = await shipping.map((method) => method.fee);
    setShippingFee(Number(fee.toString()));
  }, [shipping]);

  //Simulates the total products to be checkout
  const getProducts = useCallback(async () => {
    const sum = await products.reduce(
      (currentTotal, nextItem) => currentTotal.price + nextItem.price
    );
    setTotalPrice(sum);
  }, [products]);

  // Executes the side-effects
  useEffect(() => {
    getProducts();
    getShippingFee();
  }, [getProducts, getShippingFee]);

  // Handles the available Payment Method Tabs
  const handleTabsChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setCurrentTab(value);
  };

  // Determines the current content of Payment Method
  let paymentMethodContent = (
    <CreditCardForm totalcheckout={totalPrice} shipping={shippingFee} />
  );

  if (currentTab === "isGiftCard") paymentMethodContent = "Gift Card";
  if (currentTab === "isPaypal") paymentMethodContent = "Paypal";

  return (
    <main className={classes.card}>
      <h2 className={classes.title}>Checkout</h2>

      <section>
        <h3>Products</h3>
        <ul className={classes.list}>
          {products.map((product) => (
            <CheckoutItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </ul>
      </section>

      <section>
        <h3>Shipping method</h3>
        <div className={classes.shipping}>
          <p className={classes.shipping_name}>{shipping[0].courier}</p>
          <p className={classes.shipping_fee}>${shipping[0].fee}</p>
        </div>
      </section>

      <section>
        <h3>Payment method</h3>
        <PaymentMethodTabs onChange={handleTabsChange} value={currentTab}>
          {tabs.map((tab) => (
            <button
              onClick={handleTabsChange}
              className={currentTab === tab.value ? classes.active : ""}
              key={tab.label}
              name={tab.label}
              value={tab.value}
            >
              {tab.label}
            </button>
          ))}
        </PaymentMethodTabs>
        {paymentMethodContent}
      </section>
    </main>
  );
};

export default CheckoutBilling;
