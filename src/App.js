import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// CSS
import "./App.css";
// COMPONENTS
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import Categories from "./components/Categories";
import CategoryForm from "./components/CategoryForm";
import Thoughts from './components/Thoughts'
import OneThought from './components/OneThought'

let baseURL = ''
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:8000/after-thought/v1'
} else {
  baseURL = process.env.REACT_APP_API_URL
}

// let baseURL = `${process.env.REACT_APP_API_URL}after-thought/v1`;

export default function App() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [name, setName] = useState("")

  
  const getCategories = () => {
    fetch(baseURL + "/categories/", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        console.log('getCategories() data:', data.data);
        setCurrentUser(data.data[0].author.username);
        setCategories(data.data);
        console.log("state in getCategories():", currentUser, categories);
      });
    navigate("categories");
  };

  const register = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const url = baseURL + "/users/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log("new user registered");
        // getCategories();
        // after the user registers it will redirect them to login page
        navigate("login");
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const url = baseURL + "/users/login";
    const loginBody = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(loginBody),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        getCategories();
        setIsLoggedIn(true);
        console.log("state in login:", categories, currentUser, isLoggedIn);

        // once user logs in it will redirect them to the dogs page
        navigate("categories");
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  // logout = () => {
  //   const response = fetch(baseURL + '/users/logout', {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Access-Control-Allow-Origin': baseURL
  //     }
  //   });
  //   if (response.status === 200) {
  //     this.setState({ isLoggedIn: false })
  //     console.log('User has been logged out')
  //     console.log('State in logout function:',this.state)
  //   }
  // };

  const addCategory = (category) => {
    const copyCategories = [categories];
    console.log(copyCategories)
    console.log('paramater passed in addCategory()', category)
    copyCategories.push(category);
    setCategories(copyCategories);
    navigate("categories");
    console.log('end of addCategory():', categories);
  };

  const handleClick = () => {
    navigate("add-category");
    console.log("handleclick clicked");
    console.log(currentUser);
  };

  const deleteCategory = (id) => {
    fetch(baseURL + "/categories/" + id, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      const copyCategories = [categories];
      const findIndex = categories.findIndex((category) => category._id === id);
      copyCategories.splice(findIndex, 1);
      setCategories(copyCategories);
      getCategories()
    });
    
   
  };

  // const editCategory = (category) => {
  //   // let id = categories.find(category => category.id === id)
  //   // let name = categories.find(category => category.name === name)
  //   fetch(baseURL + "/categories/" + category.id, {
  //     method: "PUT",
  //     body: JSON.stringify({name: category.name}),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'include'
  //   }).then((res) => res.json())
  //   .then((resJson) => {
  //     console.log(category.name)
  //     const updatedCategories = [categories]
  //     const findIndex = categories.findIndex(
  //       (category) => category.id === resJson.id
  //     )
  //     console.log(updatedCategories[0])
  //     updatedCategories[findIndex].name = resJson.name
  //     setCategories(updatedCategories)
  //   })
  //   console.log('edit button clicked')
  // };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="register" element={<RegisterForm register={register} />} />
        {/* need to figure out how to change the path if user is logged in - when changing to route /categories user data isn't persisting */}
        <Route
          path="login"
          element={
            !isLoggedIn ? (
              <LoginForm login={login} />
            ) : (
              <Categories categories={categories} />
            )
          }
        />

        <Route
          path="add-category"
          element={
            <CategoryForm
              addCategory={addCategory}
              currentUser={currentUser}
              getCategories={getCategories}
            />
          }
        />

        
        <Route
          path="categories"
          element={
            <Categories
            getCategories={getCategories}
              categories={categories}
              handleClick={handleClick}
              addCategory={addCategory}
              // editCategory={editCategory}
              deleteCategory={deleteCategory}
            />
          }
        />

        <Route path='/thoughts/category/:id' element={<Thoughts getCategories={getCategories}/>}/>\

        <Route path='/thoughts/:id' element={<OneThought/>}/>
      </Routes>

          
      {/* <LogoutBtn logout={this.logout} /> */}
    
    </div>
  );
}
