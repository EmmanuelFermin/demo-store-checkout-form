import classes from "./CheckoutList.module.css";
import { useEffect, useState, useCallback } from "react";
import CheckoutItem from "./CheckoutItem";
import PaymentTabs from "./PaymentTabs";
import PaymentForm from "./PaymentForm";

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

const CheckoutList = ({ products, shipping }) => {
  const [currentTab, setCurrentTab] = useState("isCreditCard");
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const getShippingFee = useCallback(async () => {
    const fee = await shipping.map((item) => item.fee);
    setShippingFee(Number(fee.toString()));
  }, [shipping]);

  const getProducts = useCallback(async () => {
    const sum = await products.reduce(
      (currentTotal, obj) => currentTotal.price + obj.price
    );
    setTotalPrice(sum);
  }, [products]);

  useEffect(() => {
    getProducts();
    getShippingFee();
  }, [getProducts, getShippingFee]);

  const handleTabsChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setCurrentTab(value);
  };

  let paymentMethodContent = (
    <PaymentForm totalcheckout={totalPrice} shipping={shippingFee} />
  );

  if (currentTab === "isGiftCard") paymentMethodContent = "Gift Card";
  if (currentTab === "isPaypal") paymentMethodContent = "Paypal";

  return (
    <main className={classes.card}>
      <h2 className={classes.title}>Checkout</h2>

      <section>
        <h3>Products </h3>
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
        <h3>Shipping method </h3>
        <div className={classes.shipping}>
          <p className={classes.shipping_name}>{shipping[0].courier}</p>
          <p className={classes.shipping_fee}>${shipping[0].fee}</p>
        </div>
      </section>

      <section>
        <h3>Payment method </h3>
        <PaymentTabs onChange={handleTabsChange} value={currentTab}>
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
        </PaymentTabs>
        {paymentMethodContent}
      </section>
    </main>
  );
};

export default CheckoutList;
