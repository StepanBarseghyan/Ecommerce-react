import {configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "./slices/users/usersSlice";
import {productsReducer} from "./slices/products/productsSlice";

const store = configureStore({
    reducer:{
        users:usersReducer,
        products:productsReducer,
    }
})

export default store;