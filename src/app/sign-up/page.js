"use client";

import React, { useState } from "react";
import "../css/form.css";
import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Survey() {
  const [savedData, setSavedData] = useState(null);
  const [error, setError] = useState(null);
  const [allergies, setAllergies] = useState(false);
  const [specificAllergy, setSpecificAllergy] = useState("");

  const handleDietaryChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    if (selectedOptions.includes("allergies")) {
      setAllergies(true);
    } else {
      setAllergies(false);
      setSpecificAllergy("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      let response = await fetch("/api", {
        method: "POST",
        body: formData,
      });
      console.log(formData);
      response = await response.json();
      setSavedData(response);
      setError(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen home-container [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-2xl p-8 rounded-lg formBox">
            <div className="flex justify-center mb-6">
              <Image
                className="hack-logo dark:drop-shadow-[0_0_0.3rem_#ffffff70] light:invert"
                src="/hackText24.png"
                alt="hackUMBC Logo"
                width={480}
                height={480}
              />
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Sign Up Form
            </h2>
            <h3 className="text-2sm font-bold mb-4 text-center text-gray-300">
              Enter your information to proceed..
            </h3>
            <hr className="w-full border-gray-300 mb-6" />

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="school"
                >
                  School <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="school"
                  name="school"
                  type="text"
                  placeholder="Enter your school"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="classYear"
                >
                  Class Year <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="classYear"
                  name="classYear"
                  required
                >
                  {Array.from({ length: 26 }, (_, i) => (
                    <option key={2010 + i} value={2010 + i}>
                      {2010 + i}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="gender"
                  name="gender"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="preferNotToSay">Prefer not to say</option>
                </select>
              </div>

              {/* Ethnicity Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="ethnicity"
                >
                  Ethnicity <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="ethnicity"
                  name="ethnicity"
                  required
                >
                  <option value="asian">Asian</option>
                  <option value="black">Black or African American</option>
                  <option value="hispanic">Hispanic or Latino</option>
                  <option value="white">White</option>
                  <option value="other">Other</option>
                  <option value="preferNotToSay">Prefer not to say</option>
                </select>
              </div>

              {/* Major Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="major"
                >
                  Major <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="major"
                  name="major"
                  required
                >
                  <option value="computerScience">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                  <option value="biology">Biology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Age Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  required
                />
              </div>

              {/* Phone Field (Optional) */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone (Optional)
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Country Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="country"
                  name="country"
                  required
                >
                  {/* Example of a few country options */}
                  <option value="us">United States</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="india">India</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Resume Upload Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="resume"
                >
                  Upload Resume (PDF only)
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="resume"
                  name="resume"
                  type="file"
                  accept="application/pdf"
                />
              </div>

              {/* Discord ID (Optional) */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="discordId"
                >
                  Discord ID (Optional)
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="discordId"
                  name="discordId"
                  type="text"
                  placeholder="Enter your Discord ID"
                />
              </div>

              {/* T-Shirt Size */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="tshirtSize"
                >
                  T-Shirt Size <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="tshirtSize"
                  name="tshirtSize"
                  required
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                </select>
              </div>

              {/* Dietary Restrictions */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="dietaryRestrictions"
                >
                  Dietary Restrictions <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  multiple
                  onChange={handleDietaryChange}
                >
                  <option value="halal">Halal</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="allergies">Allergies</option>
                </select>
              </div>
              {allergies && (
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="specificAllergy"
                  >
                    Please specify your allergies
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    id="specificAllergy"
                    name="specificAllergy"
                    type="text"
                    placeholder="Enter specific allergies"
                    value={specificAllergy}
                    onChange={(e) => setSpecificAllergy(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {savedData && (
              <p className="text-green-500 mt-4">
                Form submitted successfully!
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
