/**
 * The FormStructure class is responsible for setting up and rendering the 
 * HTML structure of a user registration form. The form includes multiple 
 * sections such as basic user information, T-shirt selection, activity 
 * registration, and payment details. This class dynamically injects the 
 * form's HTML into a specified container on the page. It supports features 
 * like real-time validation hints, payment method selection, and total cost 
 * calculation for selected activities. The form's layout is designed to 
 * be user-friendly, guiding users through various registration steps 
 * while ensuring the required fields are clearly indicated.
 */

export class FormStructure {
  private containerId: string;

  constructor(containerId: string) {
    // Store the ID of the container where the form will be rendered
    this.containerId = containerId;

    // Initialize the form by rendering its HTML structure
    this.injectFormHTML();
  }

  /**
   * Injects the HTML structure for the registration form into the specified container.
   * @returns {void} - No return value; the form's HTML is rendered directly in the container element
   */
  injectFormHTML(): void {
    // Find the container element by its ID
    const formContainer = document.getElementById(this.containerId);

    if (formContainer) {
      // Define the form's HTML structure
      formContainer.innerHTML = `
        <form action="index.html" method="post" novalidate>
          <h2 id="form-title" class="sr-only">Registration Form for Full Stack Conference</h2>
          <p id="form-hint" class="form-hint">
            <span class="asterisk">*</span> - required field
          </p>

          <div class="basic-info-and-shirt-box">
            <fieldset class="basic-info">
              <legend>Basic Info</legend>

              <label for="name">Name: <span class="asterisk">*</span>
                <input
                  type="text"
                  id="name"
                  name="user-name"
                  class="error-border"
                  aria-describedby="name-hint"
                  required
                />
                <span id="name-hint" class="name-hint hint" role="alert">
                  Name field cannot be blank
                </span>
              </label>

              <label for="email">Email Address: <span class="asterisk">
                *
              </span>
                <input
                  type="email"
                  id="email"
                  name="user-email"
                  class="error-border"
                  aria-describedby="email-hint"
                  required
                />
                <span id="email-hint" class="email-hint hint" role="alert">
                  Email address must be formatted correctly
                </span>
              </label>

              <label for="title">Job Role</label>
              <select id="title" name="user-title" aria-required="true">
                <option hidden>Select Job Role</option>
                <option value="full-stack js developer">Full Stack JavaScript Developer</option>
                <option value="front-end developer">Front End Developer</option>
                <option value="back-end developer">Back End Developer</option>
                <option value="designer">Designer</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                name="other-job-role"
                id="other-job-role"
                class="other-job-role"
                placeholder="Other job role?"
                aria-label="Other job role"
              />
            </fieldset>

            <fieldset class="shirts">
              <legend>T-Shirt Info</legend>
              <div class="shirt-div-box">
                <div id="shirt-sizes" class="shirt-sizes">
                  <label for="size">Size:</label>
                  <select id="size" name="user-size" aria-label="T-shirt size">
                    <option value="small">S</option>
                    <option value="medium" selected>M</option>
                    <option value="large">L</option>
                    <option value="extra large">XL</option>
                    <option value="extra large">XXL</option>
                  </select>
                </div>

                <div id="shirt-designs" class="shirt-designs">
                  <label for="design">Design:</label>
                  <select id="design" name="user-design" aria-label="T-shirt design">
                    <option hidden>Select Theme</option>
                    <option value="js puns">Theme - JS Puns</option>
                    <option value="heart js">Theme - I &#9829; JS</option>
                  </select>
                </div>

                <div id="shirt-colors" class="shirt-colors">
                  <label for="color">Color:</label>
                  <select id="color" aria-label="Shirt color selection">
                    <option selected hidden>Select a design theme above</option>
                    <option data-theme="js puns" value="cornflowerblue">
                      Cornflower Blue (JS Puns shirt only)
                    </option>
                    <option data-theme="js puns" value="darkslategrey">
                      Dark Slate Grey (JS Puns shirt only)
                    </option>
                    <option data-theme="js puns" value="gold">
                      Gold (JS Puns shirt only)
                    </option>
                    <option data-theme="heart js" value="tomato">
                      Tomato (I &#9829; JS shirt only)
                    </option>
                    <option data-theme="heart js" value="steelblue">
                      Steel Blue (I &#9829; JS shirt only)
                    </option>
                    <option data-theme="heart js" value="dimgrey">
                      Dim Grey (I &#9829; JS shirt only)
                    </option>
                  </select>
                </div>
              </div>
            </fieldset>
          </div>

          <fieldset id="activities" class="activities">
            <legend>
              Register for Activities <span class="asterisk">*</span>
            </legend>
            <div id="activities-box" class="activities-box error-border" aria-labelledby="activities-hint">
              <label>
                <input type="checkbox" name="all" data-cost="200" />
                <span>Main Conference</span>
                <span class="activity-cost">$200</span>
                <img class="activity-img js-img" src="img/js.svg" alt="JavaScript logo" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="js-libs"
                  data-day-and-time="Tuesday 9am-12pm"
                  data-cost="100"
                />
                <span>JavaScript Libraries Workshop</span>
                <span>Tuesday 9am-12pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img react-img" src="img/react.svg" alt="React logo" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="node"
                  data-day-and-time="Tuesday 1pm-4pm"
                  data-cost="100"
                />
                <span>Node.js Workshop</span>
                <span>Tuesday 1pm-4pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img node-img" src="img/node.svg" alt="Node.js logo" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="js-frameworks"
                  data-day-and-time="Tuesday 9am-12pm"
                  data-cost="100"
                />
                <span>JavaScript Frameworks Workshop</span>
                <span>Tuesday 9am-12pm</span>
                <span class="activity-cost">$100</span>
                <img
                  class="activity-img angular-img"
                  src="img/angular.svg"
                  alt="Angular logo"
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="build-tools"
                  data-day-and-time="Tuesday 1pm-4pm"
                  data-cost="100"
                />
                <span>Build tools Workshop</span>
                <span>Tuesday 1pm-4pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img build-img" src="img/build.svg" alt="Build tools logo" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="npm"
                  data-day-and-time="Wednesday 9am-12pm"
                  data-cost="100"
                />
                <span>npm Workshop</span>
                <span>Wednesday 9am-12pm</span>
                <span class="activity-cost">$100</span>
                <img class="activity-img npm-img" src="img/npm.svg" alt="npm logo" />
              </label>
              <label>
                <input
                  type="checkbox"
                  name="express"
                  data-day-and-time="Wednesday 1pm-4pm"
                  data-cost="100"
                />
                <span>Express Workshop</span>
                <span>Wednesday 1pm-4pm</span>
                <span class="activity-cost">$100</span>
                <img
                  class="activity-img express-img"
                  src="img/express.svg"
                  alt="Express logo"
                />
              </label>
            </div>

            <p id="activities-cost" class="activities-cost" aria-live="polite">
              Total: $0
            </p>
            <p id="activities-hint" class="hint" role="alert">
              Please select at least one activity.
            </p>
          </fieldset>

          <fieldset class="payment-method" aria-labelledby="payment-method-label">
            <legend id="payment-method-label">Payment Info</legend>

            <label for="payment">I'm going to pay with:</label>
            <select id="payment" aria-labelledby="payment">
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bitcoin">Bitcoin</option>
            </select>

            <div id="credit-card" role="group" aria-labelledby="credit-card-label">
              <legend id="credit-card-label">Credit Card Information</legend>

              <label for="cc-num">Card Number:</label>
              <input
                type="text"
                id="cc-num"
                name="user-cc-num"
                placeholder="enter a number between 13 and 16 digits"
                aria-describedby="cc-hint"
                required
              />
              <span id="cc-hint" class="cc-hint hint" role="alert">
                Please enter a number between 13 and 16 digits.
              </span>

              <label for="zip">ZIP Code:</label>
              <input
                type="text"
                id="zip"
                name="user-zip"
                placeholder="enter 5 digit ZIP code"
                aria-describedby="zip-hint"
                required
              />
              <span id="zip-hint" class="zip-hint hint" role="alert">
                Enter a 5 digit ZIP code.
              </span>

              <label for="cvv">CVV:</label>
              <input 
                type="text" 
                id="cvv" 
                name="user-cvv" 
                placeholder="enter 3 digit CVV" 
                aria-describedby="cvv-hint"
                required
              />
              <span id="cvv-hint" class="cvv-hint hint" role="alert">
                Enter a 3 digit CVV number.
              </span>
            </div>

            <div id="paypal">
              <p>PayPal account information will be provided after submitting the form.</p>
            </div>

            <div id="bitcoin">
              <p>Bitcoin wallet information will be provided after submitting the form.</p>
            </div>
          </fieldset>

          <button type="submit" id="submit" aria-label="Submit the registration form">Submit</button>
        </form>
      `;
    }
  }
}
