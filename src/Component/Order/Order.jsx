import React, { useContext, useState, useEffect } from "react";
import salad from "../../assets/Salad-02 1.png";
import { UserContext } from "../../Context/UserContext";

const Order = () => {
  const { selectedItems } = useContext(UserContext);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    setSavedItems(selectedItems);
  }, [selectedItems]);

  return (
    <div className="flex justify-center items-center ps-52 lg:ps-0  bg-white dark:bg-gray-800 dark:border-gray-700 p-7">

      {savedItems.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mt-16 mr-9 lg:grid-cols-5 gap-4">

          {savedItems.map((item, index) => (

            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-2 transition-transform transform hover:scale-105"
            >

              <img
                src={item.img}
                alt={item.text}
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
              <p className="text-center text-gray-800 dark:text-gray-200">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center md:mr-28 md:mt-28 ">
          <img className="rounded-lg w-1/2 md:w-40 " src={salad} alt="salad" />
          <div className="p-5">
            <p className="mb-3 font-bold text-2xl text-gray-700 dark:text-gray-400">
              ابدأ بتحضيـــــر طبق
              <br />
              السلطة الخاص بك!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
