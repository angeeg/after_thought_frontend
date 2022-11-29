import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
let baseURL = "http://localhost:8000/after-thought/v1";

function OneThought(props) {
    const [oneThought, setOneThought] = useState({
        thought: '',
        starred: false
    })
    const [thoughts, setThoughts] = useState(props.thoughts)
    const navigate = useNavigate()
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

    

    useEffect(()=> {
        getOneThought()
    }, [])

    return (
        <div>
            <h2>{oneThought.thought}</h2>
            <button onClick={deleteThought}>X</button>
        </div>
    )
}

export default OneThought
