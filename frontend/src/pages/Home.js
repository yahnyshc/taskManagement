// require('dotenv').config({path:'../config/.env'});

import { useEffect } from 'react';
import { useDraftsContext } from '../hooks/useDraftsContext';

import DraftDetails from '../components/DraftDetails';
import DraftContent from '../components/DraftContent';
import DraftForm from '../components/DraftForm';
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    const { drafts, selected, dispatch } = useDraftsContext();
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchDrafts = async () => {
            const response = await fetch((process.env.DEVELOPMENT ? "" : process.env.REACT_APP_BACKEND_URL)+'/api/drafts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();


            if (response.ok){
                dispatch({type: 'SET_DRAFTS', payload: json})
                dispatch({type: 'SET_SELECTED', payload: json[0]})
            }
        }

        if (user){
            fetchDrafts()
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="drafts">
                <DraftForm />
                {drafts && drafts.map((draft) => (
                    <DraftDetails key={draft._id} draft={draft} selected={selected} onClick={() => dispatch({type: 'SET_SELECTED', payload: draft})}/>
                ))}
            </div>
            { selected && <DraftContent key={selected._id} draft={selected}></DraftContent>}
        </div>
    )
}

export default Home;