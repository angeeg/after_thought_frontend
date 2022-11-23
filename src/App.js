import React, { Component } from "react";
// CSS
import "./App.css";
// COMPONENTS
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutBtn from "./components/LogoutBtn";
import NavBar from "./components/NavBar";

let baseURL = "http://localhost:8000/after-thought/v1";

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }
  getCategories = () => {
    fetch(baseURL + '/categories/', {
      credentials: 'include'
    })
    .then(res => {
      if(res.status === 200){
        return res.json()
      } else {
        return []
      }
    })
    .then(data => {
      console.log(data)
      this.setState({
        categories: data.data
      })
    })
  }

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
        this.getCategories()
        // after the user registers it will redirect them to login page
        // navigate("login")
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  login = async (e) => {
    console.log("loginUser");
    console.log(e.target.email.value);
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

      console.log(response);
      console.log("BODY: ", response.body);

      if (response.status === 200) {
        this.getCategories()
        // once user logs in it will redirect them to the dogs page
        // navigate("dogs")
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  

  render() {
    return (
      <div>
        <RegisterForm register={this.register}/>
        <LoginForm login={this.login}/>
      </div>
    );
  }
}

export default App;
