import {Link,NavLink} from 'react-router-dom'
import s from './HomePage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faMagnifyingGlass,faMoon } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
// import Nav from '../../components/Nav/Nav';
import Products from '../../components/Products/Products';

export default function HomePage(){
    return(
        <main className={s.homepage}>
            <Header/>
            <Products/>
        </main>
    )
}