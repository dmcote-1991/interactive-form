import { FormStructure } from "./FormStructure.js";
import { FormInteraction } from "./FormInteraction.js";

export class RegistrationForm {
  nameInput!: HTMLInputElement;
  jobRoleMenu!: HTMLSelectElement;
  otherJobRole!: HTMLInputElement;
  shirtDesign!: HTMLSelectElement;
  shirtColor!: HTMLSelectElement;
  activities!: HTMLElement;
  activitiesCheckboxes!: NodeListOf<HTMLInputElement>;
  totalCost: number;
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

  private formStructure: FormStructure;
  private formInteraction: FormInteraction;

  constructor(formStructure: FormStructure, formInteraction: FormInteraction) {
    this.totalCost = 0; // Initialize total cost of selected activities
    this.formStructure = formStructure; // Create an instance of FormStructure
    this.formInteraction = formInteraction; // Create an instance of FormInteraction
  }

  /*
    * Get References to all form elements by their IDs
  */
  getFormElements(): void {
    this.nameInput = document.getElementById(`name`) as HTMLInputElement;
    this.jobRoleMenu = document.getElementById(`title`) as HTMLSelectElement;
    this.otherJobRole = document.getElementById(`other-job-role`) as HTMLInputElement;
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
    this.form.addEventListener('submit', this.validateForm.bind(this));
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
