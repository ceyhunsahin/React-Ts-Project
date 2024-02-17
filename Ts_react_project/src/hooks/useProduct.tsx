import { useContext } from "react";
import {ProductContext }from "../context/ProductsProvider";
import { UseProductContextType } from "../context/ProductsProvider";

const useCard = () :  UseProductContextType => {
    return useContext(ProductContext);
}

export default useCard