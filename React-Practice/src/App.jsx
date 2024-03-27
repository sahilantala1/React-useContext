import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const [selectedTab, setSelectedTab] = useState(getLocalItems());
  const [inputValues, setInputValues] = useState({
    Name: "",
    DateT: "",
    Description: "",
    Images: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleAddButtonClick = (e) => {
    e.preventDefault();
    // Validation for name (contains only characters, no digits or special characters)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(inputValues.Name)) {
      alert("Name should contain only letters and spaces");
      return;
    }

    // Validation for name (maximum 10 characters)
    if (inputValues.Name.length > 10) {
      alert("Name should contain maximum 10 characters");
      return;
    }

    // Validation for description (minimum 10 words and maximum 50 words)
    const descriptionWords = inputValues.Description.split(/\s+/).filter(
      (word) => word !== ""
    );
    if (descriptionWords.length < 10 || descriptionWords.length > 50) {
      alert("Description should contain between 10 and 50 words");
      return;
    }

    if (editIndex !== null) {
      console.log("if");
      const updatedTab = [...selectedTab];
      const updatedBlog = {
        Id: updatedTab[editIndex].Id, // Set the ID when adding a new blog
        Name: inputValues.Name,
        DateT: inputValues.DateT,
        Description: inputValues.Description,
        Images: inputValues.Images,
      };
      // If editing, update the selected blog post
      updatedTab[editIndex] = updatedBlog;
      setSelectedTab(updatedTab);
      setEditIndex(null); // Reset editIndex after update
    } else {
      console.log("else");
      const newBlog = {
        Id: idGenerator(), // Set the ID when adding a new blog
        Name: inputValues.Name,
        DateT: inputValues.DateT,
        Description: inputValues.Description,
        Images: inputValues.Images,
      };
      // If not editing, add a new blog post
      setSelectedTab([...selectedTab, newBlog]);
    }

    setInputValues({
      Name: "",
      DateT: "",
      Description: "",
      Images: "",
    });
  };

  const handleDeleteButtonClick = (index) => {
    const updatedTab = selectedTab.filter((_, i) => i !== index);
    setSelectedTab(updatedTab);
    setIdCounter(updatedTab.length);
  };

  const handleEditButtonClick = (index) => {
    const blogToEdit = selectedTab[index];
    setInputValues(blogToEdit);
    setEditIndex(index);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(selectedTab));
  }, [selectedTab]);

  const idGenerator = () => {
    const showdate = new Date();
    const displaytodaysdate =
      showdate.getFullYear() +
      (showdate.getMonth() + 1).toString().padStart(2, "0") +
      showdate.getDate().toString().padStart(2, "0") +
      idCounter.toString().padStart(4, "0");
    setIdCounter(idCounter + 1);
    return displaytodaysdate;
  };

  return (
    <div className="app-container">
      <div className="detail">
        {selectedTab.map((item, index) => (
          <div key={index} className="showdata">
            <div>
              <p>
                <img className="blogimg" src={item.Images} alt="" />
              </p>
              <p>Id : {item.Id}</p>
              <p>Name: {item.Name}</p>
              <p>Date: {item.DateT}</p>
              <p>Description: {item.Description}</p>
              <button
                className="btn btn-primary update-button"
                onClick={() => handleEditButtonClick(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger delete-button"
                onClick={() => handleDeleteButtonClick(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <form action="">
          <input
            type="text"
            name="Name"
            value={inputValues.Name}
            onChange={handleInputChange}
            placeholder="Enter Blog Name"
            required
          />
          <input
            type="date"
            name="DateT"
            value={inputValues.DateT}
            onChange={handleInputChange}
            placeholder="Enter Date"
            required
          />
          <input
            type="text"
            name="Description"
            value={inputValues.Description}
            onChange={handleInputChange}
            placeholder="Enter Description"
            required
          />
          <input
            type="text"
            name="Images"
            value={inputValues.Images}
            onChange={handleInputChange}
            placeholder="Enter Image URL"
            required
          />
          <button
            className="btn btn-success add-button"
            onClick={handleAddButtonClick}
          >
            {editIndex !== null ? "Update" : "ADD"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
