import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import EntryContext from '../../context/entry/entryContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const entryContext = useContext(EntryContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearEntries } = entryContext;

  const onLogout = () => {
    logout();
    clearEntries();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Journy',
  icon: 'fas fa-scroll'
};

export default Navbar;