import { useState } from 'react';
import { useDraftsContext } from '../hooks/useDraftsContext';

const DraftForm = () => {
    const { dispatch } = useDraftsContext();

    const [title, setTitle] = useState('');
    const [issue, setIssue] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const draft = {title, issue, content:""};

        const response = await fetch('/api/drafts/',{
            method: 'POST',
            body: JSON.stringify(draft),
            headers: {
                'Content-Type': 'application/json'
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
            console.log('new draft added', json)
            dispatch({type: 'CREATE_DRAFT', payload: json})
        }
    } 

    return (
        <div className="add-draft">
            <form className='create' onSubmit={handleSubmit}>
                <label>Title: </label>
                <input 
                    type='text' 
                    value={title}
                    style={{width:'44%'}}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                <label>  Issue: </label>
                <input 
                    type='text' 
                    value={issue}
                    minLength="4" 
                    maxLength="4"
                    style={{width:'8%'}}
                    onChange={(e) => setIssue(e.target.value)}
                    />
                <button className='add'>+</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
        
    )
}

export default DraftForm;