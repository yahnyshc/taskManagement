import { useState } from 'react';
import { useDraftsContext } from '../hooks/useDraftsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const DraftForm = () => {
    const { dispatch } = useDraftsContext();
    const { user } = useAuthContext()

    const [title, setTitle] = useState('');
    const [issue, setIssue] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user){
            setError("You must be logged in")
            return
        }

        const draft = {title, issue, content:""};

        const response = await fetch('/api/drafts/',{
            method: 'POST',
            body: JSON.stringify(draft),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setTitle('');
            setIssue('');
            setError(null)
            dispatch({type: 'CREATE_DRAFT', payload: json})
        }
    } 

    return (
        <div className="add-draft">
            <span>Add new draft:</span>
            <form className='create' onSubmit={handleSubmit}>
                <label>Title: </label>
                <input 
                    type='text' 
                    value={title}
                    style={{width:'50%', padding: '2px'}}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                <label>  Issue: </label>
                <input 
                    type='text' 
                    value={issue}
                    minLength="4" 
                    maxLength="4"
                    style={{width:'10%', padding: '2px'}}
                    onChange={(e) => setIssue(e.target.value)}
                    />
                <button className='add'>+</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
        
    )
}

export default DraftForm;