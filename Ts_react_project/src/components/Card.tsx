
import useCard from "../hooks/useCard"
import {useState} from "react";
import CardLineItem from "./CardLineItem";

const Card = () => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, card} = useCard()

    const onSubmitOrder = () => {
        dispatch({type : REDUCER_ACTIONS.SUBMIT})
        setConfirm(true)
    }
    const pageContent = confirm ? <h2> Thank you for your order.</h2>
        : <>
             <h2 className = "offscreen">Card</h2>
             <ul className="cart">
                {card.map(item => {
                    return (
                        <CardLineItem
                            key = {item.sku}
                            item = {item}
                            dispatch = {dispatch}
                            REDUCER_ACTIONS = {REDUCER_ACTIONS}
                        />
                    )

                    }
                )}
             </ul>
             <div className="cart__totals">
                <p>Total Items : {totalItems}</p>
                <p>Total Price : {totalPrice}</p>
                <button className="cart__submit" 
                disabled = {!totalItems}
                onClick = {onSubmitOrder}>
                    Place Order
                    </button>
             </div>
          </>

          

    
    const content = (
        <main className="main main--cart">
            {pageContent}
        </main>
      )
  return content
}

export default Card