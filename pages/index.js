import { Fragment } from "react";
import Head from "next/head";
import Header from "../components/layout/Header";
import CheckoutBilling from "../components/checkout/CheckoutBilling";

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

const Home = (props) => {
  const { products, shipping } = props;

  return (
    <Fragment>
      <Head>
        <title>Demo Store</title>
      </Head>
      <Header />
      <CheckoutBilling products={products} shipping={shipping} />
    </Fragment>
  );
};

//Hydrate page with DUMMY DATA and regenerate every 1 second
export async function getStaticProps() {
  return {
    props: {
      products: DUMMY_PRODUCTS,
      shipping: DUMMY_SHIPPING,
    },
    revalidate: 1,
  };
}

export default Home;
