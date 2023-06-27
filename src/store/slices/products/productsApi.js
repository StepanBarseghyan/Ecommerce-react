import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendRequest} from "../../../helpers/sendRequest";


const {sendRequestGet,sendRequestDelete,sendRequestPost,sendRequestPatch} = sendRequest()

export const fetchProducts = createAsyncThunk(
    'prodcuts/fetchProducts',
    async ()=>{
        const result = await sendRequestGet('http://localhost:3001/products');
        return result
    }
)
export const fetchPostAddProduct = createAsyncThunk(
    'users/fetchPostAddProduct',
    async (data)=>{
        const result = await sendRequestPost('http://localhost:3001/products',data)
        return result
    }
)

export const fetchDeleteProducts = createAsyncThunk(
    'products/fetchDeleteProducts',
    async (id) => {
        const result = await sendRequestDelete(`http://localhost:3001/products/${id}`)
        return id
    }
)
export const fetchEditProduct = createAsyncThunk(
    'users/fetchEditProduct',
    async (data)=>{
        const result = await sendRequestPatch(`http://localhost:3001/products/${data.id}`,data)
        console.log(result)
        return result
    }
)