import { FC, useEffect, useState } from 'react';
import { IMessageProps } from '../../types';
import './Message.scss';

const Message: FC<IMessageProps> = ({
  textMessage,
  timeStamp,
  typeOfMessage,
}) => {
  const [timeOfMessage, setTimeOfMessage] = useState<string>('00:00');

  useEffect(() => {
    const date = new Date(timeStamp * 1000);
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setTimeOfMessage(`${String(formattedTime).slice(0, 5)}`);
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
