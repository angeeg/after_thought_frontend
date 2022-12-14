import '../App.css'
import React, { useState, useEffect } from "react";
import {useNavigate, useParams, Link} from 'react-router-dom'
import ThoughtForm from './ThoughtForm'
import OneThought from './OneThought'
import { List, ListItem, Divider } from '@mui/material'
 
// let baseURL = ''
// if(process.env.NODE_ENV === 'development'){
//   baseURL = 'http://localhost:8000/after-thought/v1'
// } else {
//   baseURL = process.env.REACT_APP_API_URL
// }


let baseURL = `${process.env.REACT_APP_API_URL}/after-thought/v1`

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
      getThoughts()
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
    
    console.log(state.thoughts)
  }

  const showAddForm = () => {
      setThoughtForm(true)
  }

  const showOneThought = () => {
      setOneThought(true)
  }

  const goBack = () => {
      props.getCategories()
  }


  useEffect(() => {
      getThoughts()
  }, [])
  
  console.log(state.thoughts.data)
    return <div className='thoughts'>
        {/* <h3>{state.thoughts.data.category.name}</h3> */}
        {/* <h1>{state.thoughts.data[0].category.name}</h1> */}
        <List>
            {state.thoughts?.data?.map((thought) => {
               return (<div key={thought.id}>
                   
                   <Link to={`/thoughts/${thought.id}`} onClick={showOneThought}>
               <ListItem className='thought-text'>{thought.body}</ListItem>
               </Link>
               <Divider variant='middle'/>
               {oneThought === true ? <OneThought thoughts={state.thoughts} /> : null}
               </div>)
            })}
        </List>
        <div className='thought-btns'>
        <button className='back-btn'onClick={goBack}>Back</button>
        <button className='add-btn' onClick={showAddForm}>+</button>
        {thoughtForm === true ? <ThoughtForm handleChange={handleChange} addThought={addThought}/> : null}
        </div>
    </div>;
  
}

export default Thoughts;
