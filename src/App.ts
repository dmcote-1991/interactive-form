/**
 * The App class is responsible for managing the entire form application. 
 * It initializes the form structure, handles user interactions, and validates 
 * inputs to ensure data integrity. The class listens for the DOMContentLoaded 
 * event to ensure the HTML is fully loaded before performing any operations.
 * 
 * Key functionalities include:
 * - Creating and injecting the form structure into the specified container.
 * - Retrieving and managing form elements for user interaction.
 * - Setting up handlers for form interaction and validation processes.
 * - Configuring the initial state of the form (e.g., hiding/showing fields, 
 *   managing input dependencies).
 * 
 * This class serves as the main entry point for the application, orchestrating 
 * the interaction between various components such as FormStructure, 
 * FormInteraction, and FormValidation.
 */

import { FormStructure } from "./FormStructure.js";
import { FormInteraction } from "./FormInteraction.js";
import { FormValidation } from "./FormValidation.js";

class App {
  private formStructure!: FormStructure;
  private formInteraction!: FormInteraction;
  private formValidation!: FormValidation;

  constructor() {
    // Listen for the DOMContentLoaded event to ensure the HTML is fully loaded before initializing
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  /**
   * Initializes the form by creating its structure, retrieving elements, 
   * setting up interaction and validation handlers, and configuring the initial state.
   */
  private init(): void {
    // Create and inject the form structure into the specified container
    this.formStructure = new FormStructure('form-container');

    // Retrieve form elements by their IDs for further manipulation and interaction
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const jobRoleMenu = document.getElementById('title') as HTMLSelectElement;
    const otherJobRole = document.getElementById('other-job-role') as HTMLInputElement;
    const shirtDesign = document.getElementById('design') as HTMLSelectElement;
    const shirtColor = document.getElementById('color') as HTMLSelectElement;
    const activities = document.getElementById('activities-box') as HTMLElement;
    const activitiesCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const totalCost = 0; // Initialize total activity cost
    const payment = document.getElementById('payment') as HTMLSelectElement;
    const creditCard = document.getElementById('credit-card') as HTMLElement;
    const paypal = document.getElementById('paypal') as HTMLElement;
    const bitcoin = document.getElementById('bitcoin') as HTMLElement;
    const form = document.querySelector('form') as HTMLFormElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const cardNumber = document.getElementById('cc-num') as HTMLInputElement;
    const zipCode = document.getElementById('zip') as HTMLInputElement;
    const cvv = document.getElementById('cvv') as HTMLInputElement;

    // Group payment method elements for easier toggling
    const paymentMethods = { creditCard, paypal, bitcoin };

    // Initialize form interaction handlers to manage UI-related functionality
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

    // Initialize form validation handlers to validate user inputs
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

    // Attach event listeners for user interaction and validation
    this.formInteraction.addEventListeners();
    this.formValidation.addEventListeners();

    // Set the initial form state (such as hiding/showing fields, setting focus, etc.)
    this.initializeFormState(otherJobRole, shirtColor)
  }

  /**
   * Set the initial form state, including hiding/showing fields and setting focus.
   * @param otherJobRole - The "Other Job Role" input field to manage visibility
   * @param shirtColor - The shirt color selection dropdown to manage state
   */
  private initializeFormState(otherJobRole: HTMLInputElement, shirtColor: HTMLSelectElement): void {
    // Hide the "Other Job Role" field initially
    otherJobRole.style.display = 'none';

    // Disable shirt color selection until a design is chosen
    shirtColor.disabled = true;

    // Automatically focus on the name inut for user convenience
    const nameInput = document.getElementById('name') as HTMLInputElement;
    nameInput.focus(); 
  }
}

new App();
