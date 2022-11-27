import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function CategoryForm(props) {
let navigate = useNavigate()
  const [name, setName] = useState("");

  let baseURL = "http://localhost:8000/after-thought/v1/categories/";

  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name)
  };

  const createCategory = (event) => {
    console.log(props.currentUser)
    event.preventDefault();
    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({name: name}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res);
      })
      .then((resJson) => {
        props.addCategory(resJson);
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
      navigate('categories')
  };

  return (
    <>
      
      <form onSubmit={createCategory}>
        <input id="name" name="name" type="text" onChange={handleChange} />
        <input type="submit" value="create" />
      </form>
    </>
  );
}

export default CategoryForm;
