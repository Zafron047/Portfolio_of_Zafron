import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import { images } from '../../constants';
import { Appwrap, MotionWrap } from '../../wrapper';

import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submissionMessage !== '') {
      setSubmissionMessage('');
    }
  };

  const validateForm = () => {
    if (!name.trim() || !message.trim()) {
      setSubmissionMessage('Please fill in all fields. 🙏');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmissionMessage('Please enter a valid email address. 🙏');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmissionMessage('');
    setIsFormSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      to_name: 'Zafron',
      from_name: name,
      from_email: email,
      message: message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setIsFormSubmitted(true);
      setSubmissionMessage(
        "Thank you for reaching out! <br />I'll get back to you soon. <br />For quicker responses, feel free to connect on WhatsApp"
      );

      setTimeout(() => resetForm(), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmissionMessage('Oops, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Take a Coffee and chat with me.</h2>

      <div className="app__footer-cards">
        <div
          onClick={() => (window.location.href = 'mailto:nohcodein@gmail.com')}
          className="app__footer-card"
        >
          <img src={images.email} alt="email" />
          <a href="mailto:nohcodein@gmail.com" className="p-text">
            nohcodein@gmail.com
          </a>
        </div>
        <div
          className="app__footer-card"
          onClick={() => (window.location.href = 'tel:+8801744459069')}
        >
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +880 (17) 444 59 069" className="p-text">
            +880 (17) 444 59 069
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              value={name}
              name="name"
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button
            className="p-text"
            type="button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
          {submissionMessage && <p className="p-text" >{submissionMessage}</p>}
        </div>
      ) : (
        <div>
          <p
            className="p-text"
            style={{ textAlign: 'center' }}
            dangerouslySetInnerHTML={{ __html: submissionMessage }}
          />
        </div>
      )}
    </>
  );
};

export default Appwrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);
