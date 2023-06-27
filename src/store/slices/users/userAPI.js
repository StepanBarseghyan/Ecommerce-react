import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendRequest} from "../../../helpers/sendRequest";

const {sendRequestGet,sendRequestPost,sendRequestDelete,sendRequestPatch} = sendRequest()

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async ()=>{
        const result = await sendRequestGet('http://localhost:3001/users')
        return result
    }
)

export const fetchPostAddUser = createAsyncThunk(
    'users/fetchPostAddUser',
    async (data)=>{
        const result = await sendRequestPost('http://localhost:3001/users',data)
        return result
    }
)

export const fetchDeleteUser = createAsyncThunk(
    'users/fetchDeleteUser',
    async (id)=>{
        const result = await sendRequestDelete(`http://localhost:3001/users/${id}`)
        return id
    }
)

export const fetchEditUser = createAsyncThunk(
    'users/fetchEditUser',
    async (data)=>{
        const result = await sendRequestPatch(`http://localhost:3001/users/${data.id}`,data)
        return result
    }
)

export const fetchAllBlockedUsers = createAsyncThunk(
    'users/fetchAllBlockedUsers',
    async ()=>{
        const result = await sendRequestGet('http://localhost:3001/blockedUsers')
        return result
    }
)


export const fetchAddBlockUser = createAsyncThunk(
    'users/fetchAddBlockUser',
    async (data)=>{
        const result = await sendRequestPost('http://localhost:3001/blockedUsers',data)
        return result
    }
)

export const fetchDelBlockUser = createAsyncThunk(
    'users/fetchDelBlockUser',
    async (id)=>{
        const result = await sendRequestDelete(`http://localhost:3001/blockedUsers/${id}`)
        return id
    }
)

export const fetchAddToCart = createAsyncThunk(
    'users/fetchAddToCart',
    async ({id,product})=>{
        const currentUser = await sendRequestGet(`http://localhost:3001/users/${id}`)

        if(currentUser.cart.find(e=>e.id === product.id)){
            currentUser.cart = currentUser.cart.map(item=>item.id === product.id ? 
            {...item,quantity:+item.quantity + 1,totalPrice:+(item.quantity + 1) * item.price} : item)
        }else{
            currentUser.cart.push({...product,quantity:1,totalPrice: product.price})
        }
        const result = await sendRequestPatch(`http://localhost:3001/users/${id}`,{cart:currentUser.cart})
        return result
    }
)

export const fetchRemoveFromCart = createAsyncThunk(
    'users/fetchRemoveFromCart',
    async ({id,product,isDelBtn})=>{
        const currentUser = await sendRequestGet(`http://localhost:3001/users/${id}`)
        if(isDelBtn){
            currentUser.cart = currentUser.cart.filter(item=> item.id !== product.id)
        }else{
            currentUser.cart = currentUser.cart.map(item=> item.id === product.id  ? 
            {...item,quantity:+item.quantity - 1,totalPrice:+(item.quantity - 1) * item.price} : item )
        }

       
        const result = await sendRequestPatch(`http://localhost:3001/users/${id}`,{cart:currentUser.cart})
        return result
    }
)


export const fetchPatchProductsFromCart = createAsyncThunk(
    'users/fetchPatchProductsFromCart',
    async ({data,del})=>{
        const usersData = await sendRequestGet('http://localhost:3001/users');
        const users = usersData.filter(user=>user.cart.find(product=> product.id === data.id))
        let carts;
        if(del){
            carts = users.map(user=> user.cart.filter(item=> item.id !== data.id))
        }else{
            carts = users.map(user=> user.cart.map(item=> item.id === data.id ? {...data,totalPrice:+data.price * +item.quantity,quantity:item.quantity} : item))
        }
       let result = [];
       for(let i = 0;i < users.length;i++){
        result.push(await sendRequestPatch(`http://localhost:3001/users/${users[i].id}`,{cart:carts[i]}))
       }
        return result
    }
)