import React, { useState } from "react";
import classes from "./NewPaymentForm.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  TextField,
  InputLabel,
} from "@mui/material";
import Image from "next/image";
import CardIcon from "../../public/static/card-icon.png";

const NewPaymentForm = (props) => {
  const [ccNumber, setCcNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

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

  const formatAndSetCardExp = (e, type) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length === 3) return;
    if (isNaN(valArray.join(""))) {
      return;
    } else {
      if (type === "month") setExpMonth(val);
      if (type === "year") setExpYear(val);
    }
  };

  return (
    <Formik
      initialValues={{
        cardNum: "",
        cardExpMonth: "",
        cardExpYear: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        cardNum: Yup.number().required("Card Number is required"),
        cardExpMonth: Yup.number().max(31).required(),
        cardExpYear: Yup.number().max(99).required(),
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
        <form
          noValidate
          onSubmit={handleSubmit}
          {...props}
          className={classes.formControl}
        >
          <section className={classes.formGroup}>
            <div className={classes.column__bordered}>
              <div className={classes.control}>
                <InputLabel htmlFor="component-simple">Card number*</InputLabel>
                <TextField
                  name="cardNum"
                  autoComplete="off"
                  fullWidth
                  error={Boolean(touched.cardNum && errors.cardNum)}
                  helperText={touched.cardNum && errors.cardNum}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Image
                          src={CardIcon}
                          alt="Logo of Demo Store"
                          width={51}
                          height={30}
                        />
                      </InputAdornment>
                    ),
                    classes: {
                      adornedEnd: classes.endAdornment,
                    },
                  }}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    formatAndSetCcNumber(e);
                  }}
                  value={(values.cardNum = ccNumber)}
                  type="text"
                  variant="outlined"
                  size="small"
                />
              </div>

              <div className={classes.control}>
                <InputLabel htmlFor="card-expiration">
                  {"Valid thru (mm/yy)"}*
                </InputLabel>
                <div className={classes.control_children}>
                  <TextField
                    name="cardExpMonth"
                    autoComplete="off"
                    error={Boolean(touched.cardExpMonth && errors.cardExpMonth)}
                    // helperText={touched.cardExpMonth && errors.cardExpMonth}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      formatAndSetCardExp(e, "month");
                    }}
                    value={(values.cardExpMonth = expMonth)}
                    type="text"
                    variant="outlined"
                    size="small"
                    sx={{ width: "50px" }}
                    aria-describedby="cardExpMonth"
                    id="cardExpMonth"
                  />
                  {errors.cardExpMonth && (
                    <FormHelperText
                      id="cardExpMonth"
                      className={classes.errorCardExp}
                    >
                      Month/Year is required
                    </FormHelperText>
                  )}
                  <span>/</span>
                  <TextField
                    name="cardExpYear"
                    autoComplete="off"
                    error={Boolean(touched.cardExpYear && errors.cardExpYear)}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      formatAndSetCardExp(e, "year");
                    }}
                    value={(values.cardExpYear = expYear)}
                    type="text"
                    variant="outlined"
                    size="small"
                    sx={{ width: "50px" }}
                  />
                </div>
              </div>
            </div>
          </section>
          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}

          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="I accept the Terms and Conditions"
            />
          </FormGroup>

          <section>
            <Button
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Place Order
            </Button>
          </section>
        </form>
      )}
    </Formik>
  );
};

export default NewPaymentForm;
