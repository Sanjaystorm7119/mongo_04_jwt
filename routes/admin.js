const { Router, json } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const { jwt_secret } = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  console.log(jwt_secret);

  //check if Admin exists
  const exisitingAdmin = await Admin.findOne({ username });
  if (exisitingAdmin) {
    res.json({ msg: "user already exists" });
  } else {
    await Admin.create({
      username: username,
      password: password,
      // username,
      // password, // same as above if the keys are of same name
    });
    res.json({
      message: "Admin created Successfully",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const validatedAdmin = await Admin.findOne({
    username: username,
    password: password,
  });
  if (validatedAdmin) {
    const token = jwt.sign({ username }, jwt_secret);
    res.json({ token });
  } else {
    res.status(411).json({ message: "incorrect details" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  // zod
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});

  res.json({
    courses: response,
  });
});

module.exports = router;
