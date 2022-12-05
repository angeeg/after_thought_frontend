import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OneCategory() {
  let [category, setCategory] = useState({});
  let { id } = useParams();

  let baseURL = "";
  if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:8000/after-thought/v1";
  } else {
    baseURL = `${process.env.REACT_APP_API_URL}/categories/`;
  }

  const getCategory = (id) => {
    fetch(baseURL + id, {
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
        console.log("categories.js:", data.data);
        setCategory(data.data);
      });
  };

  useEffect(() => {
    getCategory(id);
  }, []);

  return (
    <div>
      <h1>{category.name}</h1>
    </div>
  );
}

export default OneCategory;
