import { SET_ID_TRAILER, SET_OPEN_MODAL, SET_CLOSE_MODAL } from './constants';
const initState = {
    idTrailer: 'no ID',
    isOpen: false,
    isClose: true,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_ID_TRAILER:
            return {
                ...state,
                idTrailer: action.payload,
            };
        case SET_OPEN_MODAL:
            return {
                ...state,
                isOpen: action.payload,
            };
        // case SET_CLOSE_MODAL:
        //     return {
        //         ...state,
        //         isOpen: false,
        //         isClose: true,
        //     };
        default:
            throw new Error('Error');
    }
}

export { initState };
export default reducer;
