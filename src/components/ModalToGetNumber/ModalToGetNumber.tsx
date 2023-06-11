import { CSSProperties, ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalOfNumberOpened } from '../../state/action-creators';
import { useSelector } from 'react-redux';
import { setNumberOfRecipient } from '../../state/action-creators';
import axios from 'axios';
import { IUserDataState } from '../../types';
import { PropagateLoader } from 'react-spinners';
import './ModalToGetNumber.scss';

const ModalToGetNumber: FC = () => {
  const [numberValue, setNumberValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoaderOpened, setLoaderOpened] = useState<boolean>(false);

  const API_URL = 'https://api.green-api.com';

  const payload = {
    phoneNumber: numberValue,
  };

  const dispatch = useDispatch();

  const override: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const { idInstance, apiTokenInstance } = useSelector(
    (state: IUserDataState) => state.userData
  );

  const handleNumberValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberValue(e.target.value);
  };

  const handleClickOnCloseModal = (value: boolean): void => {
    dispatch(setModalOfNumberOpened(value));
  };

  const getInfoIsExistedUser = async () => {
    try {
      setLoaderOpened(true);
      const response = await axios.post(
        `${API_URL}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
        payload
      );
      setLoaderOpened(false);
      const isUserExistedInWhatsapp = response.data.existsWhatsapp;
      return isUserExistedInWhatsapp
        ? (setError(''),
          dispatch(setModalOfNumberOpened(false)),
          dispatch(setNumberOfRecipient(numberValue)))
        : setError("Written number doesn't exist in WhatsApp");
    } catch (error) {
      setLoaderOpened(false);
      console.log(error);
    }
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getInfoIsExistedUser();
  };

  return (
    <div
      className="modalToGetNumber-wrapper"
      onClick={() => handleClickOnCloseModal(false)}
    >
      <div
        className="modalToGetNumber-container"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="material-symbols-outlined icon">chat</span>
        <h2>To start chat - write the number of recipient</h2>
        <h3>
          Please write the number in full format with the code of the country,{' '}
          <br /> Examples: 375339137444 (Belarus), 995591077124 (Georgia)
        </h3>
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="The number of recipient"
            value={numberValue}
            onChange={handleNumberValue}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {isLoaderOpened ? (
              <PropagateLoader
                color={'#fff'}
                loading={isLoaderOpened}
                cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Start dialog'
            )}
          </button>
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
