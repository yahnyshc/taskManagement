
const DraftDetails = ({draft, selected, onClick}) => {
    var date = new Date(draft.updatedAt)
    date = date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear();

    return (
        <div className="draft-details" id={(selected && selected._id===draft._id && "selected") || ""} onClick={onClick}>
            <h4>{draft.title}</h4>
            <hr></hr>
            <p><strong>issue: </strong>{draft.issue}</p>
            <p className="timestamp">{date}</p>
        </div>
    )
}

export default DraftDetails;