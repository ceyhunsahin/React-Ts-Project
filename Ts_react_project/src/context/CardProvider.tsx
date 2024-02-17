import { useCallback, useReducer, useMemo, createContext, ReactElement } from "react"

export type CardItemType = {
    sku: string,
    name: string,
    price: number,
    qty : number

}

type CardStateType = {card: CardItemType[]}

const initCardState :CardStateType = { card :[]}

const REDUCER_ACTION_TYPE = {
    ADD : "ADD",
    REMOVE : "REMOVE",
    QUANTITY : "QUANTITY",
    SUBMIT : "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type : string,
    payload ?: CardItemType
}

const reducer = (state: CardStateType, action: ReducerAction):CardStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error("action.payload is missing in ADD action")
            }
            const {sku, name, price } = action.payload
            const filteredCard:CardItemType[] = state.card.filter(item => item.sku!== sku)
            const itemExists:CardItemType | undefined = state.card.find(item => item.sku === sku)
            const qty : number = itemExists ? itemExists.qty + 1 : 1
            return {...state,
                card: [...filteredCard, {sku, name, price, qty}]
            }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error("action.payload is missing in REMOVE action")
            }
            const {sku } = action.payload
            const filteredCard:CardItemType[] = state.card.filter(item => item.sku!== sku)
          
            return {...state, card: [...filteredCard]}

        }
            
        case REDUCER_ACTION_TYPE.QUANTITY:{
            if (!action.payload) {
                throw new Error("action.payload is missing in QUANTITY action")
            }
            const {sku, qty } = action.payload
            const filteredCard:CardItemType[] = state.card.filter(item => item.sku!== sku)
            const itemExists:CardItemType | undefined = state.card.find(item => item.sku === sku)
            if (!itemExists) {
                throw new Error("item does not exist in card")
            }
            const updatedItem :CardItemType = {...itemExists, qty}
            
            const price : number = itemExists? itemExists.price : 0
            return {...state,
                card: [...filteredCard, updatedItem]
            }
        }

        

        case REDUCER_ACTION_TYPE.SUBMIT:{
            if (!action.payload) {
                throw new Error("action.payload is missing in SUBMIT action")
            }
            
            return {...state,card: [] }
        }

        default:
            return state
    }
}

const useCardContext = (initCardState : CardStateType) => {
    const [state, dispatch] = useReducer(reducer, initCardState)
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    },[])

    const totalItems = state.card.reduce((previousValue, cardItem) => {
        return previousValue + cardItem.qty
    },0)  

    const totalPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
                        .format(totalItems * state.card.reduce((
        previousValue,
        cardItem
    ) => {
        return previousValue + cardItem.price * cardItem.qty
    },0))

    const card = state.card.sort((a,b)=> {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return {dispatch, REDUCER_ACTIONS, card, totalItems, totalPrice}
}

export type UseCardContextType =  ReturnType<typeof useCardContext>

const initCardContextState: UseCardContextType = {
    dispatch:() => { }, 
        REDUCER_ACTIONS : REDUCER_ACTION_TYPE,
        card : [],
        totalItems : 0,
        totalPrice : ''
    }

 export const CardContext = createContext<UseCardContextType>(initCardContextState)   

 type ChildrenType = { children?: ReactElement | ReactElement[] }

 export const CardProvider = ({ children }: ChildrenType):ReactElement => {
    return (
        <CardContext.Provider value={useCardContext(initCardState)}>
            {children}
        </CardContext.Provider>
    )
 }

 export default CardContext

