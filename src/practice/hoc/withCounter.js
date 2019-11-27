import React, {useState} from 'react'

const withCounter = WrappedComponent => {

    const WithCounter = () => {
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
            return <WrappedComponent count={state.count} incrementCount={incrementCount}/>
    }
    return WithCounter
}

export default withCounter