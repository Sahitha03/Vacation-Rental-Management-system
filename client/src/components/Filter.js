// Filter.js
import React from 'react';
import { Link } from 'react-router-dom';

const Filter = ({ iconClass, link, label }) => (
  <div className="filter">
    <Link to={link}>
      <i className={iconClass}></i>
    </Link>
    <p>{label}</p>
  </div>
);

export default Filter;
