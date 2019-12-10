import React from 'react';
import {useLocation} from 'react-router-dom';


const NoPage = () => {
    let location = useLocation()
    return (
        <div>
            <h3>This page can't be reached</h3>
            <p>Errror 404. {location.pathname}'s could not be found.</p>
        </div>
    )
}


export default NoPage