import React, { useState, useEffect} from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({color: '', id: `${Date.now}_${Math.random}`, code: {hex: ''}}); 


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now? 
    //updateColors()
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(r => {
      console.log(r.data)
      updateColors(colors.map(i => (i.id === colorToEdit.id) ? i = colorToEdit : i = i))
      
     
     
    })
    .catch(error => console.log(error))
    setColorToEdit(initialColor)
  };

  const deleteColor = () => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${colorToEdit.id}`)
    .then(r => {
      updateColors(colors.filter(i => i.id !== colorToEdit.id))

    })
    .catch(error => console.log(error))
  };

  const addColor = (e) => {
    e.preventDefault()
    console.log(newColor)
    axiosWithAuth()
    .post(`/api/colors`, newColor)
    .then( r => {
      updateColors(colors.concat([newColor]));
      console.log(r.data)
    })
    .catch(error => console.log(error))
  }


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <legend>Add a color</legend>
        <label>
          Color name: 
       
          <input 
            type='text'
            name='name'
            placeholder='color'
            onChange={ e => setNewColor({
              ...newColor, 
              color : e.target.value
            })}
            value={newColor.color}
          /> 
        </label>

        <label>
          Hex code: 
        <input
          type="text"
          name="hex"
          placeholder="hex code"
          onChange={e =>  setNewColor({
            ...newColor, 
            code: {
            hex : e.target.value
            }
          })}
          value={newColor.code.hex}
        /></label>
        <div className="button-row">
        <button type="submit">add</button>
        </div>
      </form>
      <div className="spacer" />
      <div className="button-row">
        <button onClick={(e) => {
          e.preventDefault(); 
          localStorage.clear();
          
          }}>Logout</button>
      </div>
    </div>
  );
};

export default ColorList;
