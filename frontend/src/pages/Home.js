import { useEffect } from 'react';
import { useDraftsContext } from '../hooks/useDraftsContext';

import DraftDetails from '../components/DraftDetails';
import DraftContent from '../components/DraftContent';
import DraftForm from '../components/DraftForm';

const Home = () => {
    const { drafts, selected, dispatch } = useDraftsContext();

    useEffect(() => {
        const fetchDrafts = async () => {
            const response = await fetch('/api/drafts');
            const json = await response.json();

            if (response.ok){
                dispatch({type: 'SET_DRAFTS', payload: json})
            }
        }
        
        fetchDrafts()
    }, [dispatch]);

    useEffect(() => {
        if (drafts){
            dispatch({type: 'SET_SELECTED', payload: drafts[0]})
        }
    }, [drafts, dispatch]);

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