import React from "react";
import classes from "./TermsModal.module.css";
import { Modal, Box, Typography } from "@mui/material";

const TermsModal = ({ open, onClose }) => {
  const handleClose = () => onClose();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal_wrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Terms and Conditions
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, textAlign: "left" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
    </Modal>
  );
};

export default TermsModal;
