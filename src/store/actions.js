import { SET_ID_TRAILER, SET_OPEN_MODAL, SET_CLOSE_MODAL } from './constants';

export const setIdTrailer = (payload) => ({
    type: SET_ID_TRAILER,
    payload,
});

export const setOpenModal = (payload) => ({
    type: SET_OPEN_MODAL,
    payload,
});

export const setCloseModal = (payload) => ({
    type: SET_CLOSE_MODAL,
    payload,
});
