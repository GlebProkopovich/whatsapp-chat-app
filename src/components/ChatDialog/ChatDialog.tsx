import {
  CSSProperties,
  ChangeEvent,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IMessage, IUserDataState, IUserNumberOfOpenedChat } from '../../types';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import Message from '../Message/Message';
import { useDispatch } from 'react-redux';
import './ChatDialog.scss';

const ChatDialog: FC = () => {
  const [isLoaderDialogOpened, setLoaderDialogOpened] =
    useState<boolean>(false);
  const [messageValue, setMessageValue] = useState<string>('');
  const [isLoaderMessageOpened, setLoaderMessageOpened] =
    useState<boolean>(false);
  const [allMessagesHistory, setAllMessagesHistory] = useState<any>([]);

  const mainRef = useRef<HTMLDivElement>(null);

  const messageFieldRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

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

  const scrollToBottom = () => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
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
      setAllMessagesHistory([
        ...allMessagesHistory,
        {
          textMessage: messageValue,
          timestamp: Date.now() / 1000,
          typeOfMessage: 'outgoing',
          idMessage: Math.random(),
        },
      ]);
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
      setAllMessagesHistory(response.data.reverse());
      setLoaderDialogOpened(false);
    } catch (error) {
      setLoaderDialogOpened(false);
      console.log(error);
    }
  };

  const getNotification = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      );
      if (response.data) {
        setAllMessagesHistory([
          ...allMessagesHistory,
          {
            textMessage:
              response.data.body.messageData.textMessageData.textMessage,
            timestamp: response.data.body.timestamp,
            type: 'incoming',
            idMessage: response.data.body.idMessage,
          },
        ]);
        await axios.delete(
          `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${response.data.receiptId}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfoAboutDialog();
  }, [userNumberOfOpenedChat]);

  useEffect(() => {
    scrollToBottom();

    const intervalId = setInterval(async () => {
      await getNotification();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [allMessagesHistory]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleClickOnSendMessageBtn();
      }
    };

    const inputElement = messageFieldRef.current;
    if (inputElement) {
      inputElement.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [messageValue]);

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
      <div className="main" ref={mainRef}>
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
          allMessagesHistory.map((el: IMessage) => {
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
          ref={messageFieldRef}
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
