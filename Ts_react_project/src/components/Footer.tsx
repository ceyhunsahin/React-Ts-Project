
import useCard from '../hooks/useCard'

type PropsType = {
    viewCard: boolean,
   
}

const Footer = ({viewCard}: PropsType) => {

    const {totalItems, totalPrice} = useCard();
    const year :number = new Date().getFullYear();
    const pageContent = viewCard? 
    <p>Shopping Card &copy; {year}</p>
    : (
        <>
            <p>Total Items : {totalItems}</p>
            <p>Total Price : {totalPrice}</p>
            <p>Shopping Card &copy; {year}</p>
        </>
    )

    const content = (
        <footer className="footer">
            {pageContent}
        </footer>
    )
  return content
  
}

export default Footer