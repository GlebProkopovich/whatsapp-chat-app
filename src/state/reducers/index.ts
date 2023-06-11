import { combineReducers } from 'redux';
import { userDataReducer } from './userData';
import { numbersOfRecipientsReducer } from './numbersOfrecipientsReducer';
import { modalToGetNumberRecipientReducer } from './isModalNumberOpenedReducer';
import { numberOfOpenedChatReducer } from './numberOfOpenedChatReducer';

export const reducers = combineReducers({
  userData: userDataReducer,
  numbersOfRecipients: numbersOfRecipientsReducer,
  modalToGetNumberOfRecipient: modalToGetNumberRecipientReducer,
  userNumberOfOpenedChat: numberOfOpenedChatReducer,
});
