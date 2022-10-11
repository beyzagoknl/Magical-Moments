import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memoryService from "./memoryService";

const initialState = {
  memories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new memory
export const createMemory = createAsyncThunk(
  "memories/create",
  async (memoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memoryService.createMemory(memoryData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user memories
export const getMemories = createAsyncThunk(
  "memories/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memoryService.getMemories(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user memory
export const deleteMemory = createAsyncThunk(
  "memories/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memoryService.deleteMemory(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMemory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMemory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memories.push(action.payload);
      })
      .addCase(createMemory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMemories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMemories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memories = action.payload;
      })
      .addCase(getMemories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMemory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMemory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memories = state.memories.filter(
          (memory) => memory._id !== action.payload.id
        );
      })
      .addCase(deleteMemory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = memorySlice.actions;
export default memorySlice.reducer;
