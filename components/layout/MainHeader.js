import classes from "./MainHeader.module.css";
import Image from "next/image";
import logo from "../../public/static/demo-store-logo.png";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Image src={logo} alt="Logo of Demo Store" width={30} height={30} />
      <h4 className={classes.title}>
        <span className={classes.title_bold}>DEMO</span>
        <span className={classes.title_light}>STORE</span>
      </h4>
    </header>
  );
};

export default MainHeader;
