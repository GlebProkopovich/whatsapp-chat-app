import { INumberOfRecipient, INumberOfRecipientAction } from '../../types';

const initialState: INumberOfRecipient = {
  number: null,
};

export const numberOfRecipientReducer = (
  state = initialState,
  action: INumberOfRecipientAction
) => {
  switch (action.type) {
    case 'RECIPIENT_NUMBER_ADDED':
      return {
        ...state,
        number: action.payload,
      };
    default:
      return state;
  }
};
