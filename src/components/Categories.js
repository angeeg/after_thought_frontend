import CategoryForm from "./CategoryForm";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Categories(props) {
  // console.log(props.handleClick);
  let navigate = useNavigate()

 

  return (
    <div>
      <h1>Categories</h1>
      <button onClick={props.handleClick}>+</button>
      {props.categories.map((category, index) => {
        return (
        <>
        <h2 key={index}>{category.name}</h2>
        <button onClick={() => props.deleteCategory(category.id)}> X</button>
        </>
        )
      })}
    </div>
  );
}

export default Categories;
