import React, {useState} from "react";

function EditCategory(props) {
    const [name, setName] = useState(props.categories.name)
    const handleChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
      };

  return (
    <form onSubmit={props.editCategory}>
      <input id="name" name="name" type="text" value={name} onChange={handleChange} />
      <input type="submit" value="save" />
    </form>
  );
}

export default EditCategory;
