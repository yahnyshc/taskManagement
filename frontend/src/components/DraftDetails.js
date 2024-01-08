
const DraftDetails = ({draft, onClick}) => {
    var date = new Date(draft.createdAt)
    date = date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear();

    return (
        <div className="draft-details" onClick={onClick}>
            <h4>{draft.title}</h4>
            <p><strong>issue: </strong>{draft.issue}</p>
            <p className="timestamp">{date}</p>
        </div>
    )
}

export default DraftDetails;