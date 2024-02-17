import React, {ReactElement} from 'react'
import { ProductType } from '../context/ProductsProvider'
import { ReducerActionType, ReducerAction } from '../context/CardProvider'

type  PropsType = {
    product : ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCard : boolean,

}

const Product = ({product, dispatch, REDUCER_ACTIONS, inCard}:PropsType):ReactElement => {

    //const img : string =require(`../images/${product.sku}.jpg`)
    const img : string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    console.log(img)

    const onAddToCard = () =>  dispatch({type: REDUCER_ACTIONS.ADD, payload: {...product, qty:1}})

    const itemInCard = inCard? ' -> Item in Card : ok' : null

    const content = (
        <article className="product">
            <h3> { product.name} </h3>
           <img src = {img} alt = {product.name} className = 'product__img'/>
           <p>{ new Intl.NumberFormat("en-US", { style: 'currency', currency : 'USD'}).format(product.price)}{itemInCard}</p>
           <button onClick = {onAddToCard}>Add To Card</button>
        </article>
    )


  return content
  
}

export default Product