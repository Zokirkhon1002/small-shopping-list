import React, { useState} from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [items, setItems] = useState([
    { itemName: "item 1", quantity: 1, isSelected: false },
    { itemName: "item 2", quantity: 3, isSelected: true },
    { itemName: "item 3", quantity: 2, isSelected: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(6)


  const calculate = () => {
    let totalItemCount = items.reduce((total, cur) => (total += cur.quantity),0);
	setTotalItemCount(totalItemCount)
  };

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };
    setItems([...items, newItem]);
    setInputValue("");
	calculate();
  };

  const handleQuantityIncrease = (idx) => {
    const newItems = [...items];
    newItems[idx].quantity++;
    setItems(newItems);
	calculate();
  };

  const handleQuantityDecrease = (idx) => {
    let newItems = [...items];
    newItems[idx].quantity--;
    if (newItems[idx]["quantity"] < 0) {
      let isDelete = window.confirm(
        `Do you want to delete ${newItems[idx].itemName}?`
      );
      if (isDelete) {
        newItems = newItems.filter((item, index) => index !== idx);
      } else {
        newItems[idx].quantity = 0;
      }
    }
    setItems(newItems);
	calculate();
  };

  const handleIsSelected = (idx) => {
    let newItems = [...items];
    newItems[idx].isSelected = !newItems[idx].isSelected;
    setItems(newItems);
  };



  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {items.map(({ itemName, quantity, isSelected }, idx) => (
            <div className="item-container" key={idx}>
              <div className="item-name">
                {isSelected ? (
                  <>
                    <FontAwesomeIcon
                      onClick={() => handleIsSelected(idx)}
                      icon={faCheckCircle}
                    />
                    <span
                      onClick={() => handleIsSelected(idx)}
                      className="completed"
                    >
                      {itemName}
                    </span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      onClick={() => handleIsSelected(idx)}
                      icon={faCircle}
                    />
                    <span onClick={() => handleIsSelected(idx)}>
                      {itemName}
                    </span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(idx)}
                  />
                </button>
                <span> {quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(idx)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
