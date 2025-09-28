import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'; 


function Regi() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    password: '',
    language: 'English',
    isSignLanguageExpert: false,
    isBankingInformed: false,
    isLocalRoutesInformed: false,
    isMedicalInformed: false,
    gender: 'Male',
    domicile: 'Local',
    currentAddress: '',
    permanentAddress: '',
    aadharId: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(''); // New state for submission status

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Basic validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(formData.aadharId)) {
      newErrors.aadharId = 'Aadhar ID must be a 12-digit number.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Clear any previous status message
      setSubmissionStatus('Submitting...'); 
      
      try {
        // Make a POST request to your API endpoint
        // Replace 'YOUR_API_ENDPOINT' with your actual server URL
        const response = await axios.post('http://localhost:3001/AssistantRegister', formData)
                                    .then(result => {navigate('/assistantlogin');
      });
        
        // Handle a successful response
        if (response.status === 201) {
          console.log('Form submitted successfully:', response.data);
          setSubmissionStatus('Registration successful!');
        } else {
          setSubmissionStatus('Registration failed. Please try again.');
        }

      } catch (error) {
        // Handle API errors
        console.error('There was an error submitting the form:', error);
        setSubmissionStatus('An error occurred. Please try again later.');
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server error data:', error.response.data);
          console.error('Server error status:', error.response.status);
        }
      }
    }
  };

  return (
    <div>
        <br></br>
      <h2>Assister Register Form</h2>
      <form onSubmit={handleSubmit} class='form1'>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date Of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength="5"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language Fluent In:</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>Others</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input
            type="radio"
            id="genderMale"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          />
          <label htmlFor="genderMale" className="options-labels">Male</label>
          <input
            type="radio"
            id="genderFemale"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
          <label htmlFor="genderFemale" className="options-labels">Female</label>
        </div>
        <div className="form-group">
          <label>Domicile:</label>
          <input
            type="radio"
            id="domicileLocal"
            name="domicile"
            value="Local"
            checked={formData.domicile === 'Local'}
            onChange={handleChange}
          />
          <label htmlFor="domicileLocal" className="options-labels">Local</label>
          <input
            type="radio"
            id="domicileNonLocal"
            name="domicile"
            value="Non local"
            checked={formData.domicile === 'Non local'}
            onChange={handleChange}
          />
          <label htmlFor="domicileNonLocal" className="options-labels">Non local</label>
        </div>
        <div className="form-group">
          <label htmlFor="isSignLanguageExpert" className="options-labels">Sign Language Expert:</label>
          <input
            type="checkbox"
            id="isSignLanguageExpert"
            name="isSignLanguageExpert"
            checked={formData.isSignLanguageExpert}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label >Well-Informed On:</label>
          <div>
            <input
              type="checkbox"
              id="isBankingInformed"
              name="isBankingInformed"
              checked={formData.isBankingInformed}
              onChange={handleChange}
            />
            <label htmlFor="isBankingInformed" className="options-labels">Banking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="isLocalRoutesInformed"
              name="isLocalRoutesInformed"
              checked={formData.isLocalRoutesInformed}
              onChange={handleChange}
            />
            <label htmlFor="isLocalRoutesInformed" className="options-labels">Local Routes</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="isMedicalInformed"
              name="isMedicalInformed"
              checked={formData.isMedicalInformed}
              onChange={handleChange}
            />
            <label htmlFor="isMedicalInformed" className="options-labels">Medical Know-how</label>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="permanentAddress">Permanent Address:</label>
          <textarea
            id="permanentAddress"
            name="permanentAddress"
            rows="5"
            cols="10"
            value={formData.permanentAddress}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {/* Conditional rendering for temporary address based on domicile */}
        {formData.domicile === 'Non local' && (
          <div className="form-group">
            <label htmlFor="currentAddress">Current Address:</label>
            <textarea
              id="currentAddress"
              name="currentAddress"
              rows="5"
              cols="10"
              value={formData.currentAddress}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="aadharId">Aadhar ID:</label>
          <input
            type="number"
            id="aadharId"
            name="aadharId"
            value={formData.aadharId}
            onChange={handleChange}
            required
            placeholder="Enter valid Aadhar ID"
            autoFocus
          />
          {errors.aadharId && <div style={{ color: 'red' }}>{errors.aadharId}</div>}
        </div>
        <br></br>
        <div class="options-labels">
          <input type="submit" value="Register" /> 
          <input type="reset" value="Clear form" />
        </div>
        {/* <div className="form-group">
         
        </div> */}
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
}

export default Regi;