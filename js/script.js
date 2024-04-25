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
function validateName(name) {
  return /^.+$/.test(name);
}

function validateEmail(email) {
  return /^\w+@\w+\.\w+$/.test(email);
}

function validateActivities() {
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    if (activitiesCheckboxes[i].checked) {
      return true;
    }
  }
  return false;
}

function validateCardNumber(cardNumber) {
  const cardNumberRegex = /^\d{13,16}$/.test(cardNumber);
  return cardNumberRegex;
}

function validateZipCode(zipCode) {
  const zipCodeRegex = /^\d{5}$/.test(zipCode);
  return zipCodeRegex;
}

function validateCvv(cvv) {
  const cvvRegex = /^\d{3}$/.test(cvv);
  return cvvRegex;
}

form.addEventListener('submit', (e) => {
  if (!validateName(nameInput.value)) {
    e.preventDefault();
    nameInput.parentElement.classList.add(`not-valid`);
    nameInput.parentElement.classList.remove(`valid`);
    nameInput.parentElement.lastElementChild.style.display = `block`;
  } else {
    nameInput.parentElement.classList.add(`valid`);
    nameInput.parentElement.classList.remove(`not-valid`);
    nameInput.parentElement.lastElementChild.style.display = `none`;
  }

  if (!validateEmail(email.value)) {
    e.preventDefault();
    email.parentElement.classList.add(`not-valid`);
    email.parentElement.classList.remove(`valid`);
    email.parentElement.lastElementChild.style.display = `block`;
  } else {
    email.parentElement.classList.add(`valid`);
    email.parentElement.classList.remove(`not-valid`);
    email.parentElement.lastElementChild.style.display = `none`;
  }

  if (!validateActivities()) {
    e.preventDefault();
    activities.parentElement.classList.add(`not-valid`);
    activities.parentElement.classList.remove(`valid`);
    activities.parentElement.lastElementChild.style.display = `block`;
  } else {
    activities.parentElement.classList.add(`valid`);
    activities.parentElement.classList.remove(`not-valid`);
    activities.parentElement.lastElementChild.style.display = `none`;
  }

  if (payment.value === 'credit-card') {
    if (!validateCardNumber(cardNumber.value)) {
      e.preventDefault();
      cardNumber.parentElement.classList.add(`not-valid`);
      cardNumber.parentElement.classList.remove(`valid`);
      cardNumber.parentElement.lastElementChild.style.display = `block`;
    } else {
      cardNumber.parentElement.classList.add(`valid`);
      cardNumber.parentElement.classList.remove(`not-valid`);
      cardNumber.parentElement.lastElementChild.style.display = `none`;
    }
  }

  if (payment.value === 'credit-card') {
    if (!validateZipCode(zipCode.value)) {
      e.preventDefault();
      zipCode.parentElement.classList.add(`not-valid`);
      zipCode.parentElement.classList.remove(`valid`);
      zipCode.parentElement.lastElementChild.style.display = `block`;
    } else {
      zipCode.parentElement.classList.add(`valid`);
      zipCode.parentElement.classList.remove(`not-valid`);
      zipCode.parentElement.lastElementChild.style.display = `none`;
    }
  }

  if (payment.value === 'credit-card') {
    if (!validateCvv(cvv.value)) {
      e.preventDefault();
      cvv.parentElement.classList.add(`not-valid`);
      cvv.parentElement.classList.remove(`valid`);
      cvv.parentElement.lastElementChild.style.display = `block`;
    } else {
      cvv.parentElement.classList.add(`valid`);
      cvv.parentElement.classList.remove(`not-valid`);
      cvv.parentElement.lastElementChild.style.display = `none`;
    }
  }
});
  
