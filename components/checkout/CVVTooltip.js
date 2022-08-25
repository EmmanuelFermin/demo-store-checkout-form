import React from "react";
import Image from "next/image";
import CVVDisplay from "../../public/static/cvv-location.png";

const CVVTooltip = () => {
  return (
    <React.Fragment>
      <Image
        src={CVVDisplay}
        alt="CVV/CVC Location"
        // width={500}
        // height={500}
      />
    </React.Fragment>
  );
};

export default CVVTooltip;
