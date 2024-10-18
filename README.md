# Interactive-Form

This project is a dynamic, interactive registration form for a conference or event, built using TypeScript. It allows users to register for various activities, choose shirt designs and sizes, and select a payment method, while providing form validation and real-time feedback to the user.

## Features

- **Basic Info Section**: Collects the user's name, email, and job role.
- **T-Shirt Info**: Allows users to select a T-shirt size and design. Shirt colors are filtered based on the selected design.
- **Activity Registration**: Users can select one or more activities to attend, with real-time updates on the total cost. Conflicting activities are disabled automatically.
- **Payment Info**: Supports payment options such as Credit Card, PayPal, and Bitcoin. Fields for credit card payments are validated in real-time.
- **Form Validation**: Ensures that all required fields are filled out correctly before submission, with hints displayed for invalid inputs.

## Project Structure

```bash
/interactive-form
├── index.html
├── css
│   ├── normalize.css
│   └── style.css
├── img
│   ├── angular.svg   # Angular logo
│   ├── build.svg     # Tool icon
│   ├── caret.png     # Icon for dropdown menus
│   ├── express.svg   # Express logo
│   ├── js.svg        # JavaScript logo
│   ├── node.svg      # NodeJS logo
│   ├── not-valid.svg # Icon for invalid form inputs
│   ├── npm.svg       # npm logo
│   ├── react.svg     # React logo
│   └── valid.svg     # Icon for valid form inputs
├── dist  # Compiled JavaScript files
│   ├── app.js
│   ├── FormStructure.js
│   ├── FormInteraction.js
│   └── FormValidation.js
├── ts
│   ├── app.ts
│   ├── FormStructure.ts
│   ├── FormInteraction.ts
│   └── FormValidation.ts
├── .gitignore 
├── package-lock.json 
├── package.json
├── tsconfig.json 
└── README.md 
```

## Form Sections

1. **Basic Info**:
   - Name
   - Email
   - Job Role (with conditional "Other" field)

2. **T-Shirt Info**:
   - T-Shirt Size
   - T-Shirt Design (Shirt colors are filtered based on the selected design)

3. **Activity Registration**:
   - List of available activities, with real-time total cost update
   - Conflicting activities are automatically disabled

4. **Payment Info**:
   - Payment options: Credit Card, PayPal, Bitcoin
   - Real-time validation for credit card details (Card Number, Zip Code, CVV)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/dmcote-1991/interactive-form.git

2. Navigate to the project directory:
   ```bash
   cd interactive-form

3. Compile the TypeScript files:
   ```bash
   tsc

3. Open `index.html` in your preferred browser

## Usage

- Fill out the required fields, including name, email, and activities.
- If you're selecting a job role other that "Other", you can skip the "Other Job Role" input field.
- Based on your selected T-shirt design, you can choose a shirt color.
- Choose at least one activity to register.
- Select a payment method and fill in the appropriate payment details (only credit card details are validated).
- Submit the form. If any fields are invalid, hints will appear to guide you.

## Form Validation

- **Name**: Cannot be empty, only accepts alphabetic characters and spaces.
- **Email**: Must be in a valid email format (e.g., example@domain.com).
- **Activities**: At least one activity must be selected.
- **Credit Card (if selected)**: Validates that the card number is 13-16 digits, ZIP code is 5 digits, and CVV is 3 digits.

## Future Enhancements

- **Dynamic Error Messaging**: Improve error messaging for individual inputs in real time.
- **Accessibility Improvements**: Add ARIA labels and better keyboard navigation for improved accessibility.
- **Backend Intigration**: Implement form submission to a backend server for storing registration data.
