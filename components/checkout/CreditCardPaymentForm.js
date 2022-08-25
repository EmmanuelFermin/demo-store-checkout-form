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
// import Portal from "../../HOC/Portal";

// Main FC (Functional Component)
const CreditCardPaymentForm = (props) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = document.querySelector("#terms-modal");
    // setMounted(true)
  }, []);
  console.log(ref.current);
  const [ccNumber, setCcNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const formatAndSetCcNumber = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");
    let valSpace = val.split("");

    // To work with backspace
    if (valSpace[valSpace.length - 1] == " ") {
      let valSpaceN = valSpace.slice(0, -2);
      val = valSpaceN.join("");
      setCcNumber(val);
      return;
    }

    if (isNaN(valArray.join(""))) return;
    if (valArray.length === 17) return;
    if (valArray.length % 4 === 0 && valArray.length <= 15)
      setCcNumber(val + " ");
    else setCcNumber(val);
  };

  const formatAndSetCardExpMonth = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length === 3) return;
    if (isNaN(valArray.join(""))) return;
    else {
      if (/[0-9]|1[0-2]/.test(val)) setExpMonth(val);
      if (val === "") setExpMonth("");
    }
  };

  const formatAndSetCardExpYear = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length === 3) return;
    if (isNaN(valArray.join(""))) return;
    else setExpYear(val);
  };

  const restrictAndFormatCardHolder = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length >= 50) return;
    if (/[^a-zA-Z ]/.test(val)) return;
    else setCardHolder(val);
  };

  const formatAndSetCVV = (e) => {
    let val = e.target.value;
    const valArray = val.split(" ").join("").split("");

    if (valArray.length >= 4) return;
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
        cardNum: Yup.number().required(),
        cardExpMonth: Yup.number().min(1).max(12).required(),
        cardExpYear: Yup.number().min(1).max(99).required(),
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
          if (values.isTermsAccepted === false) {
            console.log(
              "Please indicate that you have read and agree to the Terms and Conditions"
            );
            throw new Error(
              "Please indicate that you have read and agree to the Terms and Conditions"
            );
            return;
          }
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

          setCcNumber("");
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
          <section className={classes.formGroup}>
            <div className={classes.column__bordered}>
              <div className={classes.control}>
                <InputLabel
                  htmlFor="cardNum"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  Card number
                </InputLabel>
                <TextField
                  id="cardNum"
                  name="cardNum"
                  autoComplete="off"
                  fullWidth
                  error={Boolean(touched.cardNum && errors.cardNum)}
                  // helperText={touched.cardNum && errors.cardNum}
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
                {touched.cardNum && errors.cardNum && (
                  <FormHelperText id="cardNum" className={classes.errorCardNum}>
                    Card number is required
                  </FormHelperText>
                )}
              </div>

              <div className={classes.control}>
                <InputLabel
                  htmlFor="cardExpMonth"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  {"Valid thru (mm/yy)"}
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
                      formatAndSetCardExpMonth(e);
                    }}
                    value={(values.cardExpMonth = expMonth)}
                    type="text"
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 2 }}
                    sx={{ width: "43px" }}
                    aria-describedby="cardExpMonth"
                    id="cardExpMonth"
                  />
                  {touched.cardExpMonth &&
                    errors.cardExpMonth &&
                    !errors.cardExpYear && (
                      <FormHelperText
                        id="cardExpMonth"
                        className={classes.errorCardExp}
                      >
                        {
                          "Month/Year is required with correct format/rangeMONTH"
                        }
                      </FormHelperText>
                    )}
                  <span className={classes.control_divider}>/</span>
                  <TextField
                    name="cardExpYear"
                    autoComplete="off"
                    error={Boolean(touched.cardExpYear && errors.cardExpYear)}
                    // helperText={touched.cardExpYear && errors.cardExpYear}
                    onBlur={handleBlur}
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
                        {"Month/Year is required with correct format/rangeYEAR"}
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

              <div className={classes.control}>
                <InputLabel
                  htmlFor="cardHolder"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  {"Cardholder's name"}
                </InputLabel>
                <TextField
                  id="cardHolder"
                  name="cardHolder"
                  autoComplete="off"
                  fullWidth
                  error={Boolean(touched.cardHolder && errors.cardHolder)}
                  // helperText={touched.cardHolder && errors.cardHolder}
                  inputProps={{ maxLength: 50 }}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    restrictAndFormatCardHolder(e);
                  }}
                  value={(values.cardHolder = cardHolder)}
                  type="text"
                  variant="outlined"
                  size="small"
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
              <div className={classes.control}>
                <InputLabel
                  htmlFor="cardCVV"
                  classes={{ asterisk: classes.asterisk }}
                  required
                >
                  CVV/CVC
                </InputLabel>
                <TextField
                  id="cardCVV"
                  name="cardCVV"
                  autoComplete="off"
                  error={Boolean(touched.cardCVV && errors.cardCVV)}
                  // helperText={touched.cardCVV && errors.cardCVV}
                  inputProps={{ maxLength: 3 }}
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
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    formatAndSetCVV(e);
                  }}
                  value={(values.cardCVV = cardCVV)}
                  type="text"
                  variant="outlined"
                  size="small"
                  sx={{ width: "87px" }}
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

          <section className={classes.termsAndConditions}>
            <div
              className={
                classes[
                  `${
                    touched.isTermsAccepted && errors.isTermsAccepted
                      ? "termsAndConditions_content--error"
                      : "termsAndConditions_content"
                  }`
                ]
              }
            >
              <Checkbox
                onClick={() => (touched.isTermsAccepted = true)}
                onBlur={handleBlur}
                checked={values.isTermsAccepted === true ? true : false}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("isTermsAccepted", !values.isTermsAccepted);
                }}
                inputProps={{ "aria-label": "controlled" }}
                className={classes.termsAndConditions_checkbox}
                size="small"
                name="isTermsAccepted"
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
                className={classes.errorIsTermsAccepted}
              >
                Please indicate that you have read and agree to the Terms and
                Conditions
              </FormHelperText>
            )}
          </section>
          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}

          {isOpenModal === true && (
            <Portal container={ref.current}>
              {console.log(isOpenModal)}
              {/* <TermsModal open={isOpenModal} onClose={handleCloseModal} />*/}
              <TermsModal title="My Modal" onClose={handleCloseModal} show={isOpenModal} />
            </Portal>
          )}

          <section className={classes.actions}>
            <Button
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
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
