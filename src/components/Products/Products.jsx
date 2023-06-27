import Product from '../Product/Product'
import s from './Products.module.css'

import {useSelector} from "react-redux";
import {selectProducts} from "../../store/slices/products/productsSlice";
export default function Products(){
    const {productsData,filteredProducts} = useSelector(selectProducts)
    const products = filteredProducts.products.length? filteredProducts.products : productsData
    // console.log(filteredProducts)
  
        return(
            <div className="container">
                <ul className={filteredProducts.opacity? `${s.opacity} ${s.products}` : s.products} >
                    {filteredProducts.notFound ? <p>No exact matches found</p> : products.map(product => <Product key={product.id} product={product}/>)}
                </ul>
            </div>
        )
}