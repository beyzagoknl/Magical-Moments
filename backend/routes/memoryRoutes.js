const express = require("express");
const router = express.Router();
const {
  getMemories,
  setMemory,
  updateMemory,
  deleteMemory,
} = require("../controllers/memoryController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMemories).post(protect, setMemory);
router.route("/:id").delete(protect, deleteMemory).put(protect, updateMemory);

module.exports = router;
