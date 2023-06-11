import { INumberOfOpenedChat, INumberOfOpenedChatAction } from '../../types';

const initialState: INumberOfOpenedChat = {
  number: null,
};

export const numberOfOpenedChatReducer = (
  state = initialState,
  action: INumberOfOpenedChatAction
) => {
  switch (action.type) {
    case 'NUMBER_ADDED':
      return {
        ...state,
        number: action.payload,
      };
    default:
      return state;
  }
};
