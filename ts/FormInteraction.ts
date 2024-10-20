/**
 * Manages form interactions for a registration form, including event handling, 
 * dynamic updates to form elements, and payment information display.
 * This class provides methods to control the visibility of form sections, update the total cost of activities,
 * handle payment options, and manage other form behaviors.
 * 
 * @interface PaymentMethods - Interface for the available payment method elements.
 * @class FormInteraction - Represents the form interaction logic and its associated properties.
 */

interface PaymentMethods {
  creditCard: HTMLElement;
  paypal: HTMLElement;
  bitcoin: HTMLElement;
}

export class FormInteraction {
  jobRoleMenu: HTMLSelectElement;
  otherJobRole: HTMLInputElement;
  shirtDesign: HTMLSelectElement;
  shirtColor: HTMLSelectElement;
  activities: HTMLElement;
  activitiesCheckboxes: NodeListOf<HTMLInputElement>;
  totalCost: number;
  payment: HTMLSelectElement;
  paymentMethods: PaymentMethods;
  
  constructor(
    jobRoleMenu: HTMLSelectElement, 
    otherJobRole: HTMLInputElement,
    shirtDesign: HTMLSelectElement,
    shirtColor: HTMLSelectElement,
    activities: HTMLElement,
    activitiesCheckboxes: NodeListOf<HTMLInputElement>,
    totalCost: number,
    payment: HTMLSelectElement,
    paymentMethods: PaymentMethods
  ) {
    // Initialize form interaction properties
    this.jobRoleMenu = jobRoleMenu;
    this.otherJobRole = otherJobRole;
    this.shirtDesign = shirtDesign;
    this.shirtColor = shirtColor;
    this.activities = activities;
    this.activitiesCheckboxes = activitiesCheckboxes;
    this.totalCost = totalCost;
    this.payment = payment;
    this.paymentMethods = paymentMethods;
  }

  /**
   * Attach event listeners to various form elements to handle user actions
   */
  addEventListeners(): void {
    this.jobRoleMenu.addEventListener('change', this.toggleOtherJobRole.bind(this));
    this.shirtDesign.addEventListener('change', this.updateShirtColor.bind(this));
    this.activities.addEventListener('change', this.updateActivitiesCost.bind(this));
    this.payment.addEventListener('change', this.updatePaymentInfo.bind(this));
  }

  /**
   * Display or hide the "Other Job Role" field based on the selected job role.
   * @param e - The change event from the job role dropdown
   */
  toggleOtherJobRole(e: Event): void {
    const selectedJob = (e.target as HTMLSelectElement).value;
    this.otherJobRole.style.display = selectedJob === 'other' ? 'block' : 'none';
  }

  /**
   * Reset the shirt color selection to the default "Select a color" state.
   */
  resetColorSelection(): void {
    const defaultOption = this.shirtColor.querySelector('option[selected]') as HTMLOptionElement;
    defaultOption.textContent = 'Select a color';
    this.shirtColor.value = defaultOption.value;
  }

  /**
   * Enable shirt color options that match the selected shirt dessign
   * @param e - The change event from the shirt design dropdown
   */
  updateShirtColor(e: Event): void {
    const selectedTheme = (e.target as HTMLSelectElement).value;
    this.shirtColor.disabled = false;

    // Show or hide color options based on the selected theme
    for (let i = 0; i < this.shirtColor.children.length; i++) {
      const colorOption = this.shirtColor.children[i] as HTMLOptionElement;
      const dataTheme = colorOption.getAttribute('data-theme');
      
      colorOption.style.display = dataTheme === selectedTheme ? 'block' : 'none'
    }

    // Reset the color selection to the default state
    this.resetColorSelection();
  }

  /**
   * Update the total cost of selected activities and mangage conflicting schedules
   * @param e - The change event from the activities selection
   */
  updateActivitiesCost(e: Event): void {
    const target = e.target as HTMLInputElement;
    const dataCost = +target.getAttribute('data-cost')!;
    let activitiesCost = document.getElementById('activities-cost')!;

    // Add or subtract the cost on the checkbox state
    if (target.checked) {
      this.totalCost += dataCost;
    } else {
      this.totalCost -= dataCost;
    }

    // Display the updated total cost
    activitiesCost.textContent = `Total: $${this.totalCost}`;

    // Disable or enable conflicting activities
    this.toggleDisabledActivities(target);
  }

  /**
   * Disable or enable conflicting activities based on the selected activity
   * @param selectedActivity - The activity checkbox that was selected or deselected
   */
  toggleDisabledActivities(selectedActivity: HTMLInputElement): void {
    const selectedDateTime = selectedActivity.getAttribute('data-day-and-time');

    // Loop through other activities to disable those with conflicting schedules
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

  /**
   * Show the appropriate payment method details based on the selected option
   * @param e - The change event from the payment method dropdown
   */
  updatePaymentInfo(e: Event): void {
    // Hide all payment options initially
    this.paymentMethods.creditCard.style.display = 'none';
    this.paymentMethods.paypal.style.display = 'none';
    this.paymentMethods.bitcoin.style.display = 'none';

    // Show the selected payment method details
    const target = e.target as HTMLSelectElement;
    const selectedPayment = document.getElementById(target.value);

    if (selectedPayment) {
      selectedPayment.style.display = 'block';
    }
  }
}
