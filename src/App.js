import AppRouter from "./components/AppRouter/AppRouter";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchAllBlockedUsers, fetchAllUsers} from "./store/slices/users/userAPI";
import './App.css';
import {fetchProducts} from "./store/slices/products/productsApi";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllUsers())
        dispatch(fetchAllBlockedUsers())
        dispatch(fetchProducts())
    }, [])
    
  
    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}

export default App;
