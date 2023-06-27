import {createSlice} from "@reduxjs/toolkit";
import {fetchAddBlockUser, fetchAddToCart, fetchAllBlockedUsers, fetchAllUsers, fetchDelBlockUser, fetchDeleteUser, fetchEditUser, fetchPatchProductsFromCart, fetchPostAddUser, fetchRemoveFromCart} from "./userAPI";

const usersSlice = createSlice({
    name:'users',
    initialState:{
        isAdmin:false,
        usersData:[],
        blockedUsers:[],
        isLoading:false,
        currentUser:null,
    },
    reducers:{
        logIn(state,{payload}){
            state.currentUser = payload
        },
        isAuthAdmin(state,){
            state.isAdmin = true
        },
        sort(state,{payload}){
            state.usersData = payload
        },

    },
    extraReducers:{
        [fetchAllUsers.fulfilled] : (state,{payload}) => {
            state.usersData = payload
        },
        [fetchPostAddUser.fulfilled]:(state,{payload}) => {
            state.usersData.push(payload)
        },
        [fetchDeleteUser.fulfilled] : (state,{payload}) => {
            state.usersData = state.usersData.filter(user => user.id !== payload)
        },
        [fetchEditUser.fulfilled] : (state,{payload}) => {
            state.usersData = state.usersData.map(user=> user.id === payload.id ? payload : user)
        },
        [fetchAllBlockedUsers.fulfilled] : (state,{payload}) => {
            state.blockedUsers = payload
        },
        [fetchAddBlockUser.fulfilled]:(state,{payload})=> {
            state.blockedUsers.push(payload)
        },
        [fetchDelBlockUser.fulfilled]:(state,{payload})=> {
            state.blockedUsers = state.blockedUsers.filter(user=> user.id !== payload)
         },
        [fetchAddToCart.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.currentUser = payload
        },
        [fetchRemoveFromCart.pending]:(state,{payload})=>{
            state.isLoading = true
        },
        [fetchRemoveFromCart.fulfilled]:(state,{payload})=>{
            state.isLoading = false;
            state.currentUser = payload
        },
        [fetchPatchProductsFromCart.fulfilled]:(state,{payload})=>{
            state.usersData = state.usersData.map(user=> payload.find(e=> e.id === user.id) ? payload.find(e=> e.id === user.id) : user )
        }
    },
})

export const selectUsers = state => state.users;

export const {logIn,isAuthAdmin,sort,addToCard,incProduct,decrProduct,deleteProductFromCard} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;