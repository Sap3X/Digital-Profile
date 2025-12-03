import React, { useState, useRef } from "react";

// Reference image (local path provided by user/developer)
const referenceImage = "/mnt/data/4ca1d4b1-0b5e-4510-8793-0ea5a1125794.png";

export default function EmployeeProfileForm() {
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    number: "",
    email: "",
    state: "",
    district: "",
    city: "",
    tol: "",
    motherName: "",
    fatherName: "",
    study: "",
  });

  const [countryCode, setCountryCode] = useState("+977");
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const fileRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setPicture(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPicturePreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.thirdName.trim()) errs.thirdName = "Third name is required";
    if (!form.number.trim()) errs.number = "Phone number is required";
    else if (!/^\d{6,15}$/.test(form.number.replace(/\D/g, "")))
      errs.number = "Enter a valid phone number (digits only)";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      // Example: Build form data for an API call
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => payload.append(k, v));
      payload.append("countryCode", countryCode);
      if (picture) payload.append("picture", picture, picture.name);

      // Simulate submit (replace with real fetch/axios call)
      await new Promise((r) => setTimeout(r, 700));
      // For demo, log the plain object (files omitted)
      const plain = { ...form, countryCode };
      console.log("Submitted:", plain);
      alert("Profile submitted (see console). Replace the mock with your API).");
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 md:p-8 grid gap-6 md:grid-cols-3"
        aria-label="Employee profile form"
      >
        {/* Left column: reference and picture */}
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-full mb-4">
            <img
              src={referenceImage}
              alt="design reference"
              className="w-full rounded-lg object-cover border" 
            />
            <p className="text-xs text-gray-400 mt-2">Design reference</p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Picture</label>
            <div className="flex gap-3 items-center">
              <div className="w-28 h-28 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden">
                {picturePreview ? (
                  <img src={picturePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Max 5MB. JPG, PNG</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right columns: inputs */}
        <div className="md:col-span-2 grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-3"
                placeholder="Enter first name"
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Second Name (optional)</label>
              <input
                name="secondName"
                value={form.secondName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-3"
                placeholder="Enter second name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Third Name *</label>
            <input
              name="thirdName"
              value={form.thirdName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-3"
              placeholder="Enter third name"
            />
            {errors.thirdName && <p className="text-xs text-red-500 mt-1">{errors.thirdName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
              <div className="mt-1 flex">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="rounded-l-lg border-gray-200 p-3"
                >
                  <option>+977</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  className="flex-1 rounded-r-lg border-gray-200 p-3"
                  placeholder="Mobile Number"
                />
              </div>
              {errors.number && <p className="text-xs text-red-500 mt-1">{errors.number}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-yellow-300 p-3"
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-200 p-3" placeholder="State" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input name="district" value={form.district} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-200 p-3" placeholder="District" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-200 p-3" placeholder="City" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tol</label>
              <input name="tol" value={form.tol} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-200 p-3" placeholder="Tol" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mother's Full Name</label>
              <input name="motherName" value={form.motherName} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-200 p-3" placeholder="Mother's full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Full Name</label>
              <input name="fatherName" value={form.fatherName} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-200 p-3" placeholder="Father's full name" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Study</label>
            <input name="study" value={form.study} onChange={handleChange} className="mt-1 block w-full rounded-lg border-gray-200 p-3" placeholder="Highest study / qualification" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">By submitting you agree to the company's data use policy.</div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-white rounded-full shadow hover:brightness-95 disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
