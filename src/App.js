import React, { Component } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
// CSS
import "./App.css";
// COMPONENTS
import Home from "./components/Home"
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutBtn from "./components/LogoutBtn";
import NavBar from "./components/NavBar";
import Categories from "./components/Categories";

let baseURL = "http://localhost:8000/after-thought/v1";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: '',
      isLoggedIn: false,
      categories: [],
    };
  }
  getCategories = () => {
    fetch(baseURL + '/categories/', {
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        console.log(data.data);
        this.setState({
          currentUser: data.data[0].author.username,
          categories: data.data,
        });
        console.log('state in categories:', this.state)
      });
      
  };

  register = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const url = baseURL + "/users/register";
    try {
      const response = await fetch(url, {
        method: "POST",
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
      if (response.status === 201) {
        console.log("new user registered");
        this.getCategories();
        // after the user registers it will redirect them to login page
        // navigate("login")
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  login = async (e) => {
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
        this.getCategories()
        this.setState({ isLoggedIn: true })
        console.log('state in login:', this.state)
        
        
        
        // once user logs in it will redirect them to the dogs page
        // navigate('dogs')
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

  render() {
    console.log('state in render:', this.state)
    return (
      <div>
        <NavBar/>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='register' element={<RegisterForm register={this.register} />}/>
          {/* need to figure out how to change the path if user is logged in - when changing to route /categories user data isn't persisting */}
          <Route path='login' element={!this.state.isLoggedIn ? <LoginForm login={this.login}/> : <Categories categories={this.state.categories}/> }/>
          <Route path='categories' element={<Categories categories={this.state.categories}/>}/>
        </Routes>
        
        
        {/* <LogoutBtn logout={this.logout} /> */}
        
      </div>
    );
  }
}

export default App;
