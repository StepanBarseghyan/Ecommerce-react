import react,{useState,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../store/slices/products/productsSlice'
import { fetchEditProduct } from '../../store/slices/products/productsApi'
import s from './AdminProducts.module.css'
import { fetchPatchProductsFromCart } from '../../store/slices/users/userAPI'

export default function Modal({id,setModal}){
    const [img,setImg] = useState('')
    const imgFile = useRef(null)
    const {productsData} = useSelector(selectProducts)
    const product = productsData.find(product=> product.id === id)
    
    const dispatch = useDispatch()
    const changeFile = (e) => {
        const reader = new FileReader()
        e.target.files[0] && reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result)
        }
    }
    function handleSubmit(e){
        e.preventDefault()
        const {title,desc,price} = e.target
        const data = {
            id,
            title:title.value,
            description:desc.value,
            price:price.value,
            img:imgFile.current.files.length ? img : product?.img
        }
        dispatch(fetchEditProduct(data))
        dispatch(fetchPatchProductsFromCart({data}))
        setModal(false)
    }
    function checkInput(e){
        e.value = e.value.replace(/[^\d]/g, '')
    }
    return(
        <div className={s.modal__body} onClick={()=> setModal(false)}>
            <div className={s.modal__content} onClick={(e)=> e.stopPropagation()}>
                <h1>Edit Product</h1>
                <form onSubmit={(e)=> handleSubmit(e)} className={s.form}>
                    <input name='title' type="text" placeholder='Product title' defaultValue={product?.title} />
                    <textarea name="desc" id="" cols="30" rows="10" placeholder='Product description' defaultValue={product?.description}></textarea>
                    <input ref={imgFile} type="file" className={s.input_file} onChange={(e)=>changeFile(e)} />
                    <input name='price' type="text" placeholder='Product Price' onInput={(e)=>checkInput(e.target)}  defaultValue={product?.price}  />
                    <button>Edit</button>
                </form>
            </div>
        </div>
    )
}