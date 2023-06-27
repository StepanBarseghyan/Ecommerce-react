import React, {useEffect,useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faPenToSquare, faSortDown, faTrash, faUnlock} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts} from "../../store/slices/products/productsSlice";
import {fetchDeleteProducts, fetchPostAddProduct, fetchProducts} from "../../store/slices/products/productsApi";
import s from './AdminProducts.module.css'
import { generatorId } from '../../helpers/generatorId';
import Modal from './Modal';
import { fetchPatchProductsFromCart } from '../../store/slices/users/userAPI';

const AdminProducts = () => {
    const {productsData} = useSelector(selectProducts)
    const dispatch = useDispatch()
    const [img,setImg] = useState('')
    const [id,setId] = useState('')
    const [modal,setModal] = useState(false)

    const changeFile = (e) => {
        const reader = new FileReader()
        e.target.files[0] && reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result)
        }
    }

    function showModal(id){
        setId(id)
        setModal(true)
    }

    function handleSubmit(e){
        e.preventDefault();
        const{title,description,price} = e.target
        const data = {
            id:generatorId(productsData),
            title:title.value,
            description:description.value,
            img:img,
            price:price.value
        }
        dispatch(fetchPostAddProduct(data))
        e.target.reset()
    }
    function checkInput(e){
        e.value = e.value.replace(/[^\d]/g, '')
    }
    function deleteProduct(product){
        dispatch(fetchDeleteProducts(product?.id))
        dispatch(fetchPatchProductsFromCart({data:product,del:'delete'}))
    }
    return (
        <div>
            <h1 className={s.title}>Products</h1>
            <div className={s.product__form}>
                <h2>Add Product</h2>
                <form onSubmit={(e)=> handleSubmit(e)} >
                    <div className={s.form__content}>
                        <div>
                            <input name='title' type="text" placeholder='Product title' required />
                            <input name='price' type="text" placeholder='Product price' onInput={(e)=>checkInput(e.target)} required />
                            <input className={s.input_file} name='file' type="file" onChange={(e)=>changeFile(e)} required/>
                        </div>
                        <textarea name="description" id="" cols="30" rows="10" placeholder='Product description' required></textarea>
                    </div>
                    <button>Add Product</button>
                </form>
        </div>
        <table className={s.products__table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Img</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {productsData.map(product=> (
                    <tr key={product?.id}>
                        <td>#{product?.id}</td>
                        <td> <img src={product?.img} alt="" /></td>
                        <td>{product?.title}</td>
                        <td className={s.description}>{product?.description}</td>
                        <td>{product?.price}$</td>
                        <td>
                            <button className={`${s.table_btn} ${s.editBtn}`} onClick={()=> showModal(product.id)} ><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button className={`${s.table_btn} ${s.deleteBtn}`} onClick={()=>deleteProduct(product)}  ><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>
                ) )}
                </tbody>
            </table>
          { modal && <Modal id={id} setModal={setModal}/> }  
        </div>
    );
};

export default AdminProducts;