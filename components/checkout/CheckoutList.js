import classes from "./CheckoutList.module.css";
import { useState } from "react";
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

const CheckoutList = (props) => {
  const [currentTab, setCurrentTab] = useState("isCreditCard");
  const [filters, setFilters] = useState({
    isCreditCard: true,
    isGiftCard: null,
    isPaypal: null,
  });
  console.log(filters);

  const handleTabsChange = (event) => {
    const { value } = event.target;
    const updatedFilters = {
      ...filters,
      isCreditCard: null,
      isGiftCard: null,
      isPaypal: null,
    };

    updatedFilters[value] = true;

    console.log(value);
    setFilters(updatedFilters);

    setCurrentTab(value);
  };

  let paymentMethodContent = <PaymentForm />;

  if (currentTab === "isGiftCard") paymentMethodContent = "Gift Card";
  if (currentTab === "isPaypal") paymentMethodContent = "Paypal";

  return (
    <main className={classes.card}>
      <h1 className={classes.title}>Checkout</h1>

      <section>
        <h3>Products </h3>
        <ul className={classes.list}>
          {props.products.map((product) => (
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
          <p className={classes.shipping_name}>FedEx</p>
          <p className={classes.shipping_fee}>${13.99}</p>
        </div>
      </section>

      <section>
        <h3>Payment method </h3>
        <PaymentTabs onChange={handleTabsChange} value={currentTab}>
          {console.log(currentTab)}
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
