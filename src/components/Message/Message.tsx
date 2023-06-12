import { FC, useEffect, useState } from 'react';
import { IMessageProps } from '../../types';
import './Message.scss';

const Message: FC<IMessageProps> = ({
  textMessage,
  timeStamp,
  typeOfMessage,
}) => {
  const [timeOfMessage, setTimeOfMessage] = useState<string>('00:00');

  const getTimeOfMessage = (timeStamp: number): string => {
    const date = new Date(timeStamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setTimeOfMessage(getTimeOfMessage(timeStamp));
  }, []);

  return (
    <div className="message-container">
      <div
        className={`message-content ${
          typeOfMessage === 'incoming' ? 'incoming' : 'outgoing'
        }`}
      >
        <p className="text">{textMessage}</p>
        <p className="time">{timeOfMessage}</p>
      </div>
    </div>
  );
};

export default Message;
