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
const activitiesCheckboxes = document.querySelectorAll(`#activities input[type="checkbox"]`);
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


for (let i=0; i<activitiesCheckboxes.length; i++){
  activitiesCheckboxes[i].addEventListener(`focus`, ()=> {
    activitiesCheckboxes[i].parentElement.classList.add(`focus`);
  });
  activitiesCheckboxes[i].addEventListener(`blur`, ()=> {
    activitiesCheckboxes[i].parentElement.classList.remove(`focus`);
  });
}



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

//////// Form Validation ////////
// const nameInput = document.getElementById(`name`);  -- (DECLARED ABOVE)
const email = document.getElementById(`email`);
// const activities  = document.getElementById(`activities`); -- (DECLARED ABOVE)
const cardNumber = document.getElementById(`cc-num`);
const zipCode = document.getElementById(`zip`);
const cvv = document.getElementById(`cvv`);

const form = document.querySelector(`form`);

function validate(validationVariable) {
  if (validationVariable === false) {
    e.preventDefault();
    return validationVariable;
  }
}

function ccValidate(ccValidationVariable) {
  if (creditCard.style.display === `block`) {
    if (ccValidationVariable === false) {
      e.preventDefault();
      return ccValidationVariable;
    }
  }
}

form.addEventListener(`submit`, (e)=> {
  const nameInputValue = nameInput.value;
  const nameRegex = /^.+$/.test(nameInputValue);

  const emailValue = email.value;
  const emailRegex = /^\w+@\w+\.\w+$/.test(emailValue);

  let activitiesValue = activities.setAttribute(`value`, `false`);
  for (let i=0; i<activitiesCheckboxes.length; i++){
    if (activitiesCheckboxes[i].checked) {
      activitiesValue = activities.value = true;
      break;
    } else {
      activitiesValue = activities.value = false;
    }
  }

  const cardNumberValue = cardNumber.value;
  const cardNumberRegex = /^\d{13,16}$/.test(cardNumberValue);

  const zipCodeValue = zipCode.value;
  const zipCodeRegex = /^\d{5}$/.test(zipCodeValue);

  const cvvValue = cvv.value;
  const cvvRegex = /^\d{3}$/.test(cvvValue);

  validate(nameRegex);
  validate(emailRegex);
  validate(activitiesValue);

  ccValidate(cardNumberRegex);
  ccValidate(zipCodeRegex);
  ccValidate(cvvRegex);
});

