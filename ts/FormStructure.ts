export class FormStructure {
  containerId: string;

  constructor(containerId: string) {
    this.containerId = containerId;
    this.injectFormHTML();
  }

  /**
   * Inject the form HTML into the DOM
  */
  injectFormHTML(): void {
    const formContainer = document.getElementById(this.containerId);

    if (formContainer) {
      formContainer.innerHTML = `
        <form action="index.html" method="post" novalidate>
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
                />
                <span id="name-hint" class="name-hint hint">
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
                />
                <span id="email-hint" class="email-hint hint">
                  Email address must be formatted correctly
                </span>
              </label>

              <label for="title">Job Role</label>
              <select id="title" name="user-title">
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
              />
            </fieldset>

            <fieldset class="shirts">
              <legend>T-Shirt Info</legend>
              <div class="shirt-div-box">
                <div id="shirt-sizes" class="shirt-sizes">
                  <label for="size">Size:</label>
                  <select id="size" name="user-size">
                    <option value="small">S</option>
                    <option value="medium" selected>M</option>
                    <option value="large">L</option>
                    <option value="extra large">XL</option>
                    <option value="extra large">XXL</option>
                  </select>
                </div>

                <div id="shirt-designs" class="shirt-designs">
                  <label for="design">Design:</label>
                  <select id="design" name="user-design">
                    <option hidden>Select Theme</option>
                    <option value="js puns">Theme - JS Puns</option>
                    <option value="heart js">Theme - I &#9829; JS</option>
                  </select>
                </div>

                <div id="shirt-colors" class="shirt-colors">
                  <label for="color">Color:</label>
                  <select id="color">
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
            <div id="activities-box" class="activities-box error-border">
              <label>
                <input type="checkbox" name="all" data-cost="200" />
                <span>Main Conference</span>
                <span class="activity-cost">$200</span>
                <img class="activity-img js-img" src="img/js.svg" alt="" />
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
                <img class="activity-img react-img" src="img/react.svg" alt="" />
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
                <img class="activity-img node-img" src="img/node.svg" alt="" />
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
                  alt=""
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
                <img class="activity-img build-img" src="img/build.svg" alt="" />
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
                <img class="activity-img npm-img" src="img/npm.svg" alt="" />
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
                  alt=""
                />
              </label>
            </div>
            <p id="activities-cost" class="activities-cost">Total: $0</p>
            <p id="activities-hint" class="hint">Please select at least one activity.</p>
          </fieldset>

          <fieldset class="payment-method">
            <legend>Payment Info</legend>

            <label for="payment">I'm going to pay with:</label>
            <select id="payment">
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bitcoin">Bitcoin</option>
            </select>

            <div id="credit-card">
              <label for="cc-num">Card Number:</label>
              <input
                type="text"
                id="cc-num"
                name="user-cc-num"
                placeholder="enter a number between 13 and 16 digits"
              />
              <span id="cc-hint" class="cc-hint hint">
                Please enter a number between 13 and 16 digits.
              </span>

              <label for="zip">ZIP Code:</label>
              <input
                type="text"
                id="zip"
                name="user-zip"
                placeholder="enter 5 digit ZIP code"
              />
              <span id="zip-hint" class="zip-hint hint">
                Enter a 5 digit ZIP code.
              </span>

              <label for="cvv">CVV:</label>
              <input type="text" id="cvv" name="user-cvv" placeholder="enter 3 digit CVV" />
              <span id="cvv-hint" class="cvv-hint hint">Enter a 3 digit CVV number.</span>
            </div>

            <div id="paypal">
              <p>PayPal account information will be provided after submitting the form.</p>
            </div>

            <div id="bitcoin">
              <p>Bitcoin wallet information will be provided after submitting the form.</p>
            </div>
          </fieldset>

          <button type="submit" id="submit">Submit</button>
        </form>
      `;
    }
  }
}
