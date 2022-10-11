import axios from "axios";

const API_URL = "/api/memories/";

// Create new memory
const createMemory = async (memoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, memoryData, config);

  return response.data;
};

// Get user memories
const getMemories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user memories
const deleteMemory = async (memoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + memoryId, config);

  return response.data;
};

const memoryService = {
  createMemory,
  getMemories,
  deleteMemory,
};

export default memoryService;
