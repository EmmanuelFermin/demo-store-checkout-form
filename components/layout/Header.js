import classes from "./Header.module.css";
import Image from "next/image";
import logo from "../../public/static/demo-store-logo.png";

const Header = () => {
  return (
    <header className={classes.header}>
      <Image src={logo} alt="Logo of Demo Store" width={30} height={30} />
      <h4 className={classes.header_title}>
        <span className={classes["header_title--bold"]}>DEMO</span>
        <span className={classes["header_title--light"]}>STORE</span>
      </h4>
    </header>
  );
};

export default Header;
