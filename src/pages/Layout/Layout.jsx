import {Link,NavLink,Outlet } from 'react-router-dom';
import s from './Layout.module.css'
import {useDispatch, useSelector} from "react-redux";
import { selectUsers } from '../../store/slices/users/usersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge,faGear,faChartSimple,faTable,faChartPie } from '@fortawesome/free-solid-svg-icons';
import {useLocation} from "react-router";
export function Layout (){
    const {currentUser } = useSelector(selectUsers)
    const {pathname} = useLocation()
    console.log(currentUser)
    return(
        <>
       <aside className={s.sidebar}>
            <div className={s.admin}>
                <div className={s.admin__info}>
                    <div className={s.admin__img}>
                    <img src={currentUser?.avatar} alt="" />
                    </div>
                    <p>{currentUser?.login}</p>
                </div>
            </div>
            <nav className={s.menu}>
                <ul className={s.menu__list}>
                    <li className={s.menu__item}><NavLink to={'/adminPage/'} className={({isActive}) =>`${isActive || pathname==='/adminPage' ? s.active : ''}`}  ><FontAwesomeIcon icon={faGauge} /> Dashboard</NavLink></li>
                    <li className={s.menu__item}><NavLink to={'/adminPage/products'} className={({isActive}) =>`${isActive ? s.active : ''}`} ><FontAwesomeIcon icon={faTable} /> Products</NavLink></li>
                    <li className={s.menu__item}><NavLink to={'/adminPage/statistics'} className={({isActive}) =>`${isActive ? s.active : ''}`} ><FontAwesomeIcon icon={faChartSimple} /> Statistics</NavLink></li>
                    <li className={s.menu__item}><NavLink to={'/adminPage/settings'} className={({isActive}) =>`${isActive ? s.active : ''}`} ><FontAwesomeIcon icon={faGear} /> Settings</NavLink></li>
                    <li className={s.menu__item}><NavLink to={'/adminPage/analytics'}className={({isActive}) =>`${isActive ? s.active : ''}`} ><FontAwesomeIcon icon={faChartPie} /> Analytics</NavLink></li>
                </ul>
                
            </nav>
       </aside>
       <section className={s.admin__section}>
        <Outlet/>
       </section>
        </>
    )
}