import  {ReactElement} from 'react'

import useCard from '../hooks/useCard'
import useProduct from '../hooks/useProduct'
import { UseProductContextType } from '../context/ProductsProvider'
import Product from './Product'

const ProductList = () => {
    const {dispatch, REDUCER_ACTIONS, card} = useCard()
    const {products} = useProduct()

    let pageContent:  ReactElement | ReactElement[] = 
    <p>
            Loading...
    </p>

    if(products.length > 0){
        pageContent = products.map((product) => {
            const inCard:boolean = card.some(item=>item.sku === product.sku)
        
        return (
            <Product
            key = {product.sku}
            product = {product}
            inCard = {inCard}
            dispatch = {dispatch}
            REDUCER_ACTIONS = {REDUCER_ACTIONS}
            />
        )
    })
    }
    const content = (
        <main className="main main--products">
            {pageContent}
        </main>
    )
    return content
}

export default ProductList