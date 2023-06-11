export interface IUserData {
  idInstance: null | string;
  apiTokenInstance: null | string;
}

export interface IUserDataState {
  userData: {
    idInstance: null | string;
    apiTokenInstance: null | string;
  };
}

export interface IDataAddedAction {
  type: 'DATA_ADDED';
  payload: {
    idInstance: null | string;
    apiTokenInstance: null | string;
  };
}

export interface IModalToGetNumberRecipient {
  isOpened: boolean;
}

export interface IModalToGetNumberAction {
  type: 'MODAL_CHANGED';
  payload: {
    isOpened: boolean;
  };
}

export interface IModalNumberOfRecipient {
  modalToGetNumberOfRecipient: {
    isOpened: boolean;
  };
}

export interface INumberOfRecipients {
  numbers: string[];
}

export interface INumberOfRecipientsAction {
  type: 'RECIPIENT_NUMBER_ADDED';
  payload: {
    numbers: string[];
  };
}

export interface INumberOfRecipientsState {
  numbersOfRecipients: {
    numbers: string[];
  };
}

export interface IDialogButtonsProps {
  numberOfRecipient: string;
  handleClickOnChatBtn: () => void;
}

export interface IMessageProps {
  textMessage: string;
  timeStamp: number;
  typeOfMessage: string;
}

export interface INumberOfOpenedChat {
  number: null | string;
}

export interface INumberOfOpenedChatAction {
  type: 'NUMBER_ADDED';
  payload: {
    number: string;
  };
}

export interface IUserNumberOfOpenedChat {
  userNumberOfOpenedChat: {
    number: string;
  };
}

export interface IExtendedTextMessage {
  description: string;
  forwardingScore: null | string;
  isForwarded: null | string;
  jpegThumbnail: string;
  previewType: string;
  text: string;
  title: string;
}

export interface IMessage {
  key: string;
  chatId: string;
  extendedTextMessage: IExtendedTextMessage;
  idMessage: string;
  sendByApi: boolean;
  statusMessage: string;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
}
