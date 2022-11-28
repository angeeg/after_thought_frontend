import React from 'react'

function ThoughtForm(props) {

    return (
        <form onSubmit={props.addThought}>
            <textarea type='text' name='body' id='body' onChange={props.handleChange}/>
            <input type='submit' value='save'/>
        </form>
    )
}

export default ThoughtForm
