import { Fragment } from "react";
import CheckoutList from "../components/checkout/CheckoutList";
import MainHeader from "../components/layout/MainHeader";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Apple® - iPad® with Retina® display Wi-Fi - 32GB - White",
    price: 499.0,
  },
  {
    id: 2,
    name: "16GB A Series Walkman Video MP3",
    price: 130.0,
  },
];

const DUMMY_SHIPPING = [
  {
    id: 1,
    courier: "FedEx",
    fee: 13.99,
  },
];

const CheckoutBilling = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <CheckoutList products={props.products} shipping={props.shipping} />
    </Fragment>
  );
};

export async function getStaticProps() {
  return {
    props: {
      products: DUMMY_PRODUCTS,
      shipping: DUMMY_SHIPPING,
    },
    revalidate: 1,
  };
}

export default CheckoutBilling;
