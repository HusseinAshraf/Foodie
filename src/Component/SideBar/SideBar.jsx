import React, { useContext, useState } from "react";
import DropDown1 from "./DropDown1";
import DropDownList from "./DropDownList";
import { data1, data2, data3, data4 } from "./data";
import { useFormik } from "formik";
import * as Yup from "yup";

const SideBar = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const validationSchema = Yup.object({
    saladSize: Yup.string().required("يرجى تحديد حجم السلطة أولاً"),
    baseIngredients: Yup.array()
      .min(1, "حدد قاعدة واحدة على الأقل")
      .max(2, "مسموح بمكونين أساسيين فقط"),
    ingredients: Yup.array().test(
      "max",
      "تم تحديد عدد كبير جدًا من المكونات",
      function (value) {
        const { saladSize } = this.parent;
        const maxIngredients =
          saladSize === "large" ? 8 : saladSize === "medium" ? 6 : 5;
        return Array.isArray(value) && value.length <= maxIngredients;
      }
    ),
    protein: Yup.string().required("يجب عليك اختيار البروتين"),
    sauce: Yup.string().required("يجب عليك اختيار صلصة واحدة"),
  });

  const formik = useFormik({
    initialValues: {
      saladSize: "",
      baseIngredients: [],
      ingredients: [],
      protein: "",
      sauce: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      setFeedbackMessage("تم تقديم الطلب بنجاح");
      setTimeout(() => setFeedbackMessage(""), 5000);
    },
  });

  const [dropdownStates, setDropdownStates] = useState({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = (dropdownName) => {
    if (!formik.values.saladSize) {
      setFeedbackMessage("الرجاء تحديد حجم السلطة أولاً.");
      setTimeout(() => setFeedbackMessage(""), 5000);
    } else {
      setDropdownStates((prevState) => ({
        ...prevState,
        [dropdownName]: !prevState[dropdownName],
      }));
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleBaseChange = (event) => {
    const { value, checked } = event.target;
    const baseIngredients = formik.values.baseIngredients || [];

    if (checked) {
      formik.setFieldValue("baseIngredients", [...baseIngredients, value]);
    } else {
      formik.setFieldValue(
        "baseIngredients",
        baseIngredients.filter((item) => item !== value)
      );
    }
  };

  const handleIngredientsChange = (event) => {
    const { value, checked } = event.target;
    const ingredients = formik.values.ingredients || [];

    if (checked) {
      formik.setFieldValue("ingredients", [...ingredients, value]);
    } else {
      formik.setFieldValue(
        "ingredients",
        ingredients.filter((item) => item !== value)
      );
    }
  };

  const handleProteinChange = (event) => {
    formik.setFieldValue("protein", event.target.value);
  };

  const handleSauceChange = (event) => {
    formik.setFieldValue("sauce", event.target.value);
  };

  return (
    <>
      <div className="sm:hidden">
        <button
          onClick={toggleSidebar}
          type="button"
          className="inline-flex items-center p-2 mt-32 mr-7 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 right-0 z-40 w-64 h-full transition-transform bg-white ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } sm:translate-x-0 sm:w-64 lg:w-80`}
        aria-label="Sidebar"
      >

        <div className="h-screen px-3 py-4 overflow-y-auto bg-gray-50">
          {feedbackMessage && (
            <div className="mt-20 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
              {feedbackMessage}
            </div>
          )}
          {isSidebarOpen && (
            <div className="flex justify-end">
              <button
                onClick={closeSidebar}
                className="p-2 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Close sidebar</span>
              </button>
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <DropDown1
              handleChange={formik.handleChange}
              values={formik.values.saladSize}
              saladSize={formik.values.saladSize}
            />

            <DropDownList
              data={data1}
              toggleDropdown={() => toggleDropdown("dropdown1")}
              isDropdownOpen={dropdownStates.dropdown1}
              title="القاعدة الاساسية"
              description="قم باختيار قاعدة السلطة الرئيسية (مكونين على الأكثر)"
              handleChange={handleBaseChange}
              values={formik.values.baseIngredients || []}
            />
            <DropDownList
              data={data2}
              toggleDropdown={() => toggleDropdown("dropdown2")}
              isDropdownOpen={dropdownStates.dropdown2}
              title="المكونات"
              description={`قم باختيار مكونات السلطة ( ${formik.values.saladSize === "large"
                ? 8
                : formik.values.saladSize === "medium"
                  ? 6
                  : 5
                } مكونات )`}
              handleChange={handleIngredientsChange}
              values={formik.values.ingredients || []}
            />
            <DropDownList
              data={data3}
              toggleDropdown={() => toggleDropdown("dropdown3")}
              isDropdownOpen={dropdownStates.dropdown3}
              title="البروتين "
              description="قم باختيار بروتين واحد للسلطة الخاصة بك"
              handleChange={handleProteinChange}
              values={formik.values.protein}
            />
            <DropDownList
              data={data4}
              toggleDropdown={() => toggleDropdown("dropdown4")}
              isDropdownOpen={dropdownStates.dropdown4}
              title="الصوص "
              description="قم باختيار صوص واحد للسلطة الخاصة بك"
              handleChange={handleSauceChange}
              values={formik.values.sauce}
            />

            {formik.errors.saladSize && formik.touched.saladSize && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.saladSize}
              </div>
            )}
          </form>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
