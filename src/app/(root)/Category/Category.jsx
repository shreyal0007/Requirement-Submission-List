// Category.jsx
import React from "react";
import "./Category.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
function Category({
  category,
  onCategoryChange,
  onAddRequirement,
  onRequirementChange,
  onRemoveRequirement,
  onRemoveCategory, 
}) {
  return (
    <div className="categorydiv">
      <div className="subcatdiv">
        <label className="categorylabel">Category</label>
        <input
          type="text"
          placeholder="Enter the Category"
          className="categoryinput"
          value={category.name}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
      </div>

      {category.requirements.map((req, index) => (
        <div key={index} className="reqdiv">
          <label className="reqlabel">Requirement</label>
          <input
            type="text"
            placeholder="Enter the Requirements"
            value={req}
            onChange={(e) => onRequirementChange(index, e.target.value)}
            className="reqinput"
          />
    
          <RiDeleteBin5Fill
            onClick={() => onRemoveRequirement(index)} // Call the remove function
            className="removeReqButton"
          />
  
        </div>
      ))}
      <div className="buttondiv">
        <button onClick={onAddRequirement} className="addreqbutton">
          Add Requirement
        </button>
        
        <button
          onClick={onRemoveCategory} 
          className="removeCatButton"
        >
          Delete Requirement
        </button>
      </div>
    </div>
  );
}

export default Category;
