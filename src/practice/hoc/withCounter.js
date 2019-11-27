import React, {useState} from 'react'

const UpdatedComponent = OriginalComponent => {

    const NewComponent = () => {
        const [state, setState] = useState({
            count: 0
        })
        //resemble setState to class component
        const incrementCount = () => {
            setState (prevState => ({
                ...prevState, 
                count: prevState.count + 1
            }))
        }
            return <OriginalComponent count={state.count} incrementCount={incrementCount}/>
    }
    return NewComponent
}

export default UpdatedComponent