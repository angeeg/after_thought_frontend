import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
let baseURL = "http://localhost:8000/after-thought/v1";



function Thoughts()  {
    const [state, setState] = useState({
        category: '',
        thoughts: []
    })

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
    
  };

  useEffect(() => {
      getThoughts()
  })
  
  console.log(state.thoughts.data)
    return <div>
        {/* <h3>{state.thoughts.data.category.name}</h3> */}
        <ul>
            {state.thoughts?.data?.map((thought) => {
               return <li>{thought.body}</li>
            })}
        </ul>
    </div>;
  
}

export default Thoughts;
