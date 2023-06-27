import s from './Product.module.css'
import {useDispatch, useSelector} from "react-redux";
import {selectUsers} from "../../store/slices/users/usersSlice";
import {fetchAddToCart } from '../../store/slices/users/userAPI';

export default function Product({product}){
    const dispatch = useDispatch()
    const {currentUser} = useSelector(selectUsers)

    function add(product){
        // const item = currentUser.cart.find(e=>e.id === product.id) || product
        dispatch(fetchAddToCart({id:currentUser.id,product:product}))
    }



    return(
        <li className={s.product}>
            <article className={s.card}>
                <div className={s.card__image}>
                    <img src={product?.img} alt="s" />
                </div>
                <div className={s.card__content}>
                    <h3>{product?.title}</h3>
                    <p className={s.desc}>{product?.description}</p>
                    <p className={s.price}>${product?.price}</p>
                </div>
                    <button onClick={()=>add(product)}>Add to card </button> 
            </article>
        </li>
    )
}