import { useContext } from "react";
import CardContext from "../context/CardProvider";
import { UseCardContextType } from "../context/CardProvider";

const useCard = () : UseCardContextType => {
    return useContext(CardContext);
}

export default useCard