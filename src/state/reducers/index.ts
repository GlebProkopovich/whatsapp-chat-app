import { combineReducers } from 'redux';
import { userDataReducer } from './userData';
import { numberOfRecipientReducer } from './numberOfrecipientReducer';
import { modalToGetNumberRecipientReducer } from './isModalNumberOpenedReducer';

export const reducers = combineReducers({
  userData: userDataReducer,
  numberOfRecipient: numberOfRecipientReducer,
  modalToGetNumberOfRecipient: modalToGetNumberRecipientReducer,
});
