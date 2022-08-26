import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import classes from "./CreditCardPaymentForm.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Button,
  Checkbox,
  FormHelperText,
  InputAdornment,
  TextField,
  InputLabel,
  Tooltip,
  Portal,
} from "@mui/material";
import CardIcon from "../../public/static/card-icon.png";
import InfoIcon from "../../public/static/info.png";
import TermsModal from "../terms-and-conditions/TermsModal";
import CVVTooltip from "./CVVTooltip";
import dateFormatToLocal from "../../utils/dateFormatToLocal";
import formatToNameCase from "../../utils/formatToNameCase";
import NumberFormat from "react-number-format";

// Main FC (Functional Component)
const CreditCardPaymentForm = (props) => {
  const divPortalTermsModalRef = useRef();
  // We can refactor this with useReducer or Redux or custom hooks

  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    // Get root Node Element and assign to the Portal
    divPortalTermsModalRef.current = document.querySelector("#terms-modal");
  }, []);

  const formatAndSetCardExpMonth = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length === 3) return;
    // Return if decimal pt is entered
    if (/[.]/.test(val)) return;
    // Return if it's not a number
    if (isNaN(valArray.join(""))) return;
    else {
      //Check and allow 0 or 00 as starting input then format
      if (/[0-9]|1[0-2]/.test(val)) setExpMonth(val);
      if (val === "") setExpMonth("");
    }
  };

  const formatAndSetCardExpYear = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length === 3) return;
    // Return if decimal pt is entered
    if (/[.]/.test(val)) return;
    // Return if it's not a number
    if (isNaN(valArray.join(""))) return;
    else {
      //Check and allow 0 or 00 as starting input then format
      if (/[0-9]|1[0-2]/.test(val)) setExpYear(val);
      if (val === "") setExpYear("");
    }
  };

  const restrictAndFormatCardHolder = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");
    const firstLetter = valArray[0];

    if (valArray.length >= 50) return;
    // Return if it contains numbers/special characters
    if (/[^a-zA-Z ]/.test(val)) return;
    else setCardHolder(formatToNameCase(val));
  };

  const formatAndSetCVV = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length >= 4) return;
    // Return if decimal pt is entered
    if (/[.]/.test(val)) return;
    // Return if it's not a number
    if (isNaN(valArray.join(""))) return;
    else setCardCVV(val);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Formik
      initialValues={{
        cardNum: "",
        cardExpMonth: "",
        cardExpYear: "",
        cardHolder: "",
        cardCVV: "",
        isTermsAccepted: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        cardNum: Yup.string()
          .test("test-card", "Credit Card number is invalid", (value) => {
            if (value !== undefined) {
              const arr = value.split(" ");
              const newString = arr.join("");
              if (newString.length === 16) {
                return true;
              }
            }
          })
          .required(),
        cardExpMonth: Yup.string()
          .test("test-month", "Month is required", (value) => {
            if (/0[1-9]|1[0-2]/.test(value)) {
              return true;
            } else {
              return false;
            }
          })
          .required(),
        cardExpYear: Yup.string()
          .test("test-year", "Year is required", (value) => {
            if (/^[0-9][0-9]$/.test(value)) {
              return true;
            }
          })
          .required(),
        cardHolder: Yup.string().max(50).required(),
        cardCVV: Yup.string().min(3).max(3).required(),
        isTermsAccepted: Yup.bool().oneOf(
          [true],
          "Accept Terms & Conditions is required"
        ),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          // Check if Terms and Conditions accepted. If not, throw error and don't proceed succeeding codes
          if (values.isTermsAccepted === false) {
            throw new Error(
              "Please indicate that you have read and agree to the Terms and Conditions"
            );
          }
          // Assign API CALL here (e.g. Payment Element to the Stripe API)
          // Storing credit card information to the database is not advisable.
          // This is just an example of getting payload
          console.log({
            cardNum: values.cardNum.trim(),
            cardExpMonth: values.cardExpMonth.trim(),
            cardExpYear: values.cardExpYear.trim(),
            cardExpiration: dateFormatToLocal(
              values.cardExpMonth,
              values.cardExpYear
            ),
            cardHolder: values.cardHolder.trim(),
            cardCVV: values.cardCVV.trim(),
            isTermsAndConditionsAccepted: values.isTermsAccepted,
            totalPrice: props.totalcheckout + props.shipping,
          });

          setExpMonth("");
          setExpYear("");
          setCardHolder("");
          setCardCVV("");
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          console.error(err);
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
          <section
            className={classes.creditCardInformation}
            aria-label="Credit Card Information"
          >
            <div className={classes["creditCardInformation_column--bordered"]}>
              <div className={classes["creditCardInformation_control"]}>
                <InputLabel
                  htmlFor="cardNum"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  Card number
                </InputLabel>
                <NumberFormat
                  aria-describedby="Card Number"
                  id="cardNum"
                  name="cardNum"
                  autoComplete="off"
                  error={Boolean(touched.cardNum && errors.cardNum)}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={values.cardNum}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Image
                          src={CardIcon}
                          alt="Logo of Demo Store"
                          width={56}
                          height={35}
                        />
                      </InputAdornment>
                    ),
                    classes: {
                      adornedEnd: classes.endAdornment,
                    },
                  }}
                  variant="outlined"
                  size="small"
                  type="text"
                  fullWidth
                  format="#### #### #### ####"
                  customInput={TextField}
                />
                {touched.cardNum && errors.cardNum && (
                  <FormHelperText id="cardNum" className={classes.errorCardNum}>
                    Card number is required
                  </FormHelperText>
                )}
              </div>

              <div className={classes["creditCardInformation_control"]}>
                <InputLabel
                  htmlFor="cardExpMonth"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  {"Valid thru (mm/yy)"}
                </InputLabel>
                <div className={classes.control_children}>
                  <TextField
                    aria-describedby="Card Expiration"
                    id="cardExpMonth"
                    name="cardExpMonth"
                    autoComplete="off"
                    error={Boolean(touched.cardExpMonth && errors.cardExpMonth)}
                    // onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      formatAndSetCardExpMonth(e);
                    }}
                    value={(values.cardExpMonth = expMonth)}
                    inputProps={{ maxLength: 2 }}
                    sx={{ width: "43px" }}
                    variant="outlined"
                    size="small"
                    type="text"
                  />
                  {touched.cardExpMonth &&
                    errors.cardExpMonth &&
                    !errors.cardExpYear && (
                      <FormHelperText
                        id="cardExpMonth"
                        className={classes.errorCardExp}
                      >
                        {"Month/Year is required with correct format/range"}
                      </FormHelperText>
                    )}
                  <span className={classes.control_divider}>/</span>
                  <TextField
                    aria-describedby="Card Expiration"
                    name="cardExpYear"
                    autoComplete="off"
                    error={Boolean(touched.cardExpYear && errors.cardExpYear)}
                    // onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      formatAndSetCardExpYear(e);
                    }}
                    inputProps={{ maxLength: 2 }}
                    value={(values.cardExpYear = expYear)}
                    type="text"
                    variant="outlined"
                    size="small"
                    sx={{ width: "43px" }}
                    id="cardExpYear"
                  />
                  {touched.cardExpYear &&
                    errors.cardExpYear &&
                    !errors.cardExpMonth && (
                      <FormHelperText
                        id="cardExpYear"
                        className={classes.errorCardExp}
                      >
                        {"Month/Year is required with correct format/range"}
                      </FormHelperText>
                    )}
                  {touched.cardExpMonth &&
                    touched.cardExpYear &&
                    errors.cardExpYear &&
                    errors.cardExpMonth && (
                      <FormHelperText
                        id="cardExpYear"
                        className={classes.errorCardExp}
                      >
                        {"Month & Year is required with correct format/range"}
                      </FormHelperText>
                    )}
                </div>
              </div>

              <div className={classes["creditCardInformation_control"]}>
                <InputLabel
                  htmlFor="cardHolder"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  {"Cardholder's name"}
                </InputLabel>
                <TextField
                  aria-describedby="Cardholder's Name"
                  id="cardHolder"
                  name="cardHolder"
                  autoComplete="off"
                  error={Boolean(touched.cardHolder && errors.cardHolder)}
                  // onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    restrictAndFormatCardHolder(e);
                  }}
                  value={(values.cardHolder = cardHolder)}
                  inputProps={{ maxLength: 50 }}
                  variant="outlined"
                  size="small"
                  type="text"
                  fullWidth
                />
                {touched.cardHolder && errors.cardHolder && (
                  <FormHelperText
                    id="cardExpYear"
                    className={classes.errorCardHolder}
                  >
                    {"Cardholder's name is required"}
                  </FormHelperText>
                )}
              </div>
            </div>

            <div className={classes.column}>
              <div className={classes["creditCardInformation_control"]}>
                <InputLabel
                  htmlFor="cardCVV"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  CVV/CVC
                </InputLabel>
                <TextField
                  aria-describedby="Card CVV/CVC"
                  id="cardCVV"
                  name="cardCVV"
                  autoComplete="off"
                  error={Boolean(touched.cardCVV && errors.cardCVV)}
                  // onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    formatAndSetCVV(e);
                  }}
                  value={(values.cardCVV = cardCVV)}
                  InputProps={{
                    endAdornment: (
                      <Tooltip
                        classes={{ tooltip: classes.customTooltip }}
                        title={<CVVTooltip />}
                        arrow
                      >
                        <InputAdornment position="end">
                          <Image
                            src={InfoIcon}
                            alt="cardCVV"
                            width={34}
                            height={33}
                          />
                        </InputAdornment>
                      </Tooltip>
                    ),
                    classes: {
                      adornedEnd: classes.endAdornment,
                    },
                  }}
                  inputProps={{ maxLength: 3 }}
                  sx={{ width: "87px" }}
                  variant="outlined"
                  size="small"
                  type="text"
                />
              </div>
              {touched.cardCVV && errors.cardCVV && (
                <FormHelperText
                  id="cardExpYear"
                  className={classes.errorCardCVV}
                >
                  CVV/CVC is required and minimum of 3 digits
                </FormHelperText>
              )}
            </div>
          </section>

          <section
            className={classes.termsAndConditions}
            aria-label="Terms and Conditions Acceptance"
          >
            <div
              className={
                classes[
                  `${
                    touched.isTermsAccepted && errors.isTermsAccepted
                      ? "termsAndConditions_wrapper--error"
                      : "termsAndConditions_wrapper"
                  }`
                ]
              }
            >
              <Checkbox
                name="isTermsAccepted"
                className={
                  values.isTermsAccepted
                    ? classes["termsAndConditions_checkbox--checked"]
                    : classes["termsAndConditions_checkbox"]
                }
                inputProps={{ "aria-label": "controlled" }}
                size="small"
                checked={values.isTermsAccepted === true ? true : false}
                // onClick={() => (touched.isTermsAccepted = true)}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("isTermsAccepted", !values.isTermsAccepted);
                }}
              />{" "}
              I accept the{" "}
              <span
                className={classes["termsAndConditions_checkbox--underlined"]}
                onClick={() => setIsOpenModal(true)}
              >
                Terms and Conditions
              </span>
            </div>
            {touched.isTermsAccepted && errors.isTermsAccepted && (
              <FormHelperText
                id="isTermsAccepted"
                className={classes["termsAndConditions_helperText--error"]}
              >
                Please indicate that you have read and agree to the Terms and
                Conditions
              </FormHelperText>
            )}
          </section>
          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}

          {isOpenModal && (
            <Portal container={divPortalTermsModalRef.current}>
              <TermsModal onClose={handleCloseModal} show={isOpenModal} />
            </Portal>
          )}

          <section className={classes.actions} aria-label="Place Order">
            <Button
              disabled={isSubmitting}
              variant="contained"
              type="submit"
              fullWidth
            >
              {`Place order ( $${
                props.totalcheckout === undefined
                  ? 0
                  : props.totalcheckout + props.shipping
              } )`}
            </Button>
          </section>
        </form>
      )}
    </Formik>
  );
};

export default CreditCardPaymentForm;
