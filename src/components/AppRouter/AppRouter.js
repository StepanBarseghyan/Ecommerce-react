import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import {useSelector} from "react-redux";
import {selectUsers} from "../../store/slices/users/usersSlice";
import { Layout } from '../../pages/Layout/Layout';
import AdminPage from '../../pages/AdminPage/AdminPage';
import HomePage from '../../pages/HomePage/HomePage';
import AdminProducts from "../../pages/AdminProducts/AdminProducts";
import { ShoppingCart } from '../ShoppingCart/ShoppingCart'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import BlockedPage from '../../pages/BlockedPage/BlockedPage';

const AppRouter = () => {
    const {isAdmin} = useSelector(selectUsers)
    const {currentUser} = useSelector(selectUsers)
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                {currentUser && <Route path={'/homePage'} element={<HomePage/>}/>}
                <Route path={'homePage/card'} element={<ShoppingCart/>}/>
                
                {isAdmin && 
                    <Route path={'/adminPage/'} element={<Layout/>}>
                    <Route index element={<AdminPage/>}/>
                    <Route path={'statistics'} element={<h1>statistics</h1>}/>
                    <Route path={'products'} element={<AdminProducts/>}/>
                    <Route path={'settings'} element={<h1>settings</h1>}/>
                    <Route path={'analytics'} element={<h1>analytics</h1>}/>
                 </Route>
                }
                 <Route path={'/blockedPage'} element={<BlockedPage/>}/>
                 <Route path={'/*'} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
};

export default AppRouter;