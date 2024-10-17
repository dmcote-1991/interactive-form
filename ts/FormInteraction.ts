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

  /*
   * Add event listeners for various form elements
  */
  addEventListeners(): void {
    this.jobRoleMenu.addEventListener('change', this.toggleOtherJobRole.bind(this));
    this.shirtDesign.addEventListener('change', this.updateShirtColor.bind(this));
    this.activities.addEventListener('change', this.updateActivitiesCost.bind(this));
    this.payment.addEventListener('change', this.updatePaymentInfo.bind(this));
  }

  /*
   * Show or hide the 'other' job role input based on selected job role
  */
  toggleOtherJobRole(e: Event): void {
    const selectedJob = (e.target as HTMLSelectElement).value;
    this.otherJobRole.style.display = selectedJob === 'other' ? 'block' : 'none';
  }

  /*
   * Reset the shirt color selection to default
  */
  resetColorSelection(): void {
    const defaultOption = this.shirtColor.querySelector('option[selected]') as HTMLOptionElement;
    defaultOption.textContent = 'Select a color';
    this.shirtColor.value = defaultOption.value;
  }

  /* 
   * Update the available shirt colors based on selected design
  */
  updateShirtColor(e: Event): void {
    const selectedTheme = (e.target as HTMLSelectElement).value;
    this.shirtColor.disabled = false;

    // Loop through shirt color options and display based on selected theme
    for (let i = 0; i < this.shirtColor.children.length; i++) {
      const colorOption = this.shirtColor.children[i] as HTMLOptionElement;
      const dataTheme = colorOption.getAttribute('data-theme');
      
      colorOption.style.display = dataTheme === selectedTheme ? 'block' : 'none'
    }

    // Reset shirt color selection to default
    this.resetColorSelection();
  }

  /*
   * Update the total cost of selected activities
  */
  updateActivitiesCost(e: Event): void {
    const target = e.target as HTMLInputElement;
    const dataCost = +target.getAttribute('data-cost')!;
    let activitiesCost = document.getElementById('activities-cost')!;

    // Add or subtract cost on checkbox state
    if (target.checked) {
      this.totalCost += dataCost;
    } else {
      this.totalCost -= dataCost;
    }

    // Update displayed total cost
    activitiesCost.textContent = `Total: $${this.totalCost}`;

    // Toggle disabled state of conflicting activities
    this.toggleDisabledActivities(target);
  }

  /*
   * Disable conflicting activities based on selected one
  */
  toggleDisabledActivities(selectedActivity: HTMLInputElement): void {
    const selectedDateTime = selectedActivity.getAttribute('data-day-and-time');

    // Loop through activity checkboxes to enable/disable based on selected activity
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

  /*
   * Update the visible payment info based on selected payment method
  */
  updatePaymentInfo(e: Event): void {
    // Hide all payment options initially
    this.paymentMethods.creditCard.style.display = 'none';
    this.paymentMethods.paypal.style.display = 'none';
    this.paymentMethods.bitcoin.style.display = 'none';

    // Show selected payment info
    const target = e.target as HTMLSelectElement;
    const selectedPayment = document.getElementById(target.value);

    if (selectedPayment) {
      selectedPayment.style.display = 'block';
    }
  }
}
