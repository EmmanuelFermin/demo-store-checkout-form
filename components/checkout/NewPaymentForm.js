import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import Image from "next/image";
import CardIcon from "../../public/static/card-icon.png";

const NewPaymentForm = (props) => {
  const [ccNumber, setCcNumber] = useState("");

  const formatAndSetCcNumber = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");
    let valSpace = val.split("");

    // to work with backspace
    if (valSpace[valSpace.length - 1] == " ") {
      let valSpaceN = valSpace.slice(0, -2);
      val = valSpaceN.join("");
      setCcNumber(val);
      return;
    }

    if (isNaN(valArray.join(""))) return;
    if (valArray.length === 17) return;
    if (valArray.length % 4 === 0 && valArray.length <= 15) {
      setCcNumber(val + " ");
    } else {
      setCcNumber(val);
    }
  };

  return (
    <Formik
      initialValues={{
        cardNum: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        cardNum: Yup.number()
          // .test("len", "Must be exactly 16 characters", (val) => {
          //   if (val) return val.toString().length === 16;
          // })
          .required("Card Number is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // await login(values.email, values.password);
          // if (mounted.current) {
          //   setStatus({ success: true });
          //   setSubmitting(false);
          // }
        } catch (err) {
          // if (err.response.status === 422) {
          //   err.message = "Invalid credentials";
          // }
          console.error("Login JWT Error ", err.message);
          console.error(err);
          // if (mounted.current) {
          //   setStatus({ success: false });
          //   setErrors({ submit: err.message });
          //   setSubmitting(false);
          // }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...props}>
          <h3>Card Number</h3>
          <TextField
            autoComplete="off"
            error={Boolean(touched.cardNum && errors.cardNum)}
            fullWidth
            helperText={touched.cardNum && errors.cardNum}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{ pl: "18px", pr: "16px" }}
                  position="start"
                >
                  <Image
                    src={CardIcon}
                    alt="Logo of Demo Store"
                    // width={30}
                    // height={30}
                  />
                </InputAdornment>
              ),
            }}
            margin="normal"
            name="cardNum"
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e);
              formatAndSetCcNumber(e);
            }}
            type="text"
            value={(values.cardNum = ccNumber)}
            variant="outlined"
            size="small"
          />
          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}
          <Box>
            <Button
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Place Order
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default NewPaymentForm;
