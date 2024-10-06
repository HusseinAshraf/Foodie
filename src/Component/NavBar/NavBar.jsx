/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Modal from "../Modal/Modal";
import { data3, data4 } from "../SideBar/data";
import { toast } from "react-toastify";
function Step({ number, text, isCurrent, isCompleted, isUsed }) {
  return (
    <div className="text-center flex justify-center items-center gap-3">
      <div className={`step-circle ${isCurrent ? "current-step" : ""}`}>
        {isCompleted ? <i className="fa fa-check" /> : number}
      </div>
      <a href="#" className="text-center">
        {text}
      </a>
      {isUsed ? <div className="step-line"></div> : ""}
    </div>
  );
}

const NavBar = () => {
  const {
    counter,
    selectedItems,
    baseIngredients,
    ingredients,
    protein,
    sauce,
    saladSize,
  } = useContext(UserContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();

  
    if (baseIngredients.length > 2) {
      alert("يمكنك اختيار مكونين فقط كقاعدة رئيسية.");
      return;
    }

    const maxIngredients =
      saladSize === "large"
        ? 8
        : saladSize === "medium"
          ? 6
          : saladSize === "small"
            ? 5
            : 0;

    if (ingredients.length > maxIngredients) {
      alert(`يمكنك اختيار ${maxIngredients} مكونات كحد أقصى.`);
      return;
    }

  
    if (!data3) {
      alert("يجب عليك اختيار بروتين واحد.");
      return;
    }

  
    if (!data4) {
      alert("يجب عليك اختيار صوص واحد.");
      return;
    }


    if (selectedItems.length > 8) {
      setIsModalOpen(true);
    } else {
  
       toast.error("تأكد من إدخال جميع البيانات المطلوبة");
    }
  };

  const steps = [
    {
      number: 1,
      text: "نوع الطلب",
      isCompleted: true,
      isCurrent: true,
      isUsed: true,
    },
    { number: 2, text: "مكونات الطلب", isCurrent: true, isUsed: true },
    { number: 3, text: "عنوان التوصيل", isUsed: true },
    { number: 4, text: "الدفع", isUsed: false },
  ];

  return (
    <div className="navBar z-50">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-2">
          <i className="fa-solid fa-arrow-right mt-1" />
          <a href="#">رجوع</a>
        </div>

        <button
          className="navbar-toggle md:hidden"
          onClick={() => setIsNavbarOpen((prev) => !prev)}
        >
          {isNavbarOpen ? "إخفاء" : "عرض"} الخطوات
        </button>

        <div
          className={`flex justify-between items-center layout ${isNavbarOpen ? "block" : "hidden"
            } md:flex`}
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              text={step.text}
              isCurrent={step.isCurrent}
              isCompleted={step.isCompleted}
              isUsed={step.isUsed}
            />
          ))}
        </div>

        <div className="flex justify-between items-center gap-5">
          <p className="m-3">السعر: {counter}</p>
          <button
            className="btnSubmit"
            onClick={handleNext}
            disabled={selectedItems.length <= 0}
            style={{ opacity: selectedItems.length <= 1 ? 0.5 : 1 }}
          >
            التالي
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={selectedItems}
      />
    </div>
  );
};

export default NavBar;
