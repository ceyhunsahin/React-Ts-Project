import React from 'react'
import Nav from './Nav'
import useCard from '../hooks/useCard'

type PropsType = {
    viewCard: boolean,
    setViewCard: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({viewCard, setViewCard}: PropsType) => {
    const {totalItems, totalPrice} = useCard();
    const content = (
        <header className = 'header'>
            <div className="header__title-bar">
                <h1>Acme Co.</h1>
                <div className="header__price-box">
                    <p>Total Items : {totalItems}</p>
                    <p>Total Price : {totalPrice}</p>
                </div>

            </div>
            <Nav viewCard = {viewCard} setViewCard = {setViewCard}/>
        </header>
    )
  return content
}

export default Header