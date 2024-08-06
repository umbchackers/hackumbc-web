"use client";

import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Survey() {
  const [savedData, setSavedData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      let response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });
      response = await response.json();
      setSavedData(response);
      setError(null);
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="absolute inset-0 home-container [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <form>

      </form>
    </div>
  );
}
