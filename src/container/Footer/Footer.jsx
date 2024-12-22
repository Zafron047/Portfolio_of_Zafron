import React, { useState } from 'react';

import { images } from '../../constants';
import { Appwrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';

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

  const submitContact = async (contact) => {
    try {
      await client.create(contact);
      setIsFormSubmitted(true);
      setSubmissionMessage(
        'Thank you for getting in touch!'
      );

      setTimeout(() => resetForm(), 5000);
    } catch (err) {
      setSubmissionMessage('Oops something went wrong. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const contact = {
      _type: 'contact',
      name,
      email,
      message,
    };

    await submitContact(contact);

    setLoading(false);
  };

  return (
    <>
      <h2 className="head-text">Take a Coffee and chat with me.</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:nohcodein@gmail.com" className="p-text">
            nohcodein@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +880 (167) 059 49 97" className="p-text">
            +880 (167) 059 49 97
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
          {submissionMessage && (
            <p className="submission-message">{submissionMessage}</p>
          )}
        </div>
      ) : (
        <div>
          <h3 className="head-text">{submissionMessage}</h3>
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
