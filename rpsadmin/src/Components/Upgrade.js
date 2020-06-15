import React from 'react';
import {upgrade2} from '../assests/image';
import '../css/upgrade.css'
const Upgrade = () => {
    return ( 
        <div id="upgradePage">
            <img
                alt="upgrades"
                src={upgrade2}
            />
            <div id="text">
                המערכת עוברת שדרוג,
                <br/>
                <br/>
                נחזור בקרוב.
            </div>
        </div> 
    );
}
 
export default Upgrade;