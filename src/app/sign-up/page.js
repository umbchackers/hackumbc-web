"use client";
import React, { useState, useEffect } from "react";
import "../css/form.css";
import Image from "next/image";
import Navbar from "../components/navbar";
import Papa from "papaparse";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";`
import "../globals.css";
import { StarsBackground } from "../components/stars-background";

export default function Survey() {
  const [savedData, setSavedData] = useState(null);
  const [error, setError] = useState(null);
  const [allergies, setAllergies] = useState(false);
  const [specificAllergy, setSpecificAllergy] = useState("");
  const [universities, setUniversities] = useState([]);
  const [isNonUniStudent, setIsNonUniStudent] = useState(true);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherSchool, setOtherSchool] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isAgreed2, setIsAgreed2] = useState(false);
  const [shareEmail, setShareEmail] = useState(false);
  const [mediaConsent, setMediaConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setIsAgreed2(event.target.checked);
  };

  const handleUniversityChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "not_uni") {
      setIsNonUniStudent(true);
      setIsOtherSelected(false);
    } else if (selectedValue === "other") {
      setIsOtherSelected(true);
      setIsNonUniStudent(false);
    } else {
      setIsNonUniStudent(false);
      setIsOtherSelected(false);
    }
  };

  const PopupNotification = ({ message, position }) => {
    return (
      <div className={`popup-notification ${position}`}>
        {message}
      </div>
    );
  };  
  /*pop up noti */

  useEffect(() => {
    fetch("/mlh_schools.csv")
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: false,
          skipEmptyLines: true,
          complete: (results) => {
            const universityNames = results.data.map((row) => row[0]);
            setUniversities(universityNames);
          },
        });
      })
      .catch((error) => console.error("Error loading universities:", error));
  }, []);

  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  const handleDietaryChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setDietaryRestrictions(selectedOptions);

    if (selectedOptions.includes("allergies")) {
      setAllergies(true);
    } else {
      setAllergies(false);
      setSpecificAllergy("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAgreed || !isAgreed2) {
      setError("You must agree to the conditions to proceed.");
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    const formData = new FormData(event.target);
    formData.append("dietaryRestrictions", dietaryRestrictions.join(", "));

    if (isOtherSelected && otherSchool === "") {
      setError("Please specify your school.");
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSavedData(data);
      setError(null);

      //pop up
      setIsSubmitted(true);  // pop-up appears
      setTimeout(() => {
        setIsSubmitted(false);  // pop-up disappears after 3 seconds
      }, 3000);

      setTimeout(() => {
        setLoading(false);
        setIsSubmitting(false);
        setSavedData(null);
        event.target.reset(); // Reset the form
      }, 8000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setIsSubmitting(false);
        setError("Error submitting form. Please try again.");
      }, 8000);
    }
  };

  return (
    <>
      {savedData && isSubmitted && <PopupNotification message="Form submitted successfully!" position="top-center" />}
      {/* for the pop up^ */}
      <Navbar />
      <div className="sign-up bg-scroll relative">
      <StarsBackground className="absolute inset-0 z-0" />
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-2xl p-8 rounded-lg formBox">
            <div className="flex justify-center mb-6">
              <Image
                className="hack-logo dark:drop-shadow-[0_0_0.3rem_#ffffff70] light:invert"
                src="/hacklogo2025.webp"
                alt="hackUMBC Logo"
                width={480}
                height={480}
              />
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Sign Ups Are CLOSED!
            </h2>
            <p className="text-sm italic mb-6 text-center light-mode-text">
              Fields marked by <span className="text-red-500">*</span> are
              required
            </p>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <hr className="w-full border-gray-300 mb-6" />

            <form className="px-1" onSubmit={handleSubmit}>
              <p className="py-1.5 font-bold text-md light-mode-text">Personal Information</p>
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
              {/* Phone Field (Optional) */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="ex: (123)-456-7891"
                  required
                />
                {/* <PhoneInput
                  country={"us"}
                  value={this.state.phone}
                  onChange={(phone) => this.setState({ phone })}
                /> */}
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="university"
                >
                  University <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="university"
                  name="university"
                  required
                  onChange={handleUniversityChange}
                >
                  <option> Select Option</option>
                  <option value="not_uni">Not a University Student</option>
                  {universities.map((university, index) => (
                    <option key={index} value={university}>
                      {university}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              {isOtherSelected && (
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="otherSchool"
                  >
                    Other School Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    id="otherSchool"
                    name="otherSchool"
                    type="text"
                    placeholder="Enter the name of your school"
                    value={otherSchool}
                    onChange={(e) => setOtherSchool(e.target.value)}
                    required
                  />
                </div>
              )}

              {!isNonUniStudent && !isOtherSelected && (
                <>
                  {/* Major Field */}
                  <div className="mb-4">
                    <label
                      className="block text-white text-sm font-bold mb-2"
                      htmlFor="major"
                    >
                      Major <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                      id="major"
                      name="major"
                      type="text"
                      placeholder="Enter your major"
                      required
                    />
                  </div>

                  {/* Class Year Field */}

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
                      <option> Select Option </option>
                      {Array.from({ length: 26 }, (_, i) => (
                        <option key={2010 + i} value={2010 + i}>
                          {2010 + i}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  What is your level of study?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="less_than_secondary"
                      required
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">
                      Less than Secondary / High School
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="secondary"
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">Secondary / High School</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="undergrad_2year"
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">
                      Undergraduate University (2 year - community college)
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="undergrad_3year"
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">
                      Undergraduate University (3+ year)
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="graduate"
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">
                      Graduate University (Masters, Professional, Doctoral,
                      etc.)
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="vocational"
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">
                      Other Vocational / Trade Program or Apprenticeship
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="other"
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">Other</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="levelOfStudy"
                      value="prefNotToAnswer"
                      className="form-radio text-blue-600 bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">Prefer not to answer</span>
                  </label>
                </div>
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
                  <option value="">Select Option</option>
                  <option value="united_states">United States</option>
                  <option value="afghanistan">Afghanistan</option>
                  <option value="albania">Albania</option>
                  <option value="algeria">Algeria</option>
                  <option value="andorra">Andorra</option>
                  <option value="angola">Angola</option>
                  <option value="antigua_and_barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="argentina">Argentina</option>
                  <option value="armenia">Armenia</option>
                  <option value="australia">Australia</option>
                  <option value="austria">Austria</option>
                  <option value="azerbaijan">Azerbaijan</option>
                  <option value="bahamas">Bahamas</option>
                  <option value="bahrain">Bahrain</option>
                  <option value="bangladesh">Bangladesh</option>
                  <option value="barbados">Barbados</option>
                  <option value="belarus">Belarus</option>
                  <option value="belgium">Belgium</option>
                  <option value="belize">Belize</option>
                  <option value="benin">Benin</option>
                  <option value="bhutan">Bhutan</option>
                  <option value="bolivia">Bolivia</option>
                  <option value="bosnia_and_herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="botswana">Botswana</option>
                  <option value="brazil">Brazil</option>
                  <option value="brunei">Brunei</option>
                  <option value="bulgaria">Bulgaria</option>
                  <option value="burkina_faso">Burkina Faso</option>
                  <option value="burundi">Burundi</option>
                  <option value="cambodia">Cambodia</option>
                  <option value="cameroon">Cameroon</option>
                  <option value="canada">Canada</option>
                  <option value="cape_verde">Cape Verde</option>
                  <option value="central_african_republic">
                    Central African Republic
                  </option>
                  <option value="chad">Chad</option>
                  <option value="chile">Chile</option>
                  <option value="china">China</option>
                  <option value="colombia">Colombia</option>
                  <option value="comoros">Comoros</option>
                  <option value="congo">Congo</option>
                  <option value="costa_rica">Costa Rica</option>
                  <option value="croatia">Croatia</option>
                  <option value="cuba">Cuba</option>
                  <option value="cyprus">Cyprus</option>
                  <option value="czech_republic">Czech Republic</option>
                  <option value="denmark">Denmark</option>
                  <option value="djibouti">Djibouti</option>
                  <option value="dominica">Dominica</option>
                  <option value="dominican_republic">Dominican Republic</option>
                  <option value="east_timor">East Timor</option>
                  <option value="ecuador">Ecuador</option>
                  <option value="egypt">Egypt</option>
                  <option value="el_salvador">El Salvador</option>
                  <option value="equatorial_guinea">Equatorial Guinea</option>
                  <option value="eritrea">Eritrea</option>
                  <option value="estonia">Estonia</option>
                  <option value="eswatini">Eswatini</option>
                  <option value="ethiopia">Ethiopia</option>
                  <option value="fiji">Fiji</option>
                  <option value="finland">Finland</option>
                  <option value="france">France</option>
                  <option value="gabon">Gabon</option>
                  <option value="gambia">Gambia</option>
                  <option value="georgia">Georgia</option>
                  <option value="germany">Germany</option>
                  <option value="ghana">Ghana</option>
                  <option value="greece">Greece</option>
                  <option value="grenada">Grenada</option>
                  <option value="guatemala">Guatemala</option>
                  <option value="guinea">Guinea</option>
                  <option value="guinea_bissau">Guinea-Bissau</option>
                  <option value="guyana">Guyana</option>
                  <option value="haiti">Haiti</option>
                  <option value="honduras">Honduras</option>
                  <option value="hungary">Hungary</option>
                  <option value="iceland">Iceland</option>
                  <option value="india">India</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="iran">Iran</option>
                  <option value="iraq">Iraq</option>
                  <option value="ireland">Ireland</option>
                  <option value="israel">Israel</option>
                  <option value="italy">Italy</option>
                  <option value="ivory_coast">Ivory Coast</option>
                  <option value="jamaica">Jamaica</option>
                  <option value="japan">Japan</option>
                  <option value="jordan">Jordan</option>
                  <option value="kazakhstan">Kazakhstan</option>
                  <option value="kenya">Kenya</option>
                  <option value="kiribati">Kiribati</option>
                  <option value="north_korea">North Korea</option>
                  <option value="south_korea">South Korea</option>
                  <option value="kosovo">Kosovo</option>
                  <option value="kuwait">Kuwait</option>
                  <option value="kyrgyzstan">Kyrgyzstan</option>
                  <option value="laos">Laos</option>
                  <option value="latvia">Latvia</option>
                  <option value="lebanon">Lebanon</option>
                  <option value="lesotho">Lesotho</option>
                  <option value="liberia">Liberia</option>
                  <option value="libya">Libya</option>
                  <option value="liechtenstein">Liechtenstein</option>
                  <option value="lithuania">Lithuania</option>
                  <option value="luxembourg">Luxembourg</option>
                  <option value="madagascar">Madagascar</option>
                  <option value="malawi">Malawi</option>
                  <option value="malaysia">Malaysia</option>
                  <option value="maldives">Maldives</option>
                  <option value="mali">Mali</option>
                  <option value="malta">Malta</option>
                  <option value="marshall_islands">Marshall Islands</option>
                  <option value="mauritania">Mauritania</option>
                  <option value="mauritius">Mauritius</option>
                  <option value="mexico">Mexico</option>
                  <option value="micronesia">Micronesia</option>
                  <option value="moldova">Moldova</option>
                  <option value="monaco">Monaco</option>
                  <option value="mongolia">Mongolia</option>
                  <option value="montenegro">Montenegro</option>
                  <option value="morocco">Morocco</option>
                  <option value="mozambique">Mozambique</option>
                  <option value="myanmar">Myanmar</option>
                  <option value="namibia">Namibia</option>
                  <option value="nauru">Nauru</option>
                  <option value="nepal">Nepal</option>
                  <option value="netherlands">Netherlands</option>
                  <option value="new_zealand">New Zealand</option>
                  <option value="nicaragua">Nicaragua</option>
                  <option value="niger">Niger</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="north_macedonia">North Macedonia</option>
                  <option value="norway">Norway</option>
                  <option value="oman">Oman</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="palau">Palau</option>
                  <option value="panama">Panama</option>
                  <option value="papua_new_guinea">Papua New Guinea</option>
                  <option value="paraguay">Paraguay</option>
                  <option value="peru">Peru</option>
                  <option value="philippines">Philippines</option>
                  <option value="poland">Poland</option>
                  <option value="portugal">Portugal</option>
                  <option value="qatar">Qatar</option>
                  <option value="romania">Romania</option>
                  <option value="russia">Russia</option>
                  <option value="rwanda">Rwanda</option>
                  <option value="saint_kitts_and_nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="saint_lucia">Saint Lucia</option>
                  <option value="saint_vincent_and_the_grenadines">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="samoa">Samoa</option>
                  <option value="san_marino">San Marino</option>
                  <option value="sao_tome_and_principe">
                    Sao Tome and Principe
                  </option>
                  <option value="saudi_arabia">Saudi Arabia</option>
                  <option value="senegal">Senegal</option>
                  <option value="serbia">Serbia</option>
                  <option value="seychelles">Seychelles</option>
                  <option value="sierra_leone">Sierra Leone</option>
                  <option value="singapore">Singapore</option>
                  <option value="slovakia">Slovakia</option>
                  <option value="slovenia">Slovenia</option>
                  <option value="solomon_islands">Solomon Islands</option>
                  <option value="somalia">Somalia</option>
                  <option value="south_africa">South Africa</option>
                  <option value="spain">Spain</option>
                  <option value="sri_lanka">Sri Lanka</option>
                  <option value="sudan">Sudan</option>
                  <option value="suriname">Suriname</option>
                  <option value="sweden">Sweden</option>
                  <option value="switzerland">Switzerland</option>
                  <option value="syria">Syria</option>
                  <option value="taiwan">Taiwan</option>
                  <option value="tajikistan">Tajikistan</option>
                  <option value="tanzania">Tanzania</option>
                  <option value="thailand">Thailand</option>
                  <option value="togo">Togo</option>
                  <option value="tonga">Tonga</option>
                  <option value="trinidad_and_tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="tunisia">Tunisia</option>
                  <option value="turkey">Turkey</option>
                  <option value="turkmenistan">Turkmenistan</option>
                  <option value="tuvalu">Tuvalu</option>
                  <option value="uganda">Uganda</option>
                  <option value="ukraine">Ukraine</option>
                  <option value="united_arab_emirates">
                    United Arab Emirates
                  </option>
                  <option value="united_kingdom">United Kingdom</option>
                  <option value="uruguay">Uruguay</option>
                  <option value="uzbekistan">Uzbekistan</option>
                  <option value="vanuatu">Vanuatu</option>
                  <option value="vatican_city">Vatican City</option>
                  <option value="venezuela">Venezuela</option>
                  <option value="vietnam">Vietnam</option>
                  <option value="yemen">Yemen</option>
                  <option value="zambia">Zambia</option>
                  <option value="zimbabwe">Zimbabwe</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Discord ID (Optional) */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="discordId"
                >
                  Discord ID <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="discordId"
                  name="discordId"
                  type="text"
                  placeholder="Enter your Discord ID"
                />
              </div>

              {/* LinkedIn (Optional) */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="discordId"
                >
                  LinkedIn <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="linkedIn"
                  name="linkedIn"
                  type="text"
                  placeholder="Enter your LinkedIn"
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
                  <option value="">Select Option</option>
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
                  Select Dietary Restrictions {" "} <span className="text-gray-400">(Optional)</span>
                  <p><i>(Ctrl + Click on Windows or Cmd + Click on MacOS to select multiple)</i></p>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  multiple
                  onChange={handleDietaryChange}
                >
                  <option value="vegan">Vegan</option>
                  <option value="glutenfree">Gluten Free</option>
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

              {/* Ethnicity Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="ethnicity"
                >
                  Race / Ethnicity <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="ethnicity"
                  name="ethnicity"
                  required
                >
                  <option value="">Select Option</option>
                  <option value="asian_indian">Asian Indian</option>
                  <option value="black_african">Black or African</option>
                  <option value="chinese">Chinese</option>
                  <option value="filipino">Filipino</option>
                  <option value="guamanian_chamorro">
                    Guamanian or Chamorro
                  </option>
                  <option value="hispanic_latino">
                    Hispanic / Latino / Spanish Origin
                  </option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="middle_eastern">Middle Eastern</option>
                  <option value="native_american_alaskan">
                    Native American or Alaskan Native
                  </option>
                  <option value="native_hawaiian">Native Hawaiian</option>
                  <option value="samoan">Samoan</option>
                  <option value="vietnamese">Vietnamese</option>
                  <option value="white">White</option>
                  <option value="other_asian">
                    Other Asian (Thai, Cambodian, etc.)
                  </option>
                  <option value="other_pacific_islander">
                    Other Pacific Islander
                  </option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_answer">
                    Prefer Not to Answer
                  </option>
                </select>
              </div>

              {/* Gender Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  What gender do you identify with?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="gender"
                  name="gender"
                  required
                >
                  <option value="">Select Option</option>
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="nonBinary">Non-Binary</option>
                  <option value="selfDescribe">Prefer to self-describe</option>
                  <option value="preferNotToSay">Prefer not to say</option>
                </select>
              </div>

              {/* Pronouns Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="pronouns"
                >
                  Pronouns <span className="text-gray-400">(Optional)</span>
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="pronouns"
                  name="pronouns"
                >
                  <option value="">Select Option</option>
                  <option value="sheHer">She/Her</option>
                  <option value="heHim">He/Him</option>
                  <option value="theyThem">They/Them</option>
                  <option value="sheThey">She/They</option>
                  <option value="heThey">He/They</option>
                  <option value="preferNotToSay">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Resume Upload Field */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="resume"
                >
                  Upload Resume{" "}
                  <span className="text-gray-400">(PDF Only)</span>
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  id="resume"
                  name="resume"
                  type="file"
                  accept="application/pdf"
                />
              </div>

              {/* MLH Checkmark Agreement, remove paragraph once done */}
              <p className="p-2 font-bold text-md light-mode-text">
                We are partnered with MLH. The following checkbox is 
                for this partnership. 
              </p>
              <div className="p-2 mb-4 flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                  className="mr-2 w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                  required
                />
                <label htmlFor="agree" className="text-white text-sm">
                I authorize you to share my application/registration 
                information with Major League Hacking for event administration,
                 ranking, and MLH administration in-line with the MLH Privacy Policy
                  https://mlh.io/privacy. I further acknowledge to have read and 
                  agree to the terms of both the MLH Contest Terms and Conditions 
                  (https://github.com/MLH/mlh-policies/blob/main/contest-terms.md) 
                  and the MLH Privacy Policy (https://mlh.io/privacy).
                  <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="p-2 mb-4 flex items-center">
                <input
                  id="agree2"
                  name="agree2"
                  type="checkbox"
                  checked={isAgreed2}
                  onChange={handleCheckboxChange2}
                  className="mr-2 w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                  required
                />
                <label htmlFor="agree2" className="text-white text-sm">
                I have read and agree to the MLH Code of Conduct 
                (https://mlh.io/code-of-conduct)
                  <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="p-2 mb-4 flex items-center">
                <input
                  id="mlh_emailagreement"
                  name="mlh_emailagreement"
                  type="checkbox"
                  className="mr-2 w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />
                <label
                  htmlFor="mlh_emailagreement"
                  className="text-white text-sm"
                >
                  I authorize MLH to send me occasional emails about relevant
                  events, career opportunities, and community announcements.
                </label>
              </div>

              {/* Email Sharing Agreement */}
              <p className="p-2 font-bold text-md light-mode-text">
                hackUMBC Privacy and Consent Agreements
              </p>
              <div className="p-2 mb-4 flex items-center">
                <input
                  id="shareEmail"
                  name="shareEmail"
                  type="checkbox"
                  checked={shareEmail}
                  onChange={(event) => setShareEmail(event.target.checked)}
                  className="mr-2 w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="shareEmail" className="text-white text-sm">
                  I agree that hackUMBC can share my email with sponsors to
                  receive emails about internship/job opportunities.
                </label>
              </div>

              {/* Media Consent Agreement */}
              <div className="p-2 mb-4 flex items-center">
                <input
                  id="mediaConsent"
                  name="mediaConsent"
                  type="checkbox"
                  checked={mediaConsent}
                  onChange={(event) => setMediaConsent(event.target.checked)}
                  className="mr-2 w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="mediaConsent" className="text-white text-sm">
                  I, grant hackUMBC, its partners, and sponsors the permission
                  to utilize any content featuring my appearance in any form of
                  digital or print media for any purpose without requiring
                  additional permission, payment, or any form of compensation.
                  This includes but is not limited to publications, photographs,
                  and videos.
                  <br />
                  If I disagree with these terms, I will commit to always
                  wearing indicators (tag, different color lanyard, etc.) that
                  indicate I do not want to be in pictures provided by hackUMBC
                  at all times on the premises of the event. The exact indicator
                  will be decided later, and you will receive it at check-in.
                  <br />
                  In addition, should I intentionally position myself within the
                  camera's frame, I hereby provide explicit consent to hackUMBC
                  for the unrestricted use of any imagery encompassing my
                  voluntary presence (e.g., "photobombing").
                </label>
              </div>

              {/* <div className="flex items-center justify-between">
                {<button
                  type="submit"
                  disabled={isSubmitting || !isAgreed}
                  className={`btn-custom transform transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>}
              </div> */}
              {/* every year hide this^^ submit button so you dont need to delete entire file, 
              that way if someone types in exact url and finds the page, they cant submit */}
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {savedData && (
              <p className="text-green-500 mt-4">
                Form submitted successfully!
              </p>
            )}
          </div>
        </div>
        <div className="footer-info">
          <p>&copy; 2025 hackUMBC. All rights reserved.</p>
          <p className="mt-2">
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a> |
            <a href="/terms-of-service" className="footer-link">Terms of Service</a> |
            <a href="mailto:hackumbc@umbc.edu" className="footer-link">Contact Us</a>
          </p>
        </div>
      </div>
    </>
  );
}

