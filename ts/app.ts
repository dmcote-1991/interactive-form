import { FormStructure } from "./FormStructure.js";
import { FormInteraction } from "./FormInteraction.js";
import { FormValidation } from "./FormValidation.js";

class App {
  private formStructure!: FormStructure;
  private formInteraction!: FormInteraction;
  private formValidation!: FormValidation;

  constructor() {
    // Initializes the application
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  private init(): void {
    // Initialize FormStructure
    this.formStructure = new FormStructure('form-container');

    // Get references to form elements
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const jobRoleMenu = document.getElementById('title') as HTMLSelectElement;
    const otherJobRole = document.getElementById('other-job-role') as HTMLInputElement;
    const shirtDesign = document.getElementById('design') as HTMLSelectElement;
    const shirtColor = document.getElementById('color') as HTMLSelectElement;
    const activities = document.getElementById('activities-box') as HTMLElement;
    const activitiesCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const totalCost = 0; // Initialize total cost
    const payment = document.getElementById('payment') as HTMLSelectElement;
    const creditCard = document.getElementById('credit-card') as HTMLElement;
    const paypal = document.getElementById('paypal') as HTMLElement;
    const bitcoin = document.getElementById('bitcoin') as HTMLElement;
    const form = document.querySelector('form') as HTMLFormElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const cardNumber = document.getElementById('cc-num') as HTMLInputElement;
    const zipCode = document.getElementById('zip') as HTMLInputElement;
    const cvv = document.getElementById('cvv') as HTMLInputElement;

    const paymentMethods = { creditCard, paypal, bitcoin };

    // Initialize FormInteraction
    this.formInteraction = new FormInteraction(
      jobRoleMenu,
      otherJobRole,
      shirtDesign,
      shirtColor,
      activities,
      activitiesCheckboxes,
      totalCost,
      payment,
      paymentMethods
    );

    // Initialize FormValidation
    this.formValidation = new FormValidation(
      nameInput,
      email,
      activities,
      payment,
      cardNumber,
      zipCode,
      cvv,
      form,
      activitiesCheckboxes,
      document.getElementById('name-hint') as HTMLElement,
      document.getElementById('email-hint') as HTMLElement,
      document.getElementById('activities-hint') as HTMLElement,
      document.getElementById('cc-hint') as HTMLElement,
      document.getElementById('zip-hint') as HTMLElement,
      document.getElementById('cvv-hint') as HTMLElement
    );

    // Set up event listeners
    this.formInteraction.addEventListeners();
    this.formValidation.addEventListeners();

    this.initializeFormState(otherJobRole, shirtColor)
  }

  private initializeFormState(otherJobRole: HTMLInputElement, shirtColor: HTMLSelectElement): void {
    otherJobRole.style.display = 'none'; // Hide the 'other job role' input
    shirtColor.disabled = true; // Disable shirt color selection initially
    const nameInput = document.getElementById('name') as HTMLInputElement;
    nameInput.focus(); // Set focus to the name input field
  }
}

new App();
