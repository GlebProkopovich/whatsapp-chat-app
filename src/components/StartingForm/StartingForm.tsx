import { CSSProperties, ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../state/action-creators';
import { PropagateLoader } from 'react-spinners';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StartingForm.scss';

const StartingForm: FC = () => {
  const [idInstanceValue, setIdInstanceValue] = useState<string>('');
  const [apiTokenInstanceValue, setApiTokenInstanceValue] =
    useState<string>('');
  const [isLoaderOpened, setLoaderOpened] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const API_URL = 'https://api.green-api.com';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const override: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const handleIdInstanceValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setIdInstanceValue(e.target.value);
  };

  const handleApiTokenInstanceValue = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setApiTokenInstanceValue(e.target.value);
  };

  const getStateOfAccount = async () => {
    try {
      setLoaderOpened(true);
      const response = await axios.get(
        `${API_URL}/waInstance${idInstanceValue}/getStateInstance/${apiTokenInstanceValue}`
      );
      setLoaderOpened(false);
      switch (response.data.stateInstance) {
        case 'authorized':
          navigate('/chat');
          break;
        case 'notAuthorized':
          setError('Please authorize your account');
          break;
        case 'blocked':
          setError('Please unblock your account');
          break;
        case 'sleepMode':
          setError('Your account in sleep mode');
          break;
        case 'starting':
          setError('Your account is starting, please wait 5 minutes');
          break;
      }
    } catch (error: any) {
      setLoaderOpened(false);
      setError('Something went wrong, please check the filled data');
      console.log(error);
    }
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setUserData(idInstanceValue, apiTokenInstanceValue));
    getStateOfAccount();
  };

  return (
    <div className="wrapper">
      <form className="startingForm-container" onSubmit={handleSubmitForm}>
        <h3>welcome</h3>
        <input
          type="text"
          placeholder="IdInstance"
          className="input"
          value={idInstanceValue}
          onChange={handleIdInstanceValue}
        />
        <input
          type="text"
          placeholder="ApiTokenInstance"
          className="input"
          value={apiTokenInstanceValue}
          onChange={handleApiTokenInstanceValue}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">
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
            'sign in'
          )}
        </button>
      </form>
    </div>
  );
};

export default StartingForm;
