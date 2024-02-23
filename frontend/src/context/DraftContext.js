import { createContext } from 'react';
import { useReducer } from 'react';

export const DraftsContext = createContext();

export const draftsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DRAFTS':
            return {
                drafts: action.payload,
                selected: state.selected
            }
        case 'CREATE_DRAFT':
            return {
                drafts: [action.payload, ...state.drafts],
                selected: state.selected
            }
        case 'UPDATE_DRAFT':
            return {
                drafts: [action.payload, ...state.drafts.filter((draft) => draft._id !== action.payload._id)],
                selected: state.selected
            }
        case 'SET_SELECTED':
            return {
                drafts: state.drafts,
                selected: action.payload
            }
        case 'DELETE_DRAFT':
            return {
                drafts: state.drafts.filter((draft) => draft._id !== action.payload._id),
                selected: state.selected
            }
        default:
            return state
    }
}

export const DraftsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(draftsReducer, {
        drafts: null,
        selected: null
    }); 

    return (
        <DraftsContext.Provider value={{...state, dispatch}}>
            { children }
        </DraftsContext.Provider>
    )
}

