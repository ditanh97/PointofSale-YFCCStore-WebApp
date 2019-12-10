import React from 'react'
import Chart from './Cart';
import Catalog from './Catalog';
import Setting from './Setting';
import Table from './Table';

const Layouts = (props) => {
    return (
        <div>
            {props.match.params.layoutName}
        </div>
    )
}

export default Layouts