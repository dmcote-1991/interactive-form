const nameInput = document.getElementById(`name`);
const jobRoleMenu = document.getElementById(`title`);
const otherJobRole = document.getElementById(`other-job-role`);
const shirtDesign = document.getElementById(`design`);
const shirtColor = document.getElementById(`color`);
const activities  = document.getElementById(`activities`);
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

function validateCreditCard(cardNumber, zipCode, cvv) {
  const cardNumberRegex = /^\d{13,16}$/.test(cardNumber);
  const zipCodeRegex = /^\d{5}$/.test(zipCode);
  const cvvRegex = /^\d{3}$/.test(cvv);
  return cardNumberRegex && zipCodeRegex && cvvRegex;
}

form.addEventListener('submit', (e) => {
  if (!validateName(nameInput.value)) {
    e.preventDefault();
  }

  if (!validateEmail(email.value)) {
    e.preventDefault();
  }

  if (!validateActivities()) {
    e.preventDefault();
  }

  if (payment.value === 'credit-card') {
    if (!validateCreditCard(cardNumber.value, zipCode.value, cvv.value)) {
      e.preventDefault();
    }
  }
});
  


