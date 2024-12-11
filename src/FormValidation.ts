/**
 * The FormValidation class is responsible for handling form validation 
 * and submission for a user registration form. It validates various fields 
 * including the user's name, email, selected activities, and payment details 
 * such as credit card number, ZIP code, and CVV. Real-time validation is 
 * performed using event listeners, and the form is checked for completeness 
 * before submission. Validation hints are displayed to guide the user in 
 * correcting errors, and the first invalid field is focused if the form 
 * submission fails. The class ensures that all required fields meet specific 
 * criteria before allowing the form to be submitted.
 */

export class FormValidation {
  // Form input elements
  private nameInput: HTMLInputElement;
  private email: HTMLInputElement;
  private activities: HTMLElement;
  private payment: HTMLSelectElement;
  private cardNumber: HTMLInputElement;
  private zipCode: HTMLInputElement;
  private cvv: HTMLInputElement;
  private form: HTMLFormElement;
  private activitiesCheckboxes: NodeListOf<HTMLInputElement>;

  // Hint elements for validation feedback
  private nameHint: HTMLElement;
  private emailHint: HTMLElement;
  private activitiesHint: HTMLElement;
  private ccHint: HTMLElement;
  private zipHint: HTMLElement;
  private cvvHint: HTMLElement;

  /**
   * Constructor to initialize form validation with necessary form elements.
   * @param nameInput - The input element for the name field
   * @param email - The input element for the email field
   * @param activities - The container element for activities checkboxes
   * @param payment - The select element for payment method
   * @param cardNumber - The input element for credit card number
   * @param zipCode - The input element for ZIP code
   * @param cvv - The input element for CVV code
   * @param form - The form element itself
   * @param activitiesCheckboxes - NodeList of all activities checkboxes
   * @param nameHint - Hint element displayed for name field validation
   * @param emailHint - Hint element displayed for email field validation
   * @param activitiesHint - Hint element displayed for activities validation
   * @param ccHint - Hint element displayed for credit card number validation
   * @param zipHint - Hint element displayed for ZIP code validation
   * @param cvvHint - Hint element displayed for CVV validation
   */
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
    //Initialize form field elements
    this.nameInput = nameInput;
    this.email = email;
    this.activities = activities;
    this.payment = payment;
    this.cardNumber = cardNumber;
    this.zipCode = zipCode;
    this.cvv = cvv;
    this.form = form;
    this.activitiesCheckboxes = activitiesCheckboxes;

    // Initialize hint elements for validation messages
    this.nameHint = nameHint;
    this.emailHint = emailHint;
    this.activitiesHint = activitiesHint;
    this.ccHint = ccHint;
    this.zipHint = zipHint;
    this.cvvHint = cvvHint;
  }

  /**
   * Adds event listeners for real-time form validation and submission handling.
   */
  addEventListeners(): void {
    // Validate name, email, and activities fields on user input
    this.nameInput.addEventListener('keyup', () => this.validateField(this.nameInput, this.validateName.bind(this), this.nameHint));
    this.email.addEventListener('keyup', () => this.validateField(this.email, this.validateEmail.bind(this), this.emailHint));
    this.activities.addEventListener('change', () => this.validateField(this.activities, this.validateActivities.bind(this), this.activitiesHint));

    // Attach event listeners for credit card fields if credit card payment is selected
    if (this.payment.value === 'credit-card') {
      this.cardNumber.addEventListener('keyup', () => this.validateField(this.cardNumber, this.validateCardNumber.bind(this), this.ccHint));
      this.zipCode.addEventListener('keyup', () => this.validateField(this.zipCode, this.validateZipCode.bind(this), this.zipHint));
      this.cvv.addEventListener('keyup', () => this.validateField(this.cvv, this.validateCvv.bind(this), this.cvvHint));
    }

    // Handle form submission
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  /**
   * Handles form submission by validating all fields and preventing submission if there are errors.
   * @param e - The form submission event
   */
  private handleSubmit(e: Event): void {
    // Prevent default form submission behavior
    e.preventDefault();

    //Validate the entire form
    let isValid = this.validateForm(e);

    if (isValid) {
      // If all fields are valid, submit the form
      alert('Form submitted successfully!');
      this.form.submit();
    } else {
      // If there are validation errors, alert the user and focus on the first invalid field
      alert('Please fix the errors in the form before submitting.');
      this.focusFirstInvalidField();
    }
  }  

  /**
   * Focuses on the first invalid form field to help the user correct errors.
   */
  focusFirstInvalidField(): void {
    const invalidFields = this.form.querySelectorAll(".error-border");

    if (invalidFields.length > 0) {
      (invalidFields[0] as HTMLElement).focus();
    }
  }

  /**
   * Validates the entire form, checking all fields for errors.
   * @param e - The form submission event
   * @returns {boolean} - True if all form fields are valid, false otherwise
   */
  validateForm(e: Event): boolean {
    // Prevent the form from submitting before all validations are complete
    e.preventDefault();

    // Validate individual fields and display hints where necessary
    const nameIsValid = this.validateField(this.nameInput, this.validateName.bind(this), this.nameHint);
    const emailIsValid = this.validateField(this.email, this.validateEmail.bind(this), this.emailHint);
    const activitiesIsValid = this.validateField(this.activities, this.validateActivities.bind(this), this.activitiesHint);

    // Validate payment-related fields if credit card payment is selected
    let paymentIsValid = true;
    if (this.payment.value === 'credit-card') {
      const cardIsValid = this.validateField(this.cardNumber, this.validateCardNumber.bind(this), this.ccHint);
      const zipIsValid = this.validateField(this.zipCode, this.validateZipCode.bind(this), this.zipHint);
      const cvvIsValid = this.validateField(this.cvv, this.validateCvv.bind(this), this.cvvHint);
      paymentIsValid = cardIsValid && zipIsValid && cvvIsValid;
    }

    // Return true if all fields are valid, otherwise return false
    return nameIsValid && emailIsValid && activitiesIsValid && paymentIsValid;
  }  

  /**
   * Validates a single form field using the provided validation function.
   * @param inputElement - The form field element to validate
   * @param validationFunction - The function to use for validation
   * @param hint - The hint element to show if validation fails
   * @returns {boolean} - True if the field is valid, false otherwise
   */
  validateField(inputElement: HTMLElement, validationFunction: () => boolean, hint: HTMLElement): boolean {
    const isValid = validationFunction();

    // Update the UI based on validation status
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

  /**
   * Validates the name field to ensure it only contains letters and spaces.
   * @returns {boolean} - True if the name is valid, false otherwise
   */
  validateName(): boolean {
    return /^(?!\s)[a-z\s]+$/i.test(this.nameInput.value);
  }

  /**
   * Validates the email field format.
   * @returns {boolean} - True if the email is in a valid format, false otherwise
   */
  validateEmail(): boolean {
    return /^\w+@\w+\.\w+$/.test(this.email.value);
  }

  /**
   * Validates that at least one activity checkbox is selected.
   * @returns {boolean} - True if at least one checkbox is checked, false otherwise
   */
  validateActivities(): boolean {
    return Array.from(this.activitiesCheckboxes).some(checkbox => checkbox.checked); // At least one activity must be selected
  }

  /**
   * Validates the credit card number to ensure it is 13-16 digits long.
   * @returns {boolean} - True if the credit card number is valid, false otherwise
   */
  validateCardNumber(): boolean {
    return /^\d{13,16}$/.test(this.cardNumber.value);
  }

  /**
   * Validates the ZIP code to ensure it is exactly 5 digits long.
   * @returns {boolean} - True if the ZIP code is valid, false otherwise
   */
  validateZipCode(): boolean {
    return /^\d{5}$/.test(this.zipCode.value);
  }

  /**
   * Validates the CVV code to ensure it is exactly 3 digits long.
   * @returns {boolean} - True if the CVV is valid, false otherwise
   */
  validateCvv(): boolean {
    return /^\d{3}$/.test(this.cvv.value);
  }
}
