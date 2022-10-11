const asyncHandler = require("express-async-handler");

const Memory = require("../models/memoryModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getMemories = asyncHandler(async (req, res) => {
  const memories = await Memory.find({ user: req.user.id });
  res.status(200).json(memories);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setMemory = asyncHandler(async (req, res) => {
  if (!req.body.memoryData) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const memory = await Memory.create({
    ...req.body.memoryData,
    user: req.user.id,
  });
  res.status(200).json(memory);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateMemory = asyncHandler(async (req, res) => {
  const memory = await Memory.findById(req.params.id);

  if (!memory) {
    res.status(400);
    throw new Error("Memory not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (memory.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedMemory = await Memory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedMemory);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteMemory = asyncHandler(async (req, res) => {
  const memory = await Memory.findById(req.params.id);

  if (!memory) {
    res.status(400);
    throw new Error("Memory not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (memory.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await memory.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMemories,
  setMemory,
  updateMemory,
  deleteMemory,
};
