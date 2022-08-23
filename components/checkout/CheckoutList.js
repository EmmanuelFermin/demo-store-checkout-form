import classes from "./CheckoutList.module.css";
import CheckoutItem from "./CheckoutItem";

const CheckoutList = (props) => {
  return (
    <section className={classes.card}>
      <h2 className={classes.title}>Checkout</h2>
      <h4 className={classes.products}>Products </h4>
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

      <h4 className={classes.shipping}>Shipping method </h4>
       <div className={classes.shipping}>
        <p className={classes.shipping_courier}>FedEx</p>
        <p className={classes.shipping_fee}>${13.99}</p>
       </div>
      <h4 className={classes.payment}>Payment method </h4>
    </section>
  );
};

export default CheckoutList;
