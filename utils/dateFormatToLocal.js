const currentYYandMMToLocalDate = (month, year) => {
  const d = new Date();
  let currYear = d.getFullYear();
  let yy = currYear.toString().substring(0, 2);

  const newDateToISO = new Date(`${yy + year}`, `${month - 1}`);
  return newDateToISO.toString();
};

export default currentYYandMMToLocalDate;