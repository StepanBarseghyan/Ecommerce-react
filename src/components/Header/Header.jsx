import react , {useState} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {useNavigate} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass,faMoon, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import s from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {selectUsers} from "../../store/slices/users/usersSlice";
import {resetFilteredProducts, selectProducts, setOpacity} from '../../store/slices/products/productsSlice'
import {filterProducts} from '../../store/slices/products/productsSlice'

export default function Header(){
    const {currentUser} = useSelector(selectUsers)
    const {productsData} = useSelector(selectProducts)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [toggle,setToggle] = useState(false)
    
    function checkEqual(value,opacity,dispatcher){
        if(productsData.find(product=> product.title.toLowerCase().split(' ').find(str=>str === value.toLowerCase()))){
            const filteredProducts = productsData.filter(product=>product.title.toLowerCase().split(' ').find(str=>str === value.toLowerCase()));
            dispatch(filterProducts(filteredProducts))
            dispatch(setOpacity(opacity))
        }else{
            dispatcher()
            dispatch(setOpacity(false))
        }
    }

    function inputHandler(e){
        const value = e.target.value;
        checkEqual(value,true,() => dispatch(filterProducts([])))
        if(!value) dispatch(setOpacity(false))
    }

    function handleSubmit(e){
        e.preventDefault();
        const {search} = e.target;
        search.value.trim() &&  checkEqual(search.value,false,() => dispatch(resetFilteredProducts()))
}

    return(
    <header>
                <div className='container'>
                    <div className={s.header__content}>
                        <Link className={s.logo}>LOGO</Link>
                        <form className={s.search} onSubmit={(e)=>handleSubmit(e)}>
                            <input type="text" name='search'  placeholder='Search here' onInput={(e)=> inputHandler(e)}/>
                            <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </form>
                        <div className={s.header__right}>
                        <Link className={s.shoppingCard} to={'/homePage/card'}><FontAwesomeIcon icon={faCartShopping} /> <span>{currentUser.cart.length}</span></Link>
                        <div className={s.user} onClick={()=> setToggle(prev=> !prev)}>
                            <img className={s.currentUser__img} src={currentUser?.avatar} alt="" />
                           {toggle &&  <div className={s.logOut}>
                                <button onClick={()=> navigate('/',{replace:true})}><FontAwesomeIcon icon={faPowerOff} /> logout</button>
                            </div>}
                        </div>
                        </div>
                    </div>
                </div>
            </header>
    )
}