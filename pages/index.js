import { Fragment } from "react";
import CheckoutList from "../components/checkout/CheckoutList";
import MainHeader from "../components/layout/MainHeader";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Apple® - iPad® with Retina® display Wi-Fi - 32GB - White",
    price: "499.00",
  },
  {
    id: 2,
    name: "16GB A Series Walkman Video MP3",
    price: "130.00",
  },
];

const CheckoutBilling = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <CheckoutList products={props.products} />
    </Fragment>
  );
};

export async function getStaticProps() {
  return {
    props: {
      products: DUMMY_PRODUCTS,
    },
    revalidate: 1,
  };
}

export default CheckoutBilling;
