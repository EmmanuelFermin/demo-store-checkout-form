import React, { useEffect } from "react";
import classes from "./TermsModal.module.css";
import { Box, Typography } from "@mui/material";

const TermsModal = (props) => {
  return (
    <div className={classes.modal_backdrop} onClick={props.onClose}>
      <Box className={classes.modal_wrapper} onClick={props.onClose}>
        <Typography variant="h6" component="h2">
          Terms and Conditions{" "}
        </Typography>
        <Typography sx={{ mt: 2, textAlign: "left" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </Typography>
      </Box>
    </div>
  );
};

export default TermsModal;
