import { FC } from 'react';
import ErrorModal from '../ErrorModal/ErrorModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setModalOfNumberOpened } from '../../state/action-creators';
import { useSelector } from 'react-redux';
import { IModalNumberOfRecipient } from '../../types';
import ModalToGetNumber from '../ModalToGetNumber/ModalToGetNumber';
import './ChatPage.scss';

const ChatPage: FC = () => {
  const isModalOpened = useSelector(
    (state: IModalNumberOfRecipient) =>
      state.modalToGetNumberOfRecipient.isOpened
  );
  console.log(isModalOpened);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getInfoIsUserAuthorized = () => {
    const localStorageInfo = localStorage.getItem('persist:root');
    if (localStorageInfo) {
      return JSON.parse(JSON.parse(localStorageInfo).userData).idInstance
        ? true
        : false;
    }
    return false;
  };

  const handleClickOnAddDialogBtn = (value: boolean) => {
    dispatch(setModalOfNumberOpened(value));
  };

  const handleClickOnExitBtn = () => {
    localStorage.removeItem('persist:root');
    navigate('/');
  };

  const isUserAuthorized = getInfoIsUserAuthorized();

  return (
    <>
      {isUserAuthorized ? (
        <div className="chatPage-container">
          <div className="leftSide-subcontainer">
            <div className="personal-info">
              <button className="personalInfo-btn">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>
              <div className="personalInfo-btns">
                <button
                  className="personalInfo-btn"
                  onClick={() => handleClickOnAddDialogBtn(true)}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button
                  className="personalInfo-btn"
                  onClick={handleClickOnExitBtn}
                >
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            </div>
            <div className="chats"></div>
          </div>
          <div className="rightSide-subcontainer">
            <div className="empty-chats">
              <span className="material-symbols-outlined">call</span>
              <h2>WhatsApp Web</h2>
              <p>
                Send and receive messages without the need to keep your phone
                connected.
                <br />
                Use WhatsApp simultaneously on up to four linked devices and one
                phone.
              </p>
              <div className="protection-content">
                <span className="material-symbols-outlined">lock</span>
                <p>Protected by digital encryption</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorModal />
      )}
      {isModalOpened && <ModalToGetNumber />}
    </>
  );
};

export default ChatPage;
