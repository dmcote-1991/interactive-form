const nameInput = document.getElementById(`name`);
const jobRoleMenu = document.getElementById(`title`);
const otherJobRole = document.getElementById(`other-job-role`);
const shirtDesign = document.getElementById(`design`);
const shirtColor = document.getElementById(`color`);
const activities  = document.getElementById(`activities-box`);
const activitiesCheckboxes = document.querySelectorAll(`#activities input[type="checkbox"]`);
const payment = document.getElementById(`payment`);
const creditCard = document.getElementById(`credit-card`);
const paypal = document.getElementById(`paypal`);
const bitcoin = document.getElementById(`bitcoin`);
const form = document.querySelector(`form`)
const email = document.getElementById(`email`);
const cardNumber = document.getElementById(`cc-num`);
const zipCode = document.getElementById(`zip`);
const cvv = document.getElementById(`cvv`);
const nameHint = document.getElementById(`name-hint`);
const emailHint = document.getElementById(`email-hint`);
const activitiesHint = document.getElementById(`activities-hint`);
const ccHint = document.getElementById(`cc-hint`);
const zipHint = document.getElementById(`zip-hint`);
const cvvHint = document.getElementById(`cvv-hint`);

let totalCost = 0;

//////// "Basic Info" and "T-shirt Info" sections ////////
nameInput.focus();
otherJobRole.style.display = `none`;
shirtColor.disabled = true;

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

function resetColorSelection() {
  const defaultOption = shirtColor.querySelector(`option[selected]`);
  defaultOption.textContent = `Select a color`;
  shirtColor.value = defaultOption.value;
}
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
  resetColorSelection();
});

//////// "Register for Activities" section ////////
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

  // Prevents users from selecting activities that occur at the same time
  const selectedActivity = e.target;
  const selectedDateTime = selectedActivity.getAttribute('data-day-and-time');
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    if (activitiesCheckboxes[i] !== selectedActivity) {
      const dateTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
      if (dateTime === selectedDateTime) {
        if (selectedActivity.checked) {
          activitiesCheckboxes[i].disabled = true;
          activitiesCheckboxes[i].parentElement.classList.add('disabled');
        } else {
          activitiesCheckboxes[i].disabled = false;
          activitiesCheckboxes[i].parentElement.classList.remove('disabled');
        }
      }
    }
  }
});

// Puts the "focus" class on the current activity in focus.
for (let i=0; i<activitiesCheckboxes.length; i++){
  activitiesCheckboxes[i].addEventListener(`focus`, ()=> {
    activitiesCheckboxes[i].parentElement.classList.add(`focus`);
  });
  activitiesCheckboxes[i].addEventListener(`blur`, ()=> {
    activitiesCheckboxes[i].parentElement.classList.remove(`focus`);
  });
}

//////// "Payment Info" section ////////
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
function validateName() {
  return /^(?!\s)[a-z\s]+$/i.test(nameInput.value);
}
function validateEmail() {
  return /^\w+@\w+\.\w+$/.test(email.value);
}
function validateActivities() {
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    if (activitiesCheckboxes[i].checked) {
      return true;
    }
  }
  return false;
}
function validateCardNumber() {
  const cardNumberRegex = /^\d{13,16}$/.test(cardNumber.value);
  return cardNumberRegex;
}
function validateZipCode() {
  const zipCodeRegex = /^\d{5}$/.test(zipCode.value);
  return zipCodeRegex;
}
function validateCvv() {
  const cvvRegex = /^\d{3}$/.test(cvv.value);
  return cvvRegex;
}

// Provides conditional validation styles
function validator(inputElement, validationFunction){
  if (!validationFunction()) {
    inputElement.parentElement.classList.add(`not-valid`);
    inputElement.parentElement.classList.remove(`valid`);
    inputElement.parentElement.lastElementChild.style.display = `block`;
} else {
    inputElement.parentElement.classList.add(`valid`);
    inputElement.parentElement.classList.remove(`not-valid`);
    inputElement.parentElement.lastElementChild.style.display = `none`;
}
}

// Provides conditional error messages
function errorMessage(hint, errorText) {
  hint.textContent = errorText;
};

nameInput.addEventListener(`keyup`, ()=> {
  validator(nameInput, validateName);
  if (nameInput.value === ``) {
    errorMessage(nameHint, `Name field cannot be blank`);
  } else if (!validateName()) {
    errorMessage(nameHint, `Name field must be formatted correctly -- Ex: "John Smith"`);
  }
});

email.addEventListener('keyup', ()=> {
  validator(email, validateEmail);
  if (email.value === ``) {
    errorMessage(emailHint, `Email field cannot be blank`);
  } else if (!validateEmail()) {
    errorMessage(emailHint, `Email must be formatted correctly -- Ex: "johnsmith@example.com"`);
  }
});

activities.addEventListener('change', ()=> {
  validator(activities, validateActivities);
});

if (payment.value === 'credit-card') {
  cardNumber.addEventListener('keyup', ()=> {
    validator(cardNumber, validateCardNumber);
  });

  zipCode.addEventListener('keyup', ()=> {
    validator(zipCode, validateZipCode);
  });

  cvv.addEventListener('keyup', ()=> {
    validator(cvv, validateCvv);
  });
}

// Prevents the form from submitting if the input values do not match the regular expressions for the required fields.
form.addEventListener('submit', (e) => {
  function validator(inputElement, validationFunction){
      if (!validationFunction()) {
        e.preventDefault();
        inputElement.parentElement.classList.add(`not-valid`);
        inputElement.parentElement.classList.remove(`valid`);
        inputElement.parentElement.lastElementChild.style.display = `block`;
    } else {
        inputElement.parentElement.classList.add(`valid`);
        inputElement.parentElement.classList.remove(`not-valid`);
        inputElement.parentElement.lastElementChild.style.display = `none`;
    }
  }

  validator(nameInput, validateName);
  validator(email, validateEmail);
  validator(activities, validateActivities);

  if (payment.value === 'credit-card') {
    validator(cardNumber, validateCardNumber);
    validator(zipCode, validateZipCode);
    validator(cvv, validateCvv);
  }
});



