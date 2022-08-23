import classes from "./MainHeader.module.css";
import Image from "next/image";
import logo from "../../public/static/demo-store-logo.png";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Image src={logo} alt="Logo of Demo Store" width={35} height={35} />
      <h3>
        <span>DEMO</span>STORE
      </h3>
    </header>
  );
};

export default MainHeader;
