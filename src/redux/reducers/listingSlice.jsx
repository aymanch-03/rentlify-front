/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../axios";
// import { useParams } from "react-router-dom";

export const ListListings = createAsyncThunk(
  "Listing/ListListings",
  async () => {
    const request = await axios.get("/listings", {
      withCredentials: true,
    });
    const response = await request.data;

    localStorage.setItem("Listings", JSON.stringify(response));
    // console.log(response);
    return response.data;
  }
);
export const GetListing = createAsyncThunk(
  "Listing/GetListing",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/listings/${id}`);
      // console.log("aaaa",response);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const UpdateListing = createAsyncThunk(
  "listing/updateListing",
  async ({ id, listing }, { rejectWithValue }) => {
    const userToken = Cookies.get("userToken");
    try {
      const response = await axios.patch(`/listings/${id}`, listing, {
        headers: {
          "x-user-token": userToken,
        },
      });
      // console.log('response',response.data.listing);
      return response.data.listing;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
export const AddListing = createAsyncThunk(
  "Listing/AddListing",
  async (data, { rejectWithValue }) => {
    try {
      const userToken = Cookies.get("userToken");
      const response = await axios.post("/listings", data, {
        headers: {
          "x-user-token": userToken,
        },
      });
      // console.log('rrrr',response.data);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// export const deleteListing = createAsyncThunk(
//   "listing/deleteListing",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/listings/${id}`);
//       console.log("Deleted listing: ", response);
//       return response.data.data;
//     } catch (error) {
//       rejectWithValue(error.response.data);
//     }
//   }
// );

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    data: [],
    listing: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ListListings.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(ListListings.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(ListListings.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(AddListing.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(AddListing.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.isLoading = false;
        console.log("Success", action.payload);
      })
      .addCase(AddListing.rejected, (state, action) => {
        state.status = "rejected";
        console.log("error", action.payload);
      })
      .addCase(GetListing.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(GetListing.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.isLoading = false;
        console.log("Success", action.payload);
      })
      .addCase(GetListing.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        console.error("Error fetching data:", action.error.message);
      })
      .addCase(UpdateListing.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })

      .addCase(UpdateListing.fulfilled, (state, action) => {
        const updatedListings = state.data.map((listing) => {
          if (listing._id === action.payload._id) {
            // console.log(action.payload);
            return action.payload;
          } else {
            // console.log("listing:",listing);
            return listing;
          }
        });
        state.data = updatedListings;
        state.isLoading = false;
      })
      .addCase(UpdateListing.rejected, (state, action) => {
        state.status = "rejected";
        state.isLoading = false;
        console.error("Error fetching listings:", action.error.message);
      });
  },
});

export default listingsSlice.reducer;
