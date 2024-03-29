import { useEffect, useState, useRef } from 'react';
import { useDraftsContext } from '../hooks/useDraftsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const DraftContent = ({draft}) => {
    const ref = useRef(true);

    const { dispatch } = useDraftsContext();

    const [body, setBody] = useState(draft.content);
    const [error, setError] = useState(null);

    const { user } = useAuthContext()

    useEffect(() => {
        const firstRender = ref.current;
        
        const handleChange = async () => {
            if (!user){
                return
            }
            
            const response = await fetch((process.env.DEVELOPMENT ? "" : process.env.REACT_APP_BACKEND_URL)+'/api/drafts/'+draft._id ,{
                method: 'PATCH',
                body: JSON.stringify({content: body}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (!response.ok){
                setError(json.error)
            }
            if (response.ok){
                setError(null)
                json.content = body;
                json.updatedAt = Date.now();
                dispatch({type: 'UPDATE_DRAFT', payload: json})
            }
        }

        if (! firstRender ){
            handleChange();
        }
        else{
            ref.current = false;
        }

    }, [body, dispatch, user, draft._id]);

    return (
        <div className="draft-content">
            <textarea value={body} spellCheck="true" onChange={(e) => {
                setBody(e.target.value)
            }} />
            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default DraftContent;