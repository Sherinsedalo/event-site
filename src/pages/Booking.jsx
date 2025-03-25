import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

export function BookingForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    setEmail(email);
    if (!email) {
      setEmailError("");
      return;
    }
    setEmailError(
      validator.isEmail(email) ? "✅" : "❌ Please enter a valid email"
    );
  };

  const validatePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    if (!phoneNumber) {
      setPhoneError("");
      return;
    }
    if (
      phoneNumber.length < 9 ||
      !validator.isMobilePhone(phoneNumber, "any")
    ) {
      setPhoneError("❌ Please enter a valid phone number");
    } else {
      setPhoneError("✅");
    }
  };

  const getIsFormValid = () => {
    return (
      firstName &&
      lastName &&
      validator.isEmail(email) &&
      validator.isMobilePhone(phoneNumber, "any")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8EDE3] p-8">
      <div className="w-full max-w-3xl bg-[#F8F2E9] p-10 rounded-2xl shadow-xl text-[#6D4C41]">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              Thank you for your submission!🎉
            </h2>
            <p className="mt-2 text-lg">
              We will email your with more details about the next event soon.
            </p>
            <Link
              to="/event"
              className="mt-6 bg-[#D8A7B1] text-white px-6 p-2 rounded-lg shadow-md hover:bg-[#B47B84] inline-block"
            >
              Go to home page
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset>
              <h2 className="text-2xl font-semibold text-center">
                Book your spot for the next event!🎟️
              </h2>
              <div>
                <label className="block font-medium">
                  First name <sup>*</sup>
                </label>

                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-[#D8A7B1]"
                ></input>
              </div>

              <div>
                <label className="block font-medium">
                  Last name <sup>*</sup>
                </label>

                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last name"
                  required
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-[#D8A7B1]"
                ></input>
              </div>
              <div>
                <label className="block font-medium">Email address</label>
                <input
                  value={email}
                  onChange={(e) => {
                    validateEmail(e.target.value);
                  }}
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-[#D8A7B1]"
                ></input>
                {emailError}
              </div>
              <div>
                <label className="block font-medium">Phone number</label>
                <input
                  value={phoneNumber}
                  onChange={(e) => {
                    validatePhoneNumber(e.target.value);
                  }}
                  className="w-full p-2 border rounded-lg shadow-sm focus:ring-[#D8A7B1]"
                ></input>
                {phoneError}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!getIsFormValid()}
              className="w-full bg-[#D8A7B1] text-white py-2 rounded-lg shadow-md hover:bg-[#B47B84] disabled:bg-gray-300"
            >
              Book My Seat
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
