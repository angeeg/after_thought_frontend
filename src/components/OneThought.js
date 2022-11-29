import React, {useState, useEffect} from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
let baseURL = `${process.env.REACT_APP_API_URL}after-thought/v1`;

function OneThought(props) {
    const [oneThought, setOneThought] = useState({
        thought: '',
        starred: false
    })
    const [thoughts, setThoughts] = useState(props.thoughts)
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()

    const getOneThought = () => {
        fetch(baseURL + `/thoughts/${id}`, {
            credentials: 'include'
        }).then((res) => {
            if(res.status === 200) {
              return res.json()
            } else {
               return null 
            }
        }).then((data) => {
            console.log(data)
          setOneThought({thought: data.data.body})
        })
    }

    const goBack = () => {
        navigate(-1)
    }
    
    const deleteThought = () => {
        fetch(baseURL + `/thoughts/${id}`, {
          method: "DELETE",
          credentials: "include",
        }).then((res) => {
          const allThoughts = [thoughts];
          const findIndex = allThoughts.findIndex((thought) => thought.id === id);
          allThoughts.splice(findIndex, 1);
          console.log(allThoughts)
          setThoughts({thoughts: allThoughts});
        });
        goBack()
      };

    const handleChange = (event) => {
        event.preventDefault()
        setOneThought({[event.target.id]: event.target.value})
    }

    const editThought = (selectedThought) => {
        // event.preventDefault()
        fetch(baseURL + `/thoughts/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                body: oneThought.thought
            })
        }).then((res) => {
            res.json()
        }).then((res) => {
            if(res.status === 200){
                getOneThought()
                console.log('update complete')
            }
        })
    }

    useEffect(()=> {
        getOneThought()
    }, [])

    return (
        <div>
            <h2>{oneThought.thought}</h2>
            <button onClick={goBack}>Go back</button>
            <button onClick={()=> setEdit(true)}>Edit</button>
            {edit === true ?
            <form onSubmit={editThought}>
            <textarea id='thought' value={oneThought.thought} onChange={handleChange}/> 
            <input type='submit' value='save'/>  
            </form> : null}
            <button onClick={deleteThought}>X</button>
        </div>
    )
}

export default OneThought
