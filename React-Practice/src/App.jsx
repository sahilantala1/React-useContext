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

  const handleDuplicateButtonClick = (postId) => {
    const postToDuplicate = selectedTab.find((post) => post.Id === postId);

    // Find the highest ID in the current list
    const highestId = selectedTab.reduce((maxId, post) => {
      const postId = parseInt(post.Id.slice(-4));
      return postId > maxId ? postId : maxId;
    }, 0);

    // Generate a unique ID by incrementing the highest ID by 1
    const duplicatedId = highestId + 1;

    const duplicatedPost = {
      ...postToDuplicate,
      Id: idGenerator(duplicatedId),
      DateT: new Date().toISOString().slice(0, 10), // Assuming you want to update the date to today's date
    };

    setSelectedTab([...selectedTab, duplicatedPost]);
  };

  const imageUrlPattern = /\.(jpg|jpeg|png|gif|webp)$/i;
  const base64Pattern = /^data:image\/(jpeg|png|gif);base64,/i;

  const [selectedTab, setSelectedTab] = useState(getLocalItems());
  const [inputValues, setInputValues] = useState({
    Name: "",
    DateT: "",
    Description: "",
    Images: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [idCounter, setIdCounter] = useState(() => {
    const localItems = getLocalItems();
    if (localItems.length > 0) {
      const maxId = localItems.reduce((max, item) => {
        const itemId = item.Id;
        if (itemId && typeof itemId === "string" && itemId.length >= 4) {
          const lastFourDigits = parseInt(itemId.slice(-4));
          return Math.max(max, lastFourDigits);
        }
        return max;
      }, 0);
      return maxId + 1;
    } else {
      return 1;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleAddButtonClick = (e) => {
    e.preventDefault();

    // Find the highest ID in the current list
    const highestId = selectedTab.reduce((maxId, post) => {
      const postId = parseInt(post.Id.slice(-4));
      return postId > maxId ? postId : maxId;
    }, 0);

    // Generate a unique ID by incrementing the highest ID by 1
    const newId = highestId + 1;

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

    // Validation for image URL format
    if (!isValidImageUrl(inputValues.Images)) {
      alert(
        "Invalid image URL format. Image format should be jpg, jpeg, png, gif, or webp."
      );
      return;
    }
    if (editIndex !== null) {
      const updatedTab = [...selectedTab];
      const updatedBlog = {
        Id: updatedTab[editIndex].Id,
        Name: inputValues.Name,
        DateT: inputValues.DateT,
        Description: inputValues.Description,
        Images: inputValues.Images,
      };
      updatedTab[editIndex] = updatedBlog;
      setSelectedTab(updatedTab);
      setEditIndex(null);
    } else {
      const newBlog = {
        Id: idGenerator(newId),
        Name: inputValues.Name,
        DateT: inputValues.DateT,
        Description: inputValues.Description,
        Images: inputValues.Images,
      };
      setSelectedTab([...selectedTab, newBlog]);
    }

    setInputValues({
      Name: "",
      DateT: "",
      Description: "",
      Images: "",
    });
  };

  const handleEditButtonClick = (index) => {
    setEditIndex(index);
    const blogToEdit = selectedTab[index];
    setInputValues({
      Name: blogToEdit.Name,
      DateT: blogToEdit.DateT,
      Description: blogToEdit.Description,
      Images: blogToEdit.Images,
    });
  };

  const handleDeleteButtonClick = () => {
    if (editIndex !== null) {
      // Clear input fields
      setInputValues({
        Name: "",
        DateT: "",
        Description: "",
        Images: "",
      });
      // Delete the edited blog
      const updatedTab = selectedTab.filter((_, i) => i !== editIndex);
      setSelectedTab(updatedTab);
      setEditIndex(null);
      // Alert for deletion
      alert("Edited blog deleted successfully!");
    } else {
      if (selectedTab.length > 0) {
        // Delete the selected blog
        const updatedTab = [...selectedTab];
        updatedTab.splice(editIndex, 1);
        setSelectedTab(updatedTab);
        // Alert for deletion
        alert("Blog deleted successfully!");
      } else {
        alert("No blogs to delete.");
      }
    }
  };

  // const buttonText = editIndex !== null ? "Update" : "Add";

  // <button onClick={handleDeleteButtonClick}>
  //   {editIndex !== null ? "Clear & Add" : "Delete"}
  // </button>;

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(selectedTab));
  }, [selectedTab]);

  const idGenerator = (counter) => {
    const showdate = new Date();
    const displaytodaysdate =
      showdate.getFullYear() +
      (showdate.getMonth() + 1).toString().padStart(2, "0") +
      showdate.getDate().toString().padStart(2, "0") +
      counter.toString().padStart(4, "0");
    return displaytodaysdate;
  };

  const isValidImageUrl = (url) => {
    return imageUrlPattern.test(url) || base64Pattern.test(url);
  };

  const filteredBlogs = selectedTab.filter(
    (blog) =>
      blog.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name or Description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="detail">
        {filteredBlogs.map((item, index) => (
          <div key={index} className="showdata">
            <div>
              <p>
                <img className="blogimg" src={item.Images} alt="" />
              </p>
              <p>Id : {item.Id}</p>
              <p>Name: {item.Name}</p>
              <p>Date: {item.DateT}</p>
              <p className="disc">Description: {item.Description}</p>
              <div className="buttons">
                <button
                  className="btn btn-primary update-button"
                  onClick={() => handleEditButtonClick(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger delete-button"
                  onClick={handleDeleteButtonClick}
                >
                  Delete
                </button>

                <button
                  className="btn btn-secondary duplicate-button"
                  onClick={() => handleDuplicateButtonClick(item.Id)} // Pass item.Id to the function
                >
                  Duplicate
                </button>
              </div>
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
