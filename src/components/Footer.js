import { memo } from "react";

const Footer = () => (
  <div className="flex-item welcome-text">
    <p>
      Created by&nbsp;
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/harshitsinghai/"
      >
        Harshit Singhai
      </a>
      &nbsp;©2021
    </p>
    <p>
      Check out my&nbsp;
      <a
        target="_blank"
        rel="noreferrer"
        href="https://fictionally-irrelevant.vercel.app/"
      >
        blog
      </a>
      &nbsp;and&nbsp;
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/harshitsinghai77"
      >
        GitHub
      </a>
    </p>
  </div>
);

export default memo(Footer);
