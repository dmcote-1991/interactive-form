export class FormValidation {
  nameInput: HTMLInputElement;
  email: HTMLInputElement;
  activities: HTMLElement;
  payment: HTMLSelectElement;
  cardNumber: HTMLInputElement;
  zipCode: HTMLInputElement;
  cvv: HTMLInputElement;
  form: HTMLFormElement;
  activitiesCheckboxes: NodeListOf<HTMLInputElement>;

  nameHint: HTMLElement;
  emailHint: HTMLElement;
  activitiesHint: HTMLElement;
  ccHint: HTMLElement;
  zipHint: HTMLElement;
  cvvHint: HTMLElement;

  constructor(
    nameInput: HTMLInputElement,
    email: HTMLInputElement,
    activities: HTMLElement,
    payment: HTMLSelectElement,
    cardNumber: HTMLInputElement,
    zipCode: HTMLInputElement,
    cvv: HTMLInputElement,
    form: HTMLFormElement,
    activitiesCheckboxes: NodeListOf<HTMLInputElement>,

    nameHint: HTMLElement,
    emailHint: HTMLElement,
    activitiesHint: HTMLElement,
    ccHint: HTMLElement,
    zipHint: HTMLElement,
    cvvHint: HTMLElement
  ) {
    this.nameInput = nameInput;
    this.email = email;
    this.activities = activities;
    this.payment = payment;
    this.cardNumber = cardNumber;
    this.zipCode = zipCode;
    this.cvv = cvv;
    this.form = form;
    this.activitiesCheckboxes = activitiesCheckboxes;

    this.nameHint = nameHint;
    this.emailHint = emailHint;
    this.activitiesHint = activitiesHint;
    this.ccHint = ccHint;
    this.zipHint = zipHint;
    this.cvvHint = cvvHint;
  }

  addEventListeners(): void {
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
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
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
