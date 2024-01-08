import { useState } from 'react';

const DraftContent = ({draft}) => {
    const [body, setBody] = useState(draft.content);

    return (
        <div className="draft-content">
            <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        </div>
    )
}

export default DraftContent;