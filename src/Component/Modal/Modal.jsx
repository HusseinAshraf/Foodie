/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const Modal = ({ isOpen, onClose, items, saladSize }) => {
  const { counter, size, setSize } = useContext(UserContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-screen  max-w-md md:max-w-lg lg:max-w-xl">
        <button
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-4 right-4 flex justify-center items-center"
          aria-label="Close modal"
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">مراجعة الطلب</h2>
        <div className="flex flex-col items-center gap-4 mb-4">
          <p className="text-sm">حجم السلطة: {size}</p>
          <p className="text-sm">السعر: {counter} ج</p>
        </div>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-100 p-2 rounded overflow-y-auto max-h-64">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={item.img}
                  alt={item.text}
                  className="w-16 h-16 mb-2 object-cover rounded"
                />
                <p className="text-center text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">لا توجد عناصر في الطلب.</p>
        )}
        <div className="mt-4">
          <button className="w-full px-4 py-2 bg text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
            متابعة
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
