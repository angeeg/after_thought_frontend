import CategoryForm from "./CategoryForm";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AddCategoryBtn from './AddCategoryBtn'

function Categories(props) {
  // console.log(props.handleClick);
  let navigate = useNavigate()

 

  return (
    <div>
      <h1>Categories</h1>
      <button onClick={props.handleClick}>+</button>
      {props.categories.map((category) => {
        return <h2 key={category.id}>{category.name}</h2>;
      })}
    </div>
  );
}

export default Categories;
