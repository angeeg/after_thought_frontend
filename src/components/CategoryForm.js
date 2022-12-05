import React, { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

function CategoryForm(props) {
  // let navigate = useNavigate()
  const [name, setName] = useState("");

 
  let baseURL = "";
  if (process.env.NODE_ENV === "development") {
    baseURL = `${process.env.REACT_APP_API_URL}/categories/`;
  } else {
    baseURL = process.env.REACT_APP_API_URL;
  }

  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const createCategory = (event) => {
    console.log(props.currentUser);
    event.preventDefault();
    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
        props.getCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-cat-form">
      <h2>New Category</h2>
      <form onSubmit={createCategory}>
        <input id="name" name="name" type="text" onChange={handleChange} />
        <br />
        <input type="submit" value="create" />
      </form>
    </div>
  );
}

export default CategoryForm;
