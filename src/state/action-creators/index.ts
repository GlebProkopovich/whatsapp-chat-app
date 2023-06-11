export const setUserData = (
  idInstance: null | string,
  apiTokenInstance: null | string
) => ({
  type: 'DATA_ADDED',
  payload: { idInstance, apiTokenInstance },
});

export const setNumberOfRecipient = (numberOfRecipient: string) => ({
  type: 'RECIPIENT_NUMBER_ADDED',
  payload: numberOfRecipient,
});

export const setModalOfNumberOpened = (value: boolean) => ({
  type: 'MODAL_CHANGED',
  payload: value,
});

export const setUserNumberOfOpenedChat = (numberOfUser: string) => ({
  type: 'NUMBER_ADDED',
  payload: numberOfUser,
});
