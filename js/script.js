////////  "Basic Info" Section ////////
const nameInput = document.getElementById(`name`);
const jobRoleMenu = document.getElementById(`title`);
const otherJobRole = document.getElementById(`other-job-role`);

nameInput.focus();

otherJobRole.style.display = `none`;

// Displays the "Other Job Role" field only when the user selects the "Other" option in the "Job Role" menu.
// If the user selects another option, after having selected the "Other" option,
  // the "Other job role" field is hidden from view once again.
jobRoleMenu.addEventListener(`change`, (e)=>{
  const selectedJob = e.target.value;
  if (selectedJob === `other`){
    otherJobRole.style.display = `block`;
  } else {
    otherJobRole.style.display = `none`;
  }
});

//////// "T-Shirt Info" section ////////
const shirtDesign = document.getElementById(`design`);
const shirtColor = document.getElementById(`color`);

shirtColor.disabled = true;

// Enables the "Color" menu once a theme is selected. 
// The color options are displayed/hidden based on which theme the user has selected.
shirtDesign.addEventListener(`change`, (e)=> {
  const selectedTheme = e.target.value;
  shirtColor.disabled = false;
  for (let i=0; i<shirtColor.children.length; i++){
    const colorOption = shirtColor.children[i];
    const dataTheme = colorOption.getAttribute(`data-theme`);
    if (dataTheme === selectedTheme) {
      colorOption.style.display = `block`;
    } else {
      colorOption.style.display = `none`;
    }
  }
});

//////// "Register for Activities" section ////////
const activities  = document.getElementById(`activities`);
let totalCost = 0;

// Updates the total cost text as the user checks and unchecks activities.
activities.addEventListener(`change`, (e)=> {
  const dataCost = +e.target.getAttribute(`data-cost`);
  let activitiesCost = document.getElementById(`activities-cost`);
  if (e.target.checked){
    totalCost += dataCost;
  } else {
    totalCost -= dataCost;
  }
  activitiesCost.textContent = `Total: $${totalCost}`;
});

//////// "Payment Info" section ////////
const payment = document.getElementById(`payment`);
const creditCard = document.getElementById(`credit-card`);
const paypal = document.getElementById(`paypal`);
const bitcoin = document.getElementById(`bitcoin`);

payment.children[1].setAttribute(`selected`, `selected`);
paypal.style.display = `none`;
bitcoin.style.display = `none`;

// Displays only the corresponding div that matches the payment type the user selects.
payment.addEventListener(`change`, (e)=> {
  creditCard.style.display = `none`;
  paypal.style.display = `none`;
  bitcoin.style.display = `none`;
  const selectedPayment = document.getElementById(e.target.value);
  selectedPayment.style.display = `block`;
});

