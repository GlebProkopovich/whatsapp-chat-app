import { FC, useEffect, useState } from 'react';
import './DialogButton.scss';
import { useSelector } from 'react-redux';
import {
  IDialogButtonsProps,
  INumberOfRecipientsState,
  IUserDataState,
} from '../../types';
import axios from 'axios';

const DialogButton: FC<IDialogButtonsProps> = ({
  numberOfRecipient,
  handleClickOnChatBtn,
}) => {
  const [lastMessageInDialog, setLastMessageInDialog] = useState<string>('');
  const [dateOfLastMessage, setDateOfLastMessage] = useState<string>();

  const API_URL = 'https://api.green-api.com';

  const payload = {
    chatId: `${numberOfRecipient}@c.us`,
    count: 10,
  };

  const numbersOfRecipients = useSelector(
    (state: INumberOfRecipientsState) => state.numbersOfRecipients.numbers
  );

  const { idInstance, apiTokenInstance } = useSelector(
    (state: IUserDataState) => state.userData
  );

  const getInfoAboutDialog = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
        payload
      );
      setLastMessageInDialog(response.data[0].textMessage);
      const date = new Date(response.data[0].timestamp * 1000);
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      setDateOfLastMessage(
        `${String(formattedTime).slice(0, 5)} ${formattedDate}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfoAboutDialog();
  }, [numbersOfRecipients]);

  return (
    <button className="dialogButton-container" onClick={handleClickOnChatBtn}>
      <span className="material-symbols-outlined personal-photo">
        account_circle
      </span>
      <div className="block-info">
        <p className="numberOfRecipient">{`+${numberOfRecipient}`}</p>
        <p className="lastMessageInDialog">
          {lastMessageInDialog
            ? lastMessageInDialog
            : 'You have no messages in this dialog yet :)'}
        </p>
      </div>
      <p className="dateOfLastMessage">
        {dateOfLastMessage ? dateOfLastMessage : 'no date'}
      </p>
    </button>
  );
};

export default DialogButton;
