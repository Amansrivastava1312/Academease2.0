import express from "express";
import {
  fetchLecture,
  getAllCourses,
  getMyCourses,
  getSingleCourse,
} from "../controllers/courses.js";
import { isAuth } from "../middlewares/isAuth.js";
import { fetchLectures } from "../controllers/courses.js";
const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);

export default router;
