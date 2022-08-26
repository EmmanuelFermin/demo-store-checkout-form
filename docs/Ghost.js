// These are the things that might take time when you want to build your own logic just to format
// the behavior of a credit card number and its caret position logic

// Since 0 is also an integer, we have to check it
// console.log("INNER TEST NUM ARRAY", cardNum0Validator);
// console.log("Is 16 digits all zero", is16DigitsAllZero);

// if (is16DigitsAllZero || is16DigitsSomeNotZero) {
//   return true;
// }

// Detects and Validates 16 digits with spaces or dashes
// /\b(?:[ -]*?)\d{13,16}\b/.test(value)

// const findCaretPosition = (e) => {
//   var e = window.event || e;
//   var key = e.keyCode;
//   console.log("Current Key ", key);
//   console.log("Caret Position ", e.target.selectionStart);
//   console.log("Length ", cardNum0Validator);
//   if (e.target.selectionStart % 5 === 0) {
//     console.log("Position is in space");

//     if (key == 8 && cardNum0Validator.length === 16) {
//       // Backspace
//       e.preventDefault();
//     }
//   }
// };

// const disableSpacebarInCardNumField = () => {
//   var e = window.event || e;
//   var key = e.keyCode;
//   //space pressed
//   if (key == 32) {
//     //space
//     e.preventDefault();
//   }
// };
// const [ccNumber, setCcNumber] = useState("");
// const [cardNum0Validator, setCardNum0Validator] = useState(["0"]);
// const [is16DigitsAllZero, setIs16DigitsAllZero] = useState(false);
// const [is16DigitsSomeNotZero, setIs16DigitsSomeNotZero] = useState(false);
// I WAS ABOUT TO MAKE MY OWN LOGIC FOR THIS BUT THIS WOULD TAKE A WHILE

// const formatAndSetCcNumber = (e) => {
// let val = e.target.value;
// const valArray = val.split(" ").join("").split("");
// console.log("Val ", val);
// console.log("Val Array ", valArray);
// console.log("Val Space", valSpace);
// console.log("Val at the end ", val.charAt(1));

// let valSpace = val.split("");

// Put each digit into array
// setCardNum0Validator(valArray);

// console.log("INNER CC FORMAT ", cardNum0Validator);

// To work with backspace
// if (valSpace[valSpace.length - 1] == " ") {
//   let valSpaceN = valSpace.slice(0, -1);
//   val = valSpaceN.join("");
//   setCcNumber(val.trim());
//   return;
// }

// if (isNaN(valArray.join(""))) return;
// if (valArray.length === 17) return;
// if (/[.]/.test(val)) return;

// if (
//   valArray.length % 4 === 0 &&
//   valArray.length >= 1 &&
//   valArray.length < 16
// )
//   setCcNumber(val + " ");
// else
//   setCcNumber(
//     val
//       .replace(/\s/g, "")
//       .replace(/(\d{4})/g, "$1 ")
//       .replace(/ $/g, "")
//   );
// }

// useEffect(() => {
//   if (cardNum0Validator.length > 15) {
//     console.log("FORM VALIDATION TRIGGERED");
//     formikRef.current.submitForm();
//   }
//   // console.log("FORM REF", formikRef.current);
// }, [cardNum0Validator]);

// useEffect(() => {
//   //Since 0000 0000 0000 0000 is equal to 0 (1 digit)
//   // Store digits and allow zeroes
//   console.log("ARRAY IN USE EFFECT", cardNum0Validator);
//   if (cardNum0Validator.length >= 16) {
//     const allZero = cardNum0Validator.every((el) => Number(el) === 0);
//     const someNotZero = cardNum0Validator.some((el) => Number(el) !== 0);
//     setIs16DigitsAllZero(allZero);
//     setIs16DigitsSomeNotZero(someNotZero);
//   }

//   return () => {
//     setIs16DigitsAllZero(false);
//     setIs16DigitsSomeNotZero(false);
//   };
// }, [cardNum0Validator]);

// onBlur={handleBlur}
// onKeyUp={findCaretPosition}
// onKeyDown={disableSpacebarInCardNumField}
