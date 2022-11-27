import { useEffect, useState } from "react";

let baseURL = "http://localhost:8000/after-thought/v1";

function Categories() {

  const [category, setCategories] = useState([])      

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
        console.log(data.data);
        setCategories(data.data);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return <div></div>;
}

export default Categories;
