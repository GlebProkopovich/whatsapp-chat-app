export interface IUserData {
  idInstance: null | string;
  apiTokenInstance: null | string;
}

export interface IDataAddedAction {
  type: 'DATA_ADDED';
  payload: {
    idInstance: null | string;
    apiTokenInstance: null | string;
  };
}

export interface INumberOfRecipient {
  number: null | string;
}

export interface INumberOfRecipientAction {
  type: 'RECIPIENT_NUMBER_ADDED';
  payload: {
    number: null | string;
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
