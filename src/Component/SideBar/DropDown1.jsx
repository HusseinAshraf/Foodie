/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";

const DropDown1 = ({ handleChange, values }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { size, setSize } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <ul className="space-y-2 font-medium mt-16">
        <li>
          <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
            <span className="ms-3">مكونات الطلب</span>
          </a>
        </li>
        <li className="bg-white rounded-md p-2">
          <button
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            onClick={toggleDropdown}
          >
            <span className="flex-1 ms-3 text-right rtl:text-right whitespace-nowrap">
              حجم السلطة
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <ul
            id="dropdown-example"
            className={`${isDropdownOpen ? "block" : "hidden"} py-2 space-y-2`}
          >
            <span className="text-gray-400 text-sm">
              قم بإختيار مكونات السلطة الرئيسية
            </span>
            <div className="bg-white rounded-md p-2">
              <label
                htmlFor="saladSize"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                الحجم
              </label>
              <select
                id="saladSize"
                name="saladSize"
                value={values.saladSize}
                onChange={(e) => {
                  handleChange(e);
                  console.log("Selected size:", e.target.value);
                  setSize(e.target.value);
                }}
                className="bg-white border outline-none border-gray-300 text-gray-900 mb-6 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="">برجاء الاختيار</option>
                <option value="سلطة كبيرة (L)">سلطة كبيرة (L)</option>
                <option value="سلطة صغيرة (S)">سلطة صغيرة (S)</option>
                <option value="سلطة وسط (M)">سلطة وسط (M)</option>
              </select>
            </div>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default DropDown1;
