import { IDataAddedAction, IUserData } from '../../types';

const initialState: IUserData = {
  idInstance: null,
  apiTokenInstance: null,
};

export const userDataReducer = (
  state = initialState,
  action: IDataAddedAction
) => {
  switch (action.type) {
    case 'DATA_ADDED':
      return {
        ...state,
        idInstance: action.payload.idInstance,
        apiTokenInstance: action.payload.apiTokenInstance,
      };
    default:
      return state;
  }
};
