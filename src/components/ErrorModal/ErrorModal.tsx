import { FC } from 'react';
import './ErrorModal.scss';
import { NavLink } from 'react-router-dom';

const ErrorModal: FC = () => {
  return (
    <div className="errorModal-wrapper">
      <div className="errorModal-container">
        <span className="material-symbols-outlined">error</span>
        <p>Your account is not authorized!</p>
        <NavLink to={'/'}>Go to authorization</NavLink>
      </div>
    </div>
  );
};

export default ErrorModal;
