import React from 'react'
import { Radio,Form } from 'semantic-ui-react'



const RadioB = (props) => (
        <input 
            type="radio"
            checked={props.checked===props.aspect} 
            name={props.name} 
            value={props.aspect}
        />
        // {props.name}
)

export default RadioB;