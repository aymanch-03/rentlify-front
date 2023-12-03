import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const ListSubcategories = createAsyncThunk(
    "subcategories/ListSubcategories",
    async (subcategories) => {
      const request = await axios.get("/subcategories", subcategories, {
        withCredentials: true,
      });
      const response = await request.data;
  
      localStorage.setItem("subcategories", JSON.stringify(response));
      console.log(response.data);
      return response.data;
    }
    );

    const subcategorieSlice = createSlice({
        name: "subcategories",
        initialState: {
            subcategories: [],
        },
        extraReducers: (builder) => {
            builder
              .addCase(ListSubcategories.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.subcategories = action.payload;
              })
              .addCase(ListSubcategories.rejected, (state, action) => {
                state.status = "rejected";
                console.log(action.payload);
              })
            }
    
    
    });

    export default subcategorieSlice.reducer;