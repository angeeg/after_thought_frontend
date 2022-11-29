import '../App.css'
import CategoryForm from "./CategoryForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditCategory from "./EditCategory";
import { List, ListItem, ListItemText } from '@mui/material'

function Categories(props) {
  // console.log(props.handleClick);
  let baseURL = "http://localhost:8000/after-thought/v1";
  const [categories, setCategories] = useState(props.categories);
  const [name, setName] = useState(categories.name);
  const [showEl, setShowEl] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setName({ name: event.target.value });
  };

  const handleClick = () => {
    setShowEl(true);
  };

  const editCategory = (category) => {
    // let id = categories.find(category => category.id === id)
    // let name = categories.find(category => category.name === name)
    fetch(baseURL + "/categories/" + category.id, {
      method: "PUT",
      body: JSON.stringify({name: category.name}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then((res) => res.json())
    .then((resJson) => {
      const updatedCategories = [categories]
      const findIndex = categories.findIndex(
        (category) => category.id === resJson.id
      )
      updatedCategories[findIndex].name = resJson.name
      setCategories(updatedCategories)
    })
    console.log('edit button clicked')
  };

  console.log('name', name)
  return (
    <div className='categories'>
      <h1>Categories</h1>
      <List>
      {props.categories.map((category) => {
        return (
          <div key={category.id}>
            <ListItem className='cat-name'>
            <Link to={`/thoughts/category/${category.id}`} >{category.name}</Link>
            {/* <button onClick={handleClick}>✏️</button>
            {showEl && (
              <form onSubmit={props.editCategory(category)}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={category.name}
                  onChange={handleChange}
                />
                <input type="submit" value="save" />
              </form>
            )} */}
            
            <button className='delete-btn' onClick={() => props.deleteCategory(category.id)}>
              {" "}
              X
            </button>
            </ListItem>
          </div>
        );
      })}
      </List>
      <button onClick={props.handleClick} className='add-btn'>+</button>
    </div>
  );
}

export default Categories;
