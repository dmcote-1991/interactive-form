import { RegistrationForm } from "./RegistrationForm.js";
import { FormStructure } from "./FormStructure.js";

// Instantiate the form when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const formStructure = new FormStructure('form-container');
  const form = new RegistrationForm(formStructure);
});
