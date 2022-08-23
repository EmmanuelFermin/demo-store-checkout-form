import Link from "next/link";
import classes from "./CheckoutItem.module.css";

const CheckoutItem = (props) => {
  return (
    <li className={classes.item}>
      <Link href={`/${props.name}`}>
        <a className={classes.item_name}>{props.name}</a>
      </Link>
      <div className={classes.item_price}>${props.price}</div>
    </li>
  );
};

export default CheckoutItem;
