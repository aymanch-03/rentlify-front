/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
// import { useParams } from "react-router-dom";
export const ListProducts = createAsyncThunk("Product/ListProducts",async (products) => {
  const request = await axios.get("/listings", products, {
      withCredentials: true,
    });
    const response = await request.data;

    localStorage.setItem("Products", JSON.stringify(response));
    // console.log(response);
    return response.data;
  }
);
export const getProducts = createAsyncThunk("Product/getProducts", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/listings/${id}`);
    // console.log("response: ",response);
    return response.data;
  } catch (error) {
    rejectWithValue(error.response.data);
  }
}
);
export const UpdateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/listings/${id}`, product);
      // console.log('response',response.data.product);
      return response.data.product;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
export const AddProduct = createAsyncThunk("Product/AddProduct",async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/listings", data);
      // console.log('rrrr',response.data);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// export const deleteProduct = createAsyncThunk("product/deleteProduct",async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/products/${id}`);
//       console.log("Deleted product: ", response);
//       return response.data.data;
//     } catch (error) {
//       rejectWithValue(error.response.data);
//     }
//   }
// );



const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ListProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.products = action.payload;
      })
      .addCase(ListProducts.rejected, (state, action) => {
        state.status = "rejected";
        // console.log(action.payload);
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
        // console.log("Success", action.payload);
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.status = "rejected";
        // console.log("error", action.payload);
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.product = action.payload;
        // console.log("Success", action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "rejected";
        console.error("Error fetching products:", action.error.message);
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        const updatedProducts = state.products.map((product) => {
          if (product._id === action.payload._id) {
            // console.log(action.payload);
            return action.payload;
          } else {
            // console.log("product:",product);
            return product;
          }
        });
        state.products = updatedProducts;

      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.status = "rejected";
        console.error("Error fetching products:", action.error.message);
      })

  },
});

export default productsSlice.reducer;
