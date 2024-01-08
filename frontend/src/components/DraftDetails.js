import { useDraftsContext } from '../hooks/useDraftsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const DraftDetails = ({draft, selected, onClick}) => {
    const { dispatch } = useDraftsContext();

    var date = formatDistanceToNow( new Date(draft.updatedAt), { addSuffix: true } )
    // var date = new Date(draft.updatedAt)
    // date = date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear();

    const handleDelete = async (e) => {
        e.stopPropagation();

        const response = await fetch('/api/drafts/'+draft._id, {
            method: 'DELETE'
        });
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_DRAFT', payload:json})
        }
    }

    return (
        <div className="draft-details" id={(selected && selected._id===draft._id && "selected") || ""} onClick={onClick}>
            <h4 title={draft.title}>{draft.title}</h4>
            <hr></hr>
            <p><strong>issue: </strong>{(draft.issue && draft.issue) || "None"}</p>
            <p className="timestamp">{date}</p>
            <div className="delete" onClick={(e) => handleDelete(e)}><img src="trash-can.png" alt="delete"></img></div>
        </div>
    )
}

export default DraftDetails;