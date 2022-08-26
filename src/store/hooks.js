import { StoreContext } from '~/store';
import { useContext } from 'react';

const useStore = () => {
    const [state, dispatch] = useContext(StoreContext);
    return [state, dispatch];
};

export { useStore };
