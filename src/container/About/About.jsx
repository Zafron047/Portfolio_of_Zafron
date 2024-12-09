import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './About.scss';

const abouts = [
  {
    title: 'Web Development',
    description:
      'I build web applications using modern technologies and frameworks like React, Redux, Node.js, Express, MongoDB, etc.',
    imgUrl: images.about01,
  },
  {
    title: 'Android Development',
    description:
      'I build android applications using modern technologies and frameworks like React Native, Flutter, etc.',
    imgUrl: images.about02,
  },
  {
    title: 'Front End',
    description:
      'I build front end applications using modern technologies and frameworks like React, Redux, etc.',
    imgUrl: images.about03,
  },
  {
    title: 'Back End',
    description:
      'I build back end applications using modern technologies and frameworks like Node.js, Express, MongoDB, etc.',
    imgUrl: images.about04,
  },
];

const about = () => {
  return (
    <>
      <h2 className="head-text">
        I know that a <span>Good App</span><br /> makes a <span>Good Business</span>
      </h2>

      <div className='app__profiles'>
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default about;
