import { ReactElement, memo } from "react"
import { CardItemType } from "../context/CardProvider"
import { ReducerAction } from '../context/CardProvider'
import { ReducerActionType } from "../context/CardProvider"

type PropsType = {
    item : CardItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
}


const CardLineItem = ( {item, dispatch, REDUCER_ACTIONS}:PropsType) : ReactElement => {
    const img : string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href
    console.log(img)

    const lineTotal : number = (item.qty * item.price)
    const highestQty:number = 20 > item.qty ? 20: item.qty

    const optionValues: number[] = [...Array(highestQty).keys()].map(
        i => i + 1
    )

    const options:ReactElement[] = optionValues.map(val =>{
        return <option key = {`opt${val}`} value = {val}> {val} </option>

})

    const onQtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: REDUCER_ACTIONS.QUANTITY, payload: {...item, qty : Number(event.target.value)}})
    }

    const onRemoveFromCard = () => {
        dispatch({type: REDUCER_ACTIONS.REMOVE, payload: item})

    }

    const content = (
        <li className="cart__item">
            <img src = {img} alt = {item.name} className = 'cart__img'/>
            <div aria-label = 'Item Name'></div>
            <div aria-label = 'Price per Item'> 
            { new Intl.NumberFormat("en-US", { style: 'currency', currency : 'USD'})
            .format(item.price)}</div>
            <label htmlFor = 'itemQty' className = 'offscreen'>Item Quantity</label>
            <select
                id = 'itemQty'
                name = 'itemQty'
                className = 'cart__select'
                value = {item.qty}
                aria-label = 'Item Quantity'
                onChange = {onQtyChange}>
                    {options}
            </select>     
            <div className="card__item subtotal">
            { new Intl.NumberFormat("en-US", { style: 'currency', currency : 'USD'})
            .format(lineTotal)}
            </div>
            <button className="cart__button"
            aria-label="Remove Item From Cart"
            title = 'Remove Item From Cart'
            onClick={onRemoveFromCard}>
                X

            </button>
        </li>
    )
    


  return content
}

function areItemsEqual ({item : prevItem} : PropsType,
     {item : nextItem} : PropsType) {
        return Object.keys(prevItem).every(key => {
            return prevItem[key as keyof CardItemType] === nextItem[key as keyof CardItemType]

        })
     }

const MemoizedCardLineItem = memo<typeof CardLineItem>(CardLineItem, areItemsEqual)

export default MemoizedCardLineItem 