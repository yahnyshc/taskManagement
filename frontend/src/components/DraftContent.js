import { useEffect, useState, useRef } from 'react';
import { useDraftsContext } from '../hooks/useDraftsContext';

const DraftContent = ({draft}) => {
    const ref = useRef(true);

    const { dispatch } = useDraftsContext();

    const [body, setBody] = useState(draft.content);
    const [error, setError] = useState(null);

    useEffect(() => {
        const firstRender = ref.current;
        
        const handleChange = async () => {
            console.log(body);

            const response = await fetch('/api/drafts/'+draft._id ,{
                method: 'PATCH',
                body: JSON.stringify({content: body}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json();

            if (!response.ok){
                setError(json.error)
            }
            if (response.ok){
                setError(null)
                json.content = body;
                console.log('content updated added', json)
                dispatch({type: 'UPDATE_DRAFT', payload: json})
            }
        }

        if (! firstRender ){
            handleChange();
        }
        else{
            ref.current = false;
        }
    }, [body, dispatch, draft._id]);

    return (
        <div className="draft-content">
            <textarea value={body} onChange={(e) => {
                setBody(e.target.value)
                console.log("changed")}} />
            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default DraftContent;