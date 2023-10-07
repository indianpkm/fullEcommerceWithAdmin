import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchBrands, fetchCategories, fetchProductByFilter, fetchProductById, updateProduct } from "./productApi";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  status:'idle',
  error: null,
  selectedProduct:{}
};

// export const fetchAllProductsAsync = createAsyncThunk(
//   "product/fetchAllProduct",
//   async () => {
//     const response = await fetchAllProduct();
//     return response;
//   }
// );

export const fetchProductByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({filter,sort,pagination,admin}) => {
    const response = await fetchProductByFilter(filter,sort,pagination,admin);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);


export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,  
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
   },
  extraReducers(builder) {
    builder
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload.products
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;

      });
  }
});

export const {clearSelectedProduct}=productSlice.actions

export default productSlice.reducer;
