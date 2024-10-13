class RegistrationForm {
  totalCost: number;
  nameInput!: HTMLSelectElement;
  jobRoleMenu!: HTMLSelectElement;
  otherJobRole!: HTMLSelectElement;
  shirtDesign!: HTMLSelectElement;
  shirtColor!: HTMLSelectElement;
  activities!: HTMLElement;
  activitiesCheckboxes!: NodeListOf<HTMLInputElement>;
  payment!: HTMLSelectElement;
  creditCard!: HTMLElement;
  paypal!: HTMLElement;
  bitcoin!: HTMLElement;
  form!: HTMLFormElement;
  email!: HTMLInputElement;
  cardNumber!: HTMLInputElement;
  zipCode!: HTMLInputElement;
  cvv!: HTMLInputElement;
  nameHint!: HTMLElement;
  emailHint!: HTMLElement;
  activitiesHint!: HTMLElement;
  ccHint!: HTMLElement;
  zipHint!: HTMLElement;
  cvvHint!: HTMLElement;

  constructor() {
    this.totalCost = 0; // Initialize total cost of selected activities
    this.init(); // Call the initialization method
  }

  /*
   * Inject the form HTML into the DOM
  */
  injectFormHTML(): void {
    const formContainer = document.getElementById('form-container');

    if (formContainer) {
      formContainer.innerHTML = `
        <form action="index.html" method="post" novalidate>
          <p id="form-hint" class="form-hint">
            <span class="asterisk">*</span> - required field
          </p>

          <div class="basic-info-and-shirt-box">
            <fieldset class="basic-info">
              <legend>Basic Info</legend>

              <label for="name">Name: <span class="asterisk">*</span>
                <input
                  type="text"
                  id="name"
                  name="user-name"
                  class="error-border"
                />
                <span id="name-hint" class="name-hint hint">
                  Name field cannot be blank
                </span>
              </label>

              <label for="email">Email Address: <span class="asterisk">
                *
              </span>
                <input
                  type="email"
                  id="email"
                  name="user-email"
                  class="error-border"
                />
                <span id="email-hint" class="email-hint hint">
                  Email address must be formatted correctly
                </span>
              </label>

              <label for="title">Job Role</label>
              <select id="title" name="user-title">
                <option hidden>Select Job Role</option>
                <option value="full-stack js developer">Full Stack JavaScript Developer</option>
                <option value="front-end developer">Front End Developer</option>
                <option value="back-end developer">Back End Developer</option>
                <option value="designer">Designer</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                name="other-job-role"
                id="other-job-role"
                class="other-job-role"
                placeholder="Other job role?"
              />
            </fieldset>

            <fieldset class="shirts">
              <legend>T-Shirt Info</legend>
              <div class="shirt-div-box">
                <div id="shirt-sizes" class="shirt-sizes">
                  <label for="size">Size:</label>
                  <select id="size" name="user-size">
                    <option value="small">S</option>
                    <option value="medium" selected>M</option>
                    <option value="large">L</option>
                    <option value="extra large">XL</option>
                    <option value="extra large">XXL</option>
                  </select>
                </div>

                <div id="shirt-designs" class="shirt-designs">
                  <label for="design">Design:</label>
                  <select id="design" name="user-design">
                    <option hidden>Select Theme</option>
                    <option value="js puns">Theme - JS Puns</option>
                    <option value="heart js">Theme - I &#9829; JS</option>
                  </select>
                </div>

                <div id="shirt-colors" class="shirt-colors">
                  <label for="color">Color:</label>
                  <select id="color">
                    <option selected hidden>Select a design theme above</option>
                    <option data-theme="js puns" value="cornflowerblue">
                      Cornflower Blue (JS Puns shirt only)
                    </option>
                    <option data-theme="js puns" value="darkslategrey">
                      Dark Slate Grey (JS Puns shirt only)
                    </option>
                    <option data-theme="js puns" value="gold">
                      Gold (JS Puns shirt only)
                    </option>
                    <option data-theme="heart js" value="tomato">
                      Tomato (I &#9829; JS shirt only)
                    </option>
                    <option data-theme="heart js" value="steelblue">
                      Steel Blue (I &#9829; JS shirt only)
                    </option>
                    <option data-theme="heart js" value="dimgrey">
                      Dim Grey (I &#9829; JS shirt only)
                    </option>
                  </select>
                </div>
              </div>
            </fieldset>
          </div>

          <fieldset id="activities" class="activities">
            <legend>
              Register for Activities <span class="asterisk">*</span>
            </legend>
            <div id="activities-box" class="activities-box error-border">
              <label>
                <input type="checkbox" name="all" data-cost="200" />
                <span>Main Conference</span>
                <span class="activity-cost">$200</span>
                <img class="activity-img js-img" src="img/js.svg" alt="" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="js-libs"
                  data-day-and-time="Tuesday 9am-12pm"
                  data-cost="100"
                />
                <span>JavaScript Libraries Workshop</span>
                <span>Tuesday 9am-12pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img react-img" src="img/react.svg" alt="" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="node"
                  data-day-and-time="Tuesday 1pm-4pm"
                  data-cost="100"
                />
                <span>Node.js Workshop</span>
                <span>Tuesday 1pm-4pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img node-img" src="img/node.svg" alt="" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="js-frameworks"
                  data-day-and-time="Tuesday 9am-12pm"
                  data-cost="100"
                />
                <span>JavaScript Frameworks Workshop</span>
                <span>Tuesday 9am-12pm</span>
                <span class="activity-cost">$100</span>
                <img
                  class="activity-img angular-img"
                  src="img/angular.svg"
                  alt=""
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="build-tools"
                  data-day-and-time="Tuesday 1pm-4pm"
                  data-cost="100"
                />
                <span>Build tools Workshop</span>
                <span>Tuesday 1pm-4pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img build-img" src="img/build.svg" alt="" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="npm"
                  data-day-and-time="Wednesday 9am-12pm"
                  data-cost="100"
                />
                <span>npm Workshop</span>
                <span>Wednesday 9am-12pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img npm-img" src="img/npm.svg" alt="" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="express"
                  data-day-and-time="Wednesday 1pm-4pm"
                  data-cost="100"
                />
                <span>Express Workshop</span>
                <span>Wednesday 1pm-4pm</span>
                <span class="activity-cost">$100</span>
                <img
                  class="activity-img express-img"
                  src="img/express.svg"
                  alt=""
                />
              </label>
            </div>
            <p id="activities-cost" class="activities-cost">Total: $0</p>
            <p id="activities-hint" class="hint">Please select at least one activity.</p>
          </fieldset>

          <fieldset class="payment-method">
            <legend>Payment Info</legend>

            <label for="payment">I'm going to pay with:</label>
            <select id="payment">
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bitcoin">Bitcoin</option>
            </select>

            <div id="credit-card">
              <label for="cc-num">Card Number:</label>
              <input
                type="text"
                id="cc-num"
                name="user-cc-num"
                placeholder="enter a number between 13 and 16 digits"
              />
              <span id="cc-hint" class="cc-hint hint">
                Please enter a number between 13 and 16 digits.
              </span>

              <label for="zip">ZIP Code:</label>
              <input
                type="text"
                id="zip"
                name="user-zip"
                placeholder="enter 5 digit ZIP code"
              />
              <span id="zip-hint" class="zip-hint hint">
                Enter a 5 digit ZIP code.
              </span>

              <label for="cvv">CVV:</label>
              <input type="text" id="cvv" name="user-cvv" placeholder="enter 3 digit CVV" />
              <span id="cvv-hint" class="cvv-hint hint">Enter a 3 digit CVV number.</span>
            </div>

            <div id="paypal">
              <p>PayPal account information will be provided after submitting the form.</p>
            </div>

            <div id="bitcoin">
              <p>Bitcoin wallet information will be provided after submitting the form.</p>
            </div>
          </fieldset>

          <button type="submit" id="submit">Submit</button>
        </form>
      `;
    }
  }

  /*
    * Initialize the form functionality.
  */
  init(): void {
    this.injectFormHTML();
    this.getFormElements();
    this.addEventListeners();
    
    this.nameInput.focus();
    this.otherJobRole.style.display = 'none';
    this.shirtColor.disabled = true;
  }

  /*
    * Get References to all form elements by their IDs
  */
  getFormElements(): void {
    this.nameInput = document.getElementById(`name`) as HTMLSelectElement;
    this.jobRoleMenu = document.getElementById(`title`) as HTMLSelectElement;
    this.otherJobRole = document.getElementById(`other-job-role`) as HTMLSelectElement;
    this.shirtDesign = document.getElementById(`design`) as HTMLSelectElement;
    this.shirtColor = document.getElementById(`color`) as HTMLSelectElement;
    this.activities  = document.getElementById(`activities-box`) as HTMLElement;
    this.activitiesCheckboxes = document.querySelectorAll(`#activities input[type="checkbox"]`) as NodeListOf<HTMLInputElement>;
    this.payment = document.getElementById(`payment`) as HTMLSelectElement;
    this.creditCard = document.getElementById(`credit-card`) as HTMLElement;
    this.paypal = document.getElementById(`paypal`) as HTMLElement;
    this.bitcoin = document.getElementById(`bitcoin`) as HTMLElement;
    this.form = document.querySelector(`form`) as HTMLFormElement;
    this.email = document.getElementById(`email`) as HTMLInputElement;
    this.cardNumber = document.getElementById(`cc-num`) as HTMLInputElement;
    this.zipCode = document.getElementById(`zip`) as HTMLInputElement;
    this.cvv = document.getElementById(`cvv`) as HTMLInputElement;
    this.nameHint = document.getElementById(`name-hint`) as HTMLElement;
    this.emailHint = document.getElementById(`email-hint`) as HTMLElement;
    this.activitiesHint = document.getElementById(`activities-hint`) as HTMLElement;
    this.ccHint = document.getElementById(`cc-hint`) as HTMLElement;
    this.zipHint = document.getElementById(`zip-hint`) as HTMLElement;
    this.cvvHint = document.getElementById(`cvv-hint`) as HTMLElement;
  }

  /*
   * Add event listeners for various form elements
  */
  addEventListeners(): void {
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
  toggleOtherJobRole(e: Event): void {
    const selectedJob = (e.target as HTMLSelectElement).value;
    this.otherJobRole.style.display = selectedJob === 'other' ? 'block' : 'none';
  }

  /*
   * Reset the shirt color selection to default
  */
  resetColorSelection(): void {
    const defaultOption = this.shirtColor.querySelector('option[selected]') as HTMLOptionElement;
    defaultOption.textContent = 'Select a color';
    this.shirtColor.value = defaultOption.value;
  }

  /* 
   * Update the available shirt colors based on selected design
  */
  updateShirtColor(e: Event): void {
    const selectedTheme = (e.target as HTMLSelectElement).value;
    this.shirtColor.disabled = false;

    // Loop through shirt color options and display based on selected theme
    for (let i = 0; i < this.shirtColor.children.length; i++) {
      const colorOption = this.shirtColor.children[i] as HTMLOptionElement;
      const dataTheme = colorOption.getAttribute('data-theme');
      
      colorOption.style.display = dataTheme === selectedTheme ? 'block' : 'none'
    }

    // Reset shirt color selection to default
    this.resetColorSelection();
  }

  /*
   * Update the total cost of selected activities
  */
  updateActivitiesCost(e: Event): void {
    const target = e.target as HTMLInputElement;
    const dataCost = +target.getAttribute('data-cost')!;
    let activitiesCost = document.getElementById('activities-cost')!;

    // Add or subtract cost on checkbox state
    if (target.checked) {
      this.totalCost += dataCost;
    } else {
      this.totalCost -= dataCost;
    }

    // Update displayed total cost
    activitiesCost.textContent = `Total: $${this.totalCost}`;

    // Toggle disabled state of conflicting activities
    this.toggleDisabledActivities(target);
  }

  /*
   * Disable conflicting activities based on selected one
  */
  toggleDisabledActivities(selectedActivity: HTMLInputElement): void {
    const selectedDateTime = selectedActivity.getAttribute('data-day-and-time');

    // Loop through activity checkboxes to enable/disable based on selected activity
    for (let i = 0; i < this.activitiesCheckboxes.length; i++) {
      if (this.activitiesCheckboxes[i] !== selectedActivity) {
        const dateTime = this.activitiesCheckboxes[i].getAttribute('data-day-and-time');

        if (dateTime === selectedDateTime) {
          this.activitiesCheckboxes[i].disabled = selectedActivity.checked;
          this.activitiesCheckboxes[i].parentElement?.classList.toggle('disabled', selectedActivity.checked);
        }
      }
    }
  }

  /*
   * Update the visible payment info based on selected payment method
  */
  updatePaymentInfo(e: Event): void {
    // Hide all payment options initially
    this.creditCard.style.display = 'none';
    this.paypal.style.display = 'none';
    this.bitcoin.style.display = 'none';

    // Show selected payment info
    const target = e.target as HTMLSelectElement;
    const selectedPayment = document.getElementById(target.value);

    if (selectedPayment) {
      selectedPayment.style.display = 'block';
    }
  }

  /*
   * Validate the form when the submit button is clicked
  */
  handleSubmit(e: Event): void {
    e.preventDefault(); // Prevent the form from submitting

    let isValid = this.validateForm(e);

    if (isValid) {
      alert('Form submitted successfully!');
      this.form.submit();
    } else {
      alert('Please fix the errors in the form before submitting.');
      this.focusFirstInvalidField();
    }
  }  

  /*
   * Focus on the first invalid field to guide the user
  */
  focusFirstInvalidField(): void {
    const invalidFields = this.form.querySelectorAll(".error-border");

    if (invalidFields.length > 0) {
      (invalidFields[0] as HTMLElement).focus();
    }
  }

  /*
   * Validate the entire form on submission
  */
  validateForm(e: Event): boolean {
    // Prevent form submission until validation is complete
    e.preventDefault();

    // Validate fields and show hints as necessary
    const nameIsValid = this.validateField(this.nameInput, this.validateName.bind(this), this.nameHint);
    const emailIsValid = this.validateField(this.email, this.validateEmail.bind(this), this.emailHint);
    const activitiesIsValid = this.validateField(this.activities, this.validateActivities.bind(this), this.activitiesHint);

    // Validate credit card fields only if credit card is the selected payment method
    let paymentIsValid = true;
    if (this.payment.value === 'credit-card') {
      const cardIsValid = this.validateField(this.cardNumber, this.validateCardNumber.bind(this), this.ccHint);
      const zipIsValid = this.validateField(this.zipCode, this.validateZipCode.bind(this), this.zipHint);
      const cvvIsValid = this.validateField(this.cvv, this.validateCvv.bind(this), this.cvvHint);
      paymentIsValid = cardIsValid && zipIsValid && cvvIsValid;
    }

    // Return overal form validity
    return nameIsValid && emailIsValid && activitiesIsValid && paymentIsValid;
  }  

  /*
   * Validate individual input fields
  */
  validateField(inputElement: HTMLElement, validationFunction: () => boolean, hint: HTMLElement): boolean {
    const isValid = validationFunction();

    // Update styles and hints based on validity
    if (!isValid) {
      inputElement.parentElement?.classList.add('not-valid');
      inputElement.parentElement?.classList.remove('valid');
      hint.style.display = 'block';
    } else {
      inputElement.parentElement?.classList.add('valid');
      inputElement.parentElement?.classList.remove('not-valid');
      hint.style.display = 'none';
    }

    return isValid;
  }

  /*
   * Validation Functions for different fields
  */
  validateName(): boolean {
    return /^(?!\s)[a-z\s]+$/i.test(this.nameInput.value);
  }

  validateEmail(): boolean {
    return /^\w+@\w+\.\w+$/.test(this.email.value);
  }

  validateActivities(): boolean {
    return Array.from(this.activitiesCheckboxes).some(checkbox => checkbox.checked); // At least one activity must be selected
  }

  validateCardNumber(): boolean {
    return /^\d{13,16}$/.test(this.cardNumber.value);
  }

  validateZipCode(): boolean {
    return /^\d{5}$/.test(this.zipCode.value);
  }

  validateCvv(): boolean {
    return /^\d{3}$/.test(this.cvv.value);
  }
}

// Instantiate the form when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const form = new RegistrationForm();
});
