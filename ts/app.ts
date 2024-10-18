import { RegistrationForm } from "./RegistrationForm.js";
import { FormStructure } from "./FormStructure.js";
import { FormInteraction } from "./FormInteraction.js";

class App {
  private formStructure!: FormStructure;
  private formInteraction!: FormInteraction;
  private form!: RegistrationForm;

  constructor() {
    // Initializes the application
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  private init(): void {
    this.formStructure = new FormStructure('form-container');

    const jobRoleMenu = document.getElementById('title') as HTMLSelectElement;
    const otherJobRole = document.getElementById('other-job-role') as HTMLInputElement;
    const shirtDesign = document.getElementById('design') as HTMLSelectElement;
    const shirtColor = document.getElementById('color') as HTMLSelectElement;
    const activities = document.getElementById('activities-box') as HTMLElement;
    const activitiesCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const totalCost = 0;
    const payment = document.getElementById('payment') as HTMLSelectElement;

    const paymentMethods = {
      creditCard: document.getElementById('credit-card') as HTMLElement,
      paypal: document.getElementById('paypal') as HTMLElement,
      bitcoin: document.getElementById('bitcoin') as HTMLElement,
    };

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

    this.form = new RegistrationForm(this.formStructure, this.formInteraction);

    this.form.getFormElements();
    this.form.addEventListeners();

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
