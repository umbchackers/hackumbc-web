"use client";
import React, { useState, useEffect } from "react";
import "../css/form.css";
import Image from "next/image";
import Navbar from "../components/navbar";
import Papa from "papaparse";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";`
import "../globals.css";

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
}
