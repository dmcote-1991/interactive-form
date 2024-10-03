class RegistrationForm {
  constructor() {
    // Get References to all form elements by their IDs
    this.nameInput = document.getElementById(`name`);
    this.jobRoleMenu = document.getElementById(`title`);
    this.otherJobRole = document.getElementById(`other-job-role`);
    this.shirtDesign = document.getElementById(`design`);
    this.shirtColor = document.getElementById(`color`);
    this.activities  = document.getElementById(`activities-box`);
    this.activitiesCheckboxes = document.querySelectorAll(`#activities input[type="checkbox"]`);
    this.payment = document.getElementById(`payment`);
    this.creditCard = document.getElementById(`credit-card`);
    this.paypal = document.getElementById(`paypal`);
    this.bitcoin = document.getElementById(`bitcoin`);
    this.form = document.querySelector(`form`)
    this.email = document.getElementById(`email`);
    this.cardNumber = document.getElementById(`cc-num`);
    this.zipCode = document.getElementById(`zip`);
    this.cvv = document.getElementById(`cvv`);
    this.nameHint = document.getElementById(`name-hint`);
    this.emailHint = document.getElementById(`email-hint`);
    this.activitiesHint = document.getElementById(`activities-hint`);
    this.ccHint = document.getElementById(`cc-hint`);
    this.zipHint = document.getElementById(`zip-hint`);
    this.cvvHint = document.getElementById(`cvv-hint`);
    
    // Initialize total cost of selected activities
    this.totalCost = 0;

    // Call the initialization method
    this.init();
  }

  /*
   * Initialize the form elements
  */
  init() {
    this.nameInput.focus();
    this.otherJobRole.style.display = 'none';
    this.shirtColor.disabled = true;

    this.addEventListeners();
  }

  /*
   * Add event listeners for various form elements
  */
  addEventListeners() {
    this.jobRoleMenu.addEventListener('change', this.toggleOtherJobRole.bind(this));
    this.shirtDesign.addEventListener('change', this.updateShirtColor.bind(this));
    this.activities.addEventListener('change', this.updateActivitiesCost.bind(this));
    this.payment.addEventListener('change', this.updatePaymentInfo.bind(this));

    // Validate the name, email, and activities fields
    this.nameInput.addEventListener('keyup', () => this.validateField(this.nameInput, this.validateName.bind(this), this.nameHint));
    this.email.addEventListener('keyup', () => this.validateField(this.email, this.validateEmail.bind(this), this.emailHint));
    this.activities.addEventListener('change', () => this.validateField(this.activities, this.validateActivities.bind(this), this.activitiesHint));

    // Validate credit card fields only if credit card is selected as payment method
    if (this.payment.value === 'credit-card') {
      this.cardNumber.addEventListener('keyup', () => this.validateField(this.cardNumber, this.validateCardNumber.bind(this), this.ccHint));
      this.zipCode.addEventListener('keyup', () => this.validateField(this.zipCode, this.validateZipCode.bind(this), this.zipHint));
      this.cvv.addEventListener('keyup', () => this.validateField(this.cvv, this.validateCvv.bind(this), this.cvvHint));
    }

    // Validate the entire form submission
    this.form.addEventListener('submit', this.validateForm.bind(this));
  }

  /*
   * Show or hide the 'other' job role input based on selected job role
  */
  toggleOtherJobRole(e) {
    const selectedJob = e.target.value;
    this.otherJobRole.style.display = selectedJob === 'other' ? 'block' : 'none';
  }

  /*
   * Reset the shirt color selection to default
  */
  resetColorSelection() {
    const defaultOption = this.shirtColor.querySelector('option[selected]');
    defaultOption.textContent = 'Select a color';
    this.shirtColor.value = defaultOption.value;
  }

  /* 
   * Update the available shirt colors based on selected design
  */
  updateShirtColor(e) {
    const selectedTheme = e.target.value;
    this.shirtColor.disabled = false;

    // Loop through shirt color options and display based on selected theme
    for (let i = 0; i < this.shirtColor.children.length; i++) {
      const colorOption = this.shirtColor.children[i];
      const dataTheme = colorOption.getAttribute('data-theme');
      
      colorOption.style.display = dataTheme === selectedTheme ? 'block' : 'none'
    }

    // Reset shirt color selection to default
    this.resetColorSelection();
  }

  /*
   * Update the total cost of selected activities
  */
  updateActivitiesCost(e) {
    const dataCost = +e.target.getAttribute('data-cost');
    let activitiesCost = document.getElementById('activities-cost');

    // Add or subtract cost on checkbox state
    if (e.target.checked) {
      this.totalCost += dataCost;
    } else {
      this.totalCost -= dataCost;
    }

    // Update displayed total cost
    activitiesCost.textContent = `Total: $${this.totalCost}`;

    // Toggle disabled state of conflicting activities
    this.toggleDisabledActivities(e.target);
  }

  /*
   * Disable conflicting activities based on selected one
  */
  toggleDisabledActivities(selectedActivity) {
    const selectedDateTime = selectedActivity.getAttribute('data-day-and-time');

    // Loop through activity checkboxes to enable/disable based on selected activity
    for (let i = 0; i < this.activitiesCheckboxes.length; i++) {
      if (this.activitiesCheckboxes[i] !== selectedActivity) {
        const dateTime = this.activitiesCheckboxes[i].getAttribute('data-day-and-time');

        if (dateTime === selectedDateTime) {
          this.activitiesCheckboxes[i].disabled = selectedActivity.checked;
          this.activitiesCheckboxes[i].parentElement.classList.toggle('disabled', selectedActivity.checked);
        }
      }
    }
  }

  /*
   * Update the visible payment info based on selected payment method
  */
  updatePaymentInfo(e) {
    // Hide all payment options initially
    this.creditCard.style.display = 'none';
    this.paypal.style.display = 'none';
    this.bitcoin.style.display = 'none';

    // Show selected payment info
    const selectedPayment = document.getElementById(e.target.value);
    selectedPayment.style.display = 'block';
  }

  /*
   * Validate individual input fields
  */
  validateField(inputElement, validationFunction, hint) {
    const isValid = validationFunction();

    // Update styles and hints based on validity
    if (!isValid) {
      inputElement.parentElement.classList.add('not-valid');
      inputElement.parentElement.classList.remove('valid');
      hint.style.display = 'block';
    } else {
      inputElement.parentElement.classList.add('valid');
      inputElement.parentElement.classList.remove('not-valid');
      hint.style.display = 'none';
    }
  }

  /*
   * Validation Functions for different fields
  */
  validateName() {
    return /^(?!\s)[a-z\s]+$/i.test(this.nameInput.value);
  }

  validateEmail() {
    return /^\w+@\w+\.\w+$/.test(this.email.value);
  }

  validateActivities() {
    return Array.from(this.activitiesCheckboxes).some(checkbox => checkbox.checked); // At least one activity must be selected
  }

  validateCardNumber() {
    return /^\d{13,16}$/.test(this.cardNumber.value);
  }

  validateZipCode() {
    return /^\d{5}$/.test(this.zipCode.value);
  }

  validateCvv() {
    return /^\d{3}$/.test(this.cvv.value);
  }

  /*
   * Validate the entire form on submission
  */
  validateForm(e) {
    // Prevent form submission until validation is complete
    e.preventDefault();

    // Validate fields and show hints as necessary
    this.validateField(this.nameInput, this.validateName.bind(this), this.nameHint);
    this.validateField(this.email, this.validateEmail.bind(this), this.emailHint);
    this.validateField(this.activities, this.validateActivities.bind(this), this.activitiesHint);

    // Validate credit card fields only if credit card is the selected payment method
    if (this.payment.value === 'credit-card') {
      this.validateField(this.cardNumber, this.validateCardNumber.bind(this), this.ccHint);
      this.validateField(this.zipCode, this.validateZipCode.bind(this), this.zipHint);
      this.validateField(this.cvv, this.validateCvv.bind(this), this.cvvHint);
    }
  }
}

/*
 * Create a new instance of the RegistrationForm class
*/
const registrationForm = new RegistrationForm();
