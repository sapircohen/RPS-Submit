import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

const PublishProject = (props)=>{
    return(
        <label>
            <p dir="rtl">{`  האם לפרסם את הפרויקט?`}</p>
                <Toggle
                onClick={props.ChangePublish}
                checked={props.isPublished}            
                />
        </label>
    )
}
export default PublishProject;