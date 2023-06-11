import { INumberOfRecipients, INumberOfRecipientsAction } from '../../types';

const initialState: INumberOfRecipients = {
  numbers: [],
};

export const numbersOfRecipientsReducer = (
  state = initialState,
  action: INumberOfRecipientsAction
) => {
  switch (action.type) {
    case 'RECIPIENT_NUMBER_ADDED':
      return {
        ...state,
        numbers: [...state.numbers, action.payload],
      };
    default:
      return state;
  }
};
