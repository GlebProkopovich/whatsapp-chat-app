import { FC } from 'react';
import './ModalToGetNumber.scss';
import { useDispatch } from 'react-redux';
import { setModalOfNumberOpened } from '../../state/action-creators';

const ModalToGetNumber: FC = () => {
  const dispatch = useDispatch();

  const handleClickOnCloseModal = (value: boolean): void => {
    dispatch(setModalOfNumberOpened(value));
  };

  return (
    <div
      className="modalToGetNumber-wrapper"
      //   onClick={() => handleClickOnCloseModal(false)}
    >
      <div className="modalToGetNumber-container">
        <span className="material-symbols-outlined icon">chat</span>
        <h2>To start chat - write the number of recipient</h2>
        <h3>
          Please write the number in full format with the code of the country,{' '}
          <br /> Examples: 375339137444 (Belarus), 995591077124 (Georgia)
        </h3>
        <form>
          <input type="text" placeholder="The number of recipient" />
          <button type="submit">Start dialog</button>
        </form>
        <button
          className="close-btn"
          onClick={() => handleClickOnCloseModal(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default ModalToGetNumber;
