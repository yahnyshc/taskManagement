import { useDraftsContext } from '../hooks/useDraftsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const DraftDetails = ({draft, selected, onClick}) => {
    const { dispatch } = useDraftsContext();
    const [ title, setTitle ] = useState(draft.title);
    const [ editingTitle, setEditingTitle ] = useState(false);
    const [ error, setError ] = useState(null);
    const { user } = useAuthContext()

    var date = formatDistanceToNow( new Date(draft.updatedAt), { addSuffix: true } )
    // var date = new Date(draft.updatedAt)
    // date = date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear();

    const handleDelete = async (e) => {
        e.stopPropagation();

        if (!user){
            return
        }

        const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/drafts/'+draft._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_DRAFT', payload:json})
        }
    }

    const handleEdit = (e) => {
        setEditingTitle(true);
    }

    const handleEditTitleConfim = async (e) => {
        e.stopPropagation();

        const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/drafts/'+draft._id ,{
            method: 'PATCH',
            body: JSON.stringify({title: title}),
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
            json.title = title;
            setEditingTitle(false);
            dispatch({type: 'UPDATE_DRAFT', payload: json})
        }
    }

    return (
        <div className="draft-details" id={(selected && selected._id===draft._id && "selected") || ""} onClick={onClick}>
            {!editingTitle && 
                <div>
                    <h4 title={title}>{title}</h4>
                    <div className='vertical-line'>
                        <div className='edit' onClick={(e) => handleEdit(e)}>
                            <img src="edit-icon.png" alt="edit"></img>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            }
            
            {editingTitle && <div>
                <form onSubmit={handleEditTitleConfim}>
                    <input 
                        type='text' 
                        value={title}
                        style={{width:'44%', 'marginBottom': '5px'}}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                        <div className='vertical-line'>
                            <button className='edit'>
                                <img src="confirm.png" alt="confirm"></img>
                            </button>
                            <hr></hr>
                        </div>
                        
                </form>
                
            </div>
            }
            
            {error && <div className='error'>{error}</div>}
            
            <p><strong>issue: </strong>{(draft.issue && draft.issue) || "None"}</p>
            <p className="timestamp">{date}</p>
            <div className="delete" onClick={(e) => handleDelete(e)}><img src="trash-can.png" alt="delete"></img></div>
        </div>
    )
}

export default DraftDetails;