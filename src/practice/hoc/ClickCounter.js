import React, { Component, useState } from 'react'
import UpdatedComponent from './withCounter'

// class ClickCounter extends Component {
//     constructor(props) {
//         super(props)
//         this.state ={
//             count: 0
//         }
//     }

//     incrementCount = () => {
//         this.setState (prevState => {
//             return {count: prevState.count +1}
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.incrementCount}>{this.props.name} Click {this.state.count} Times</button>
//             </div>
//         )
//     }
// }


const ClickCounter = (props) => {
    const {count, incrementCount} = props

        return (
            <div>
                <button onClick={incrementCount}>Click {count} Times</button>
            </div>
        )
}


export default UpdatedComponent(ClickCounter);



