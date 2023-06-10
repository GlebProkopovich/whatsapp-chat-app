import {
  IModalToGetNumberAction,
  IModalToGetNumberRecipient,
} from '../../types';

const initialState: IModalToGetNumberRecipient = {
  isOpened: false,
};

export const modalToGetNumberRecipientReducer = (
  state = initialState,
  action: IModalToGetNumberAction
) => {
  switch (action.type) {
    case 'MODAL_CHANGED':
      return {
        ...state,
        isOpened: action.payload,
      };
    default:
      return state;
  }
};
