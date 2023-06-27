import {useDispatch, useSelector} from "react-redux";
import {incProduct, decrProduct, selectUsers, deleteProductFromCard} from "../../store/slices/users/usersSlice";
import s from './ShoppingCart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faSquareMinus, faSquarePlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { fetchAddToCart, fetchRemoveFromCart } from "../../store/slices/users/userAPI";
import { Link } from "react-router-dom";

export const ShoppingCart = () => {
    const {currentUser,isLoading} = useSelector(selectUsers)
    const dispatch = useDispatch()
    console.log(currentUser)
    function removeFromCart(product,delBtn){
        if(delBtn){
            dispatch(fetchRemoveFromCart({id:currentUser.id,product:product,isDelBtn:true}))
        }else{
           if(product.quantity <= 1) return
                dispatch(fetchRemoveFromCart({id:currentUser.id,product:product}))
        }

    }

    let totalPrice = currentUser.cart.reduce((acc,product)=>+product.totalPrice + acc,0)
    return(
        <section className={s.Shopping__card_section}>
            <h1 className={s.title}>Shopping Cart</h1>
            <p className={s.count}>{currentUser.cart.length ? currentUser.cart.length + '  items in your cart' : 'Cart is empty'}</p>
            <div className='container'>
            <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
            {
                currentUser.cart.map(card =>
                    <tr key={card?.id}>
                    <td>
                        <div className={s.flex}>
                            <div className={s.product__img}>
                                <img src={card?.img} alt="" />
                            </div>
                            <p className={s.product__name}>{card?.title}</p>
                        </div>
                    </td>
                    <td>{card?.totalPrice}$</td>
                    <td>
                        <div className={s.flex}>
                            <button className={s.calcBtn} onClick={()=> removeFromCart(card)} disabled={isLoading ? true : false}><FontAwesomeIcon icon={faSquareMinus} /></button>
                            <span>{card?.quantity}</span>
                            <button className={s.calcBtn} onClick={()=> dispatch(fetchAddToCart({id:currentUser.id,product:card}))}><FontAwesomeIcon icon={faSquarePlus} /></button>
                        </div>
                    </td>
                    <td>
                        <button className={s.del} onClick={()=> removeFromCart(card,'del')} ><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                </tr>
                )
            }
                    </tbody>
                </table>
                <div className={s.footer}>
                    <Link to={'/homePage'} className={s.back}> <FontAwesomeIcon icon={faArrowLeftLong} /> Continue Shopping</Link>
                    <div className={s.totalPrice}>
                        <p className={s.totalPrice__title}>Total Price:</p>
                        <p className={s.totalPrice__txt}>${totalPrice}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}