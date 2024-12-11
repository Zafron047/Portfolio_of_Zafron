import React from 'react';

import { BsLinkedin, BsGithub, BsInstagram, BsWhatsapp } from 'react-icons/bs';

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a
          href="https://www.linkedin.com/in/nohain-islam/"
          target="_blank"
          alt="linkedin"
          title="linkedin"
        >
          <BsLinkedin />
        </a>
      </div>
      <div>
        <a
          href="https://github.com/Zafron047"
          target="_blank"
          alt="github"
          title="github"
        >
          <BsGithub />
        </a>
      </div>
      <div>
        <a
          href="https://www.instagram.com/nohainmohammed/"
          target="_blank"
          alt="instagram"
          title="instagram"
        >
          <BsInstagram />
        </a>
      </div>
      <div>
        <a
          href="https://wa.me/qr/3WRWSBTU62QKO1"
          target="_blank"
          alt="whatsapp"
          title="whatsapp: +880 167-059 49 97"
        >
          <BsWhatsapp />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
