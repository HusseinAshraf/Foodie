import { createContext, useState } from "react";
import { data1 } from "../Component/SideBar/data"; 

export let UserContext = createContext();

export default function UserContextProvider(props) {
  let [counter, setCounter] = useState(0);
  let [selectedItems, setSelectedItems] = useState([]);
  const [baseIngredients, setBaseIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [protein, setProtein] = useState("");
  const [sauce, setSauce] = useState("");
  const [size, setSize] = useState("");
  const [saladSize, setSaladSize] = useState("small"); 
  function ChangeCount(value) {
    setCounter((prevCounter) => prevCounter + value);
  }

  function AddOrder(item) {
    setSelectedItems((prevItems) => {
      const itemExists = prevItems.some((selected) => selected.id === item.id);
      if (itemExists) {
        // Remove item if already selected
        return prevItems.filter((selected) => selected.id !== item.id);
      } else {
        // Add item if not selected
        return [...prevItems, item];
      }
    });
  }

  return (
    <UserContext.Provider
      value={{
        counter,
        ChangeCount,
        AddOrder,
        selectedItems,
        baseIngredients,
        ingredients,
        protein,
        sauce,
        saladSize,
        setCounter,
        setSelectedItems,
        setBaseIngredients,
        setIngredients,
        setProtein,
        setSauce,
        setSaladSize,
        size,
        setSize,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
