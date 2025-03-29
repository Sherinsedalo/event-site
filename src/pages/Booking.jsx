import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
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
  const [allergies, setAllergies] = useState("no");
  const [allergyDetails, setAllergyDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      validator.isMobilePhone(phoneNumber, "any") &&
      (allergies === "no" || (allergies === "yes" && allergyDetails))
    );
  };

  const handleAllergyChange = (e) => {
    setAllergies(e.target.value);
  };

  const handleAllergyDetailsChange = (e) => {
    setAllergyDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (allergyDetails === "yes" && !allergyDetails) {
      alert("Please provide allergy information");
      return;
    }
    try {
      await addDoc(collection(db, "bookings"), {
        firstName,
        lastName,
        email,
        phoneNumber,
        timestamp: new Date(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("error saving bookings", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8EDE3] p-8">
      <div className="w-full max-w-3xl bg-[#F8F2E9] p-10 rounded-2xl shadow-xl text-[#6D4C41]">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              Thank you for your registration!🎉
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
                Book your spot for the next event! 🎟️
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

              <div className="space-y-2">
                <label className="block font-medium">
                  Do you have any allergies?
                </label>

                <div className="flex space-x-6">
                  <div className="flex item-center">
                    <input
                      type="radio"
                      id="allergies-yes"
                      name="allergies"
                      value="yes"
                      checked={allergies === "yes"}
                      onChange={handleAllergyChange}
                      className=" appearance-none h-4 w-4 border-2 rounded-full border-gray-300 focus:ring-[#D8A7B1] focus:ring-2 checked:bg-[#D8A7B1] checked:border-[#D8A7B1] transition-colors"
                    />
                    <label htmlFor="allergies-yes" className="ml-2">
                      yes{" "}
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex item-center">
                    <input
                      type="radio"
                      id="allergies-no"
                      name="allergies"
                      value="no"
                      checked={allergies === "no"}
                      onChange={handleAllergyChange}
                      className="appearance-none h-4 w-4 border-2 rounded-full border-gray-300 focus:ring-[#D8A7B1] focus:ring-2 checked:bg-[#D8A7B1] checked:border-[#D8A7B1] transition-colors"
                    />
                    <label htmlFor="allergies-no" className="ml-2">
                      no
                    </label>
                  </div>
                </div>
              </div>

              {allergies === "yes" && (
                <div>
                  <label className="block font-medium">
                    Please specify your allergies:
                  </label>
                  <textarea
                    value={allergyDetails}
                    onChange={handleAllergyDetailsChange}
                    required={allergies === "yes"}
                    className="w-full p-2 border rounded-lg shadow-sm focus:ring-[#D8A7B1]"
                  />
                </div>
              )}
            </fieldset>

            <button
              type="submit"
              disabled={!getIsFormValid() || isSubmitting}
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