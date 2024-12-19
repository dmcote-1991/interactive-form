/**
 * The FormInteraction class handles all user interaction-related functionality. 
 * It includes methods for enabling/disabling fields, showing/hiding elements, 
 * and managing dependencies between form inputs.
 */

export class FormInteraction {
  jobRoleMenu: HTMLSelectElement;
  otherJobRole: HTMLInputElement;
  shirtDesign: HTMLSelectElement;
  shirtColor: HTMLSelectElement;
  activities: HTMLElement;
  activitiesCheckboxes: NodeListOf<HTMLInputElement>;
  totalCost: number;
  payment: HTMLSelectElement;
  paymentMethods: { [key: string]: HTMLElement };
  
  constructor(
    jobRoleMenu: HTMLSelectElement, 
    otherJobRole: HTMLInputElement,
    shirtDesign: HTMLSelectElement,
    shirtColor: HTMLSelectElement,
    activities: HTMLElement,
    activitiesCheckboxes: NodeListOf<HTMLInputElement>,
    totalCost: number,
    payment: HTMLSelectElement,
    paymentMethods: { [key: string]: HTMLElement }
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
   * Initialize the form state, including the payment info section.
   */
  public initializeFormState(
    otherJobRole: HTMLInputElement, 
    shirtColor: HTMLSelectElement,
    nameInput: HTMLInputElement
  ): void {
    // Hide the "Other Job Role" field initially
    otherJobRole.style.display = 'none';

    // Disable shirt color selection until a design is chosen
    shirtColor.disabled = true;

    // Automatically focus on the name input for user convenience
    nameInput.focus(); 

    // Initialize payment info visibility
    this.updatePaymentInfo();
  }

  /**
   * Attach event listeners to various form elements to handle user actions
   */
  addEventListeners(): void {
    this.jobRoleMenu.addEventListener('change', this.toggleOtherJobRole.bind(this));
    this.shirtDesign.addEventListener('change', this.updateShirtColor.bind(this));
    this.activities.addEventListener('change', this.updateActivitiesCost.bind(this));
    this.payment.addEventListener('change', this.updatePaymentInfo.bind(this));

    // Prevent form submission when Enter is pressed while a checkbox is focused
    this.activitiesCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          checkbox.checked = !checkbox.checked; // Toggle checkbox state
          this.updateActivitiesCost(e); // Updates the total price
          this.toggleDisabledActivities(checkbox); // Disables any activities where date/time conflicts
          e.preventDefault(); // Prevent the form submission
        }
      });
    });
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
   * and hide others during initialization.
   * @param e - The change event from the payment method dropdown
   */
  updatePaymentInfo(e?: Event): void {
    // Hide all payment options initially
    this.paymentMethods.creditCard.style.display = 'none';
    this.paymentMethods.paypal.style.display = 'none';
    this.paymentMethods.bitcoin.style.display = 'none';

    // Determine the selected payment method
    const target = e ? (e.target as HTMLSelectElement) : this.payment;
    const selectedPayment = document.getElementById(target.value);

    if (selectedPayment) {
      selectedPayment.style.display = 'block';
    }
  }
}
