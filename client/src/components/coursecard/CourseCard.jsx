import React from "react";

import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";
import { MdOutlineTimer } from "react-icons/md";
import "./CourseCard.css";
import { PiCurrencyInr } from "react-icons/pi";
const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();
  const style = {
    color: "black",
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="card-main">
      <div className="card-card_box">
        <span></span>

        <div className="card-main2">
          <img src={course.image} className="card-img" />
          <div className="card-content">
            <div className="card-title">
              <h3 style={style}>{course.title}</h3>
            </div>
            <div className="card-duration">
              <MdOutlineTimer />
              <p>{course.duration} Weeks</p>
            </div>
            <div className="card-category">
              <p className="card-cate">hihdsjkc</p>
              <p>Created By : {course.createdBy}</p>
            </div>

            <div className="card-price">
              <h3 className="card-h3">
                <PiCurrencyInr />
                {course.price}
              </h3>

              {user?.subscription?.includes(course._id) ? (
                <button
                  class="card-button"
                  onClick={() => navigate(`/course/study/${course._id}`)}
                >
                  <svg
                    viewBox="0 0 16 16"
                    class="bi bi-cart-check"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                  >
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>
                  <p class="card-text">Study</p>
                </button>
              ) : (
                <button
                  class="card-button"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  <svg
                    viewBox="0 0 16 16"
                    class="bi bi-cart-check"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                  >
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>
                  <p class="card-text">Buy Now</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
