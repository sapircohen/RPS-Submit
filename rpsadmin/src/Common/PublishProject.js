import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

const PublishProject = (props)=>{
    return(
        <label>
            <p dir="rtl">{`  האם לפרסם את הפרויקט?`}</p>
                <Toggle
                defaultChecked={props.isPublished}
                onChange={props.ChangePublish}                    
                />
        </label>
    )
}
export default PublishProject;