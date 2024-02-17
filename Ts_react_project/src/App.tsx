
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import Card from "./components/Card"
import {useState} from 'react'

function App() {
  const [viewCard, setViewCard] = useState<boolean>(false)

  const pageContent = viewCard? <Card /> : <ProductList />

  const content = (
    <>
      <Header viewCard = {viewCard} setViewCard = {setViewCard}/>
      {pageContent}
      <Footer viewCard = {viewCard}/>
    </>
  )

  return (
    <>
     {content}
    </>
  )
}

export default App
