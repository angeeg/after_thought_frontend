import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

let baseURL = "http://localhost:8000/after-thought/v1";

function OneThought() {
    const [oneThought, setOneThought] = useState({
        thought: '',
        starred: false
    })
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

    useEffect(()=> {
        getOneThought()
    }, [])

    return (
        <div>
            <h2>{oneThought.thought}</h2>
        </div>
    )
}

export default OneThought
