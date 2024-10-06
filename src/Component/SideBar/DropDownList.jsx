import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const DropDownList = ({ data, toggleDropdown, isDropdownOpen, title, description, handleChange, values = [] }) => {
  const { ChangeCount, AddOrder } = useContext(UserContext);

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;

    if (checked) {
      handleChange({
        target: {
          value: [...values, item.value],
          type: 'checkbox',
        },
      });
      ChangeCount(10);
      AddOrder(item); // Pass the entire item object when checked
    } else {
      handleChange({
        target: {
          value: values.filter(value => value !== item.value),
          type: 'checkbox',
        },
      });
      ChangeCount(-10);
      AddOrder(item); // Use the same logic for unchecking
    }
  };

  return (
    <>
      <ul className="space-y-2 font-medium mt-9">
        <li className="bg-white rounded-md p-2">
          <button
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            onClick={toggleDropdown}
          >
            <span className="flex-1 ms-3 text-right rtl:text-right whitespace-nowrap">
              {title}
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
            className={`${isDropdownOpen ? 'block' : 'hidden'} py-2 space-y-2`}
          >
            <span className='text-gray-400 text-sm'>{description}</span>

            <div className='bg-white rounded-md p-2'>
              <ul className="grid grid-cols-3 p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                {data.map((item, index) => (
                  <li key={index}>
                    <div className="flex p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                      <div className="flex items-center h-5">
                        <input
                          id={`helper-checkbox-${index}`}
                          aria-describedby={`helper-checkbox-text-${index}`}
                          type="checkbox"
                          value={item.value}
                          onChange={(event) => handleCheckboxChange(event, item)} // Pass item
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                      </div>
                      <div className="ms-2 text-sm">
                        <label htmlFor={`helper-checkbox-${index}`} className="font-medium text-gray-900 dark:text-gray-300">
                          <div>{item.text}</div>
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ul>
        </li>
      </ul>
    </>
  );
};
export default DropDownList;