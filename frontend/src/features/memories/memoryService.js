import axios from "axios";
const URL = process.env.BASE_SERVER_URL;

const API_URL = `${URL}/api/memories/`;
// Create new memory
const createMemory = async (memoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    "http://localhost:5007/api/memories",
    memoryData,
    config
  );

  return response.data;
};

// Get user memories
const getMemories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    "http://localhost:5007/api/memories",
    config
  );

  return response.data;
};

// Delete user memories
const deleteMemory = async (memoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    "http://localhost:5007/api/memories" + memoryId,
    config
  );

  return response.data;
};

const memoryService = {
  createMemory,
  getMemories,
  deleteMemory,
};

export default memoryService;
