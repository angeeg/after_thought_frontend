import { useEffect, useState } from "react";

let baseURL = "http://localhost:8000/after-thought/v1";

function Categories(props) {
  console.log(props.categories);

  return (
    <div>
        <h1>Categories</h1>
        <button>+</button>
      {props.categories.map((category) => {
        return (
        <h2 key={category.id}>{category.name}</h2>
        )
      })}
    </div>
  );
}

export default Categories;
