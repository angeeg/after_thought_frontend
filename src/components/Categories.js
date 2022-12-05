import '../App.css'
// import CategoryForm from "./CategoryForm";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import EditCategory from "./EditCategory";
import { List, ListItem} from '@mui/material'

function Categories(props) {

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
