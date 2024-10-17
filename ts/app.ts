import { RegistrationForm } from "./RegistrationForm.js";
import { FormStructure } from "./FormStructure.js";
import { FormInteraction } from "./FormInteraction.js";

// Instantiate the form when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const formStructure = new FormStructure('form-container');

  const jobRoleMenu = document.getElementById(`title`) as HTMLSelectElement;
  const otherJobRole = document.getElementById(`other-job-role`) as HTMLInputElement;
  const shirtDesign = document.getElementById(`design`) as HTMLSelectElement;
  const shirtColor = document.getElementById(`color`) as HTMLSelectElement;
  const activities  = document.getElementById(`activities-box`) as HTMLElement;
  const activitiesCheckboxes = document.querySelectorAll(`#activities input[type="checkbox"]`) as NodeListOf<HTMLInputElement>;
  const totalCost = 0;
  const payment = document.getElementById(`payment`) as HTMLSelectElement;

  const paymentMethods = {
    creditCard: document.getElementById('credit-card') as HTMLElement,
    paypal: document.getElementById('paypal') as HTMLElement,
    bitcoin: document.getElementById('bitcoin') as HTMLElement,
  };

  const formInteraction = new FormInteraction(
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
  
  const form = new RegistrationForm(formStructure, formInteraction);
});
