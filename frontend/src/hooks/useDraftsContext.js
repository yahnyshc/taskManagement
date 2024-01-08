import { DraftsContext } from '../context/DraftContext';
import { useContext } from 'react';

export const useDraftsContext = () => {
    const context = useContext(DraftsContext);

    if (!context) {
        throw Error('useDraftsContext must be used inside DraftsContextProvider')
    }

    return context;
}