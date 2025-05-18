const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/save-draft", authenticateToken, blogController.saveDraft);
router.post("/publish", authenticateToken, blogController.publishBlog);
router.get("/", blogController.getAllBlogs);
router.get("/user", authenticateToken, blogController.getUserBlogs);
router.get("/:id", blogController.getBlogById);
router.delete("/:id", authenticateToken, blogController.deleteBlog);
module.exports = router;
