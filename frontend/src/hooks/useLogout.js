import { useAuthContext } from './useAuthContext'
import { useDraftsContext } from './useDraftsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: draftsDispatch } = useDraftsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        draftsDispatch({type: 'SET_DRAFTS', payload: null})
    }

    return {logout}
}