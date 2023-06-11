import { CSSProperties, ChangeEvent, FC, useEffect, useState } from 'react';
import { IMessage, IUserDataState, IUserNumberOfOpenedChat } from '../../types';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import Message from '../Message/Message';
import './ChatDialog.scss';

const ChatDialog: FC = () => {
  const [isLoaderDialogOpened, setLoaderDialogOpened] =
    useState<boolean>(false);
  const [messageValue, setMessageValue] = useState<string>('');
  const [isLoaderMessageOpened, setLoaderMessageOpened] =
    useState<boolean>(false);
  const [allMesagesHistory, setAllMesagesHistory] = useState([]);
  const [previousResponse, setPreviousResponse] = useState(null);

  const API_URL = 'https://api.green-api.com';

  const overrideDialog: CSSProperties = {
    position: 'absolute',
    top: '40%',
    left: '40%',
  };

  const userNumberOfOpenedChat = useSelector(
    (state: IUserNumberOfOpenedChat) => state.userNumberOfOpenedChat.number
  );

  const { idInstance, apiTokenInstance } = useSelector(
    (state: IUserDataState) => state.userData
  );

  const payloadInfoAboutDialog = {
    chatId: `${userNumberOfOpenedChat}@c.us`,
    count: 10,
  };

  const payloadToSendMessage = {
    chatId: `${userNumberOfOpenedChat}@c.us`,
    message: messageValue,
  };

  const handleMessageValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  const handleClickOnSendMessageBtn = async () => {
    try {
      setLoaderMessageOpened(true);
      await axios.post(
        `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        payloadToSendMessage
      );
      setLoaderMessageOpened(false);
      setMessageValue('');
    } catch (error) {
      setLoaderMessageOpened(false);
      console.log(error);
    }
  };

  const getInfoAboutDialog = async () => {
    try {
      setLoaderDialogOpened(true);
      const response = await axios.post(
        `${API_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
        payloadInfoAboutDialog
      );
      setAllMesagesHistory(response.data.reverse());
      setLoaderDialogOpened(false);
      if (response.data !== previousResponse) {
        setPreviousResponse(response.data);
      }
    } catch (error) {
      setLoaderDialogOpened(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // getInfoAboutDialog();
  }, [userNumberOfOpenedChat, previousResponse]);

  return (
    <div className="chatDialog-container">
      <div className="top-pannel">
        <div className="photoAndNumber">
          <span className="material-symbols-outlined icon">account_circle</span>
          <p className="numberOfUser">{`+${userNumberOfOpenedChat}`}</p>
        </div>
        <div className="searchAndSettings">
          <span className="material-symbols-outlined icon">search</span>
          <span className="material-symbols-outlined icon">more_vert</span>
        </div>
      </div>
      <div className="main">
        {isLoaderDialogOpened ? (
          <PuffLoader
            color={'#fff'}
            loading={isLoaderDialogOpened}
            cssOverride={overrideDialog}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          allMesagesHistory.map((el: IMessage) => {
            return (
              <Message
                key={el.idMessage}
                textMessage={el.textMessage}
                timeStamp={el.timestamp}
                typeOfMessage={el.type}
              />
            );
          })
        )}
      </div>
      <div className="bottom-pannel">
        <span className="material-symbols-outlined icon">mood</span>
        <span className="material-symbols-outlined icon">attach_file</span>
        <input
          className="fieldForMessage"
          type="text"
          placeholder={isLoaderMessageOpened ? 'Loading...' : 'Write message'}
          value={messageValue}
          onChange={(e) => handleMessageValue(e)}
        />

        <span
          className="material-symbols-outlined icon"
          onClick={handleClickOnSendMessageBtn}
        >
          send
        </span>
      </div>
    </div>
  );
};

export default ChatDialog;
