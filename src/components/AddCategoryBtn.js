import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function AddCategoryBtn(props) {
    let navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('add-category')}>+</button>
        </div>
    )
}

export default AddCategoryBtn
