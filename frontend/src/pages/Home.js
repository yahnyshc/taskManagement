import { useEffect, useState } from 'react';

import DraftDetails from '../components/DraftDetails';
import DraftContent from '../components/DraftContent';

const Home = () => {
    const [drafts, setDrafts] = useState(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/drafts');
            const json = await response.json();

            if (response.ok){
                setDrafts(json);
            }
        }
        
        fetchWorkouts()
    }, []);

    useEffect(() => {
        if (drafts){
            setSelected(drafts[0])
        }
    }, [drafts]);

    return (
        <div className="home">
            <div className="drafts">
                {drafts && drafts.map((draft) => (
                    <DraftDetails key={draft._id} draft={draft} onClick={() => setSelected(draft)}/>
                ))}
            </div>
            { selected && <DraftContent key={selected._id} draft={selected}></DraftContent>}
        </div>
    )
}

export default Home;