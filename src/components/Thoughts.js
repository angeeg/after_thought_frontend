import React, { useState, useEffect } from "react";
import {useNavigate, useParams, Link} from 'react-router-dom'
import ThoughtForm from './ThoughtForm'
import OneThought from './OneThought'

let baseURL = "http://localhost:8000/after-thought/v1";



function Thoughts(props)  {
    const navigate = useNavigate()
    const [state, setState] = useState({
        category: '',
        thoughts: []
    })
    
    const [body, setBody] = useState('')
    const [thoughtForm, setThoughtForm] = useState(false)
    const [oneThought, setOneThought] = useState(false)
    const {id} = useParams()

    const getThoughts = () => {
    fetch(baseURL + `/thoughts/category/${id}` ,{
        credentials: 'include'
    }).then((res) => {
        if(res.status === 200) {
            return res.json()
        } else {
            return []
        }
    }).then((data) => {
        if(data === []){
            setState({thoughts: data})
        } else {
            setState({
                // category: data[0].category.name,
                thoughts: data
            })
        }
    })
    navigate(`/thoughts/category/${id}`)
  };



  const handleAddThought = (thought) => {
      const allThoughts = [state.thoughts]
      allThoughts.push(thought)
      setState({thoughts: allThoughts})
  }

  const handleChange = (event) => {
      setBody({body: event.target.value})
  }

  const addThought = (event) => {
    event.preventDefault()
    fetch(baseURL + `/thoughts/category/${id}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.ok){
            return res.json()
        } throw new Error(res)
    }).then(resJson => {
        console.log('addThought', resJson)
        handleAddThought(resJson.data.body)
        setBody("")
    }).catch((err) => {console.log(err)})
    setThoughtForm(false)
    // setBody({body:''})
    // navigate(`/thoughts/category/${id}`)
    getThoughts()
    console.log(state.thoughts)
  }

  const showAddForm = () => {
      setThoughtForm(true)
  }

  const showOneThought = () => {
      setOneThought(true)
  }

//   const deleteThought = () => {
//     fetch(baseURL + `/thoughts/${id}`, {
//       method: "DELETE",
//       credentials: "include",
//     }).then((res) => {
//       const allThoughts = [state.thoughts];
//       const findIndex = allThoughts.findIndex((thought) => thought._id === id);
//       allThoughts.splice(findIndex, 1);
//       console.log(allThoughts)
//       setState({thoughts: allThoughts});
//     });
//   };


  useEffect(() => {
      getThoughts()
  }, [])
  
//   console.log(state.thoughts.data)
    return <div>
        {/* <h3>{state.thoughts.data.category.name}</h3> */}
        <ul>
            {state.thoughts?.data?.map((thought) => {
               return (<div key={thought.id}><Link to={`/thoughts/${thought.id}`} onClick={showOneThought}>
               <li>{thought.body}</li>
               </Link>
               {oneThought === true ? <OneThought thoughts={state.thoughts} /> : null}
               </div>)
            })}
        </ul>
        <button onClick={showAddForm}>+</button>
        {thoughtForm === true ? <ThoughtForm handleChange={handleChange} addThought={addThought}/> : null}
    </div>;
  
}

export default Thoughts;
