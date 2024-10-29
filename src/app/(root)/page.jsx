"use client";
import React, { useState } from "react";
import Category from "./Category/Category";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./page.css";

function Page() {
  const [categories, setCategories] = useState([]);

  const addCategory = () => {
    setCategories([...categories, { name: "", requirements: [] }]);
  };

  const handleCategoryChange = (index, name) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = name;
    setCategories(updatedCategories);
  };

  const addRequirement = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].requirements.push("");
    setCategories(updatedCategories);
  };

  const handleRequirementChange = (categoryIndex, requirementIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].requirements[requirementIndex] = value;
    setCategories(updatedCategories);
  };

  // Function to remove a requirement
  const handleRemoveRequirement = (categoryIndex, reqIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].requirements.splice(reqIndex, 1);
    setCategories(updatedCategories);
  };

  // Function to remove a category
  const handleRemoveCategory = (index) => {
    const updatedCategories = categories.filter(
      (_, catIndex) => catIndex !== index
    );
    setCategories(updatedCategories);
    toast.success("Category removed!");
  };

  const exportData = () => {
    const invalidRequirements = categories.some((category) =>
      category.requirements.some((req) => req.trim() === "")
    );

    if (invalidRequirements) {
      toast.error("Please ensure all requirements are filled out."); 
      return;
    }

    const data = categories.map((cat) => ({
      category: cat.name,
      requirements: cat.requirements,
    }));
    console.log("Exported Data:", data);
    toast.success("Data exported to console!"); 
  };

  return (
    <div className="maindiv" style={{ display: "flex" }}>
      <div style={{ flex: "2", marginRight: "20px" }}>
        <h1 className="mainheading">Requirement Submission List</h1>

        {categories.map((category, index) => (
          <Category
            key={index}
            category={category}
            onCategoryChange={(name) => handleCategoryChange(index, name)}
            onAddRequirement={() => addRequirement(index)}
            onRequirementChange={(reqIndex, value) =>
              handleRequirementChange(index, reqIndex, value)
            }
            onRemoveRequirement={(reqIndex) =>
              handleRemoveRequirement(index, reqIndex)
            } // Pass the remove function
            onRemoveCategory={() => handleRemoveCategory(index)} 
          />
        ))}

        <button onClick={addCategory} className="addCategorybutton">
          Add Category
        </button>
      </div>
      <div
        className="exportdiv"
        style={{
          flex: "1",
          padding: "2rem",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          height: "fit-content",
        }}
      >
        <h2 className="categoryPreview">Categories Preview </h2>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index}>
              <div className="categorypreviewsubdiv">
                <p className="categoryheader">{category.name}</p>
                <div>
                  {category.requirements.map((req, reqIndex) => (
                    <p key={reqIndex} className="categorybody">
                      {req}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories added yet.</p>
        )}

        <button onClick={exportData} className="exportbutton">
          Export
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Page;
