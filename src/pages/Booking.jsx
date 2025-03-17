import { useState } from "react";
import validator from "validator";

export function BookingForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const validateEmail = (e) => (setEmail = e.target.value);
  if (validator.isEmail(email)) {
    setEmailError("valid Email :)");
  } else {
    setEmailError("Please enter a valid email.");
  }

  // add phone number validation

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <fieldset>
          <h2>Book your spot for the next event!</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>

            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First name"
              required
            ></input>
            <label>
              First name <sup>*</sup>
            </label>
          </div>

          <div className="Field">
            <label>
              Last name <sup>*</sup>
            </label>

            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
              required
            ></input>
          </div>
        </fieldset>

        <button type="submit">Book my spot</button>
      </form>
    </div>
  );
}
