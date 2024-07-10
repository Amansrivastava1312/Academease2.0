import { Courses } from "../models/courseModel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Lecture } from "../models/lectureModel.js";
import { promisify } from "util";
import fs from "fs";
import { rm } from "fs";
import { User } from "../models/userModel.js";
dotenv.config();

export const createCourse = async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;
  let img = req.files?.image;

  // console.log(req);
  console.log(img);

  if (
    !title ||
    !description ||
    !category ||
    !createdBy ||
    !duration ||
    !price
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!img) {
    return res.status(400).json({ message: "Image required" });
  }

  // while calling api from frontend use content-type as form-data

  try {
    // Handle image upload to Cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(img.tempFilePath);
    const imageUrl = uploadedResponse.secure_url;

    const newCourse = new Courses({
      title,
      description,
      category,
      createdBy,
      image: imageUrl,
      duration,
      price,
    });

    await newCourse.save();

    res.status(201).json({
      message: "Course Created Successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Failed to create course" });
  }
};

export const addLectures = async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "No Course with this id",
    });

  const { title, description } = req.body;
  console.log(req.body);

  let file = req.files?.video;

  if (!title || !description) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (!file)
    return res.status(400).json({
      message: "Video is required",
    });

  //cloudinary upload video
  const uploadedResponse = await cloudinary.uploader.upload(file.tempFilePath, {
    resource_type: "video",
  });

  file = uploadedResponse.secure_url;
  const lecture = await Lecture.create({
    title,
    description,
    video: file,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture Added",
    lecture,
  });
};
const unlinkAsync = promisify(fs.unlink);

export const deleteLecture = async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  rm(lecture.video, () => {
    console.log("Video deleted");
  });
  if (lecture) {
    await cloudinary.uploader.destroy(lecture.video);
    await lecture.deleteOne();
  }

  res.json({ message: "Lecture Deleted" });
};

export const deleteCourse = async (req, res) => {
  const course = await Courses.findById(req.params.id);

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlinkAsync(lecture.video);
      console.log("video deleted");
    })
  );

  rm(course.image, () => {
    console.log("image deleted");
  });

  await cloudinary.uploader.destroy(course.image);

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course Deleted",
  });
};

export const getAllStats = async (req, res) => {
  const totalCoures = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCoures,
    totalLectures,
    totalUsers,
  };

  res.json({
    stats,
  });
};
