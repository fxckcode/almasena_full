import { createContext, useState } from "react";

const ElementsContext = createContext()

export const ElementsProvider = ({ children }) => {
    const [selectedElements, setSelectedElements] = useState();

    return (
        <ElementsContext.Provider value={{ selectedElements, setSelectedElements }}>
            { children }
        </ElementsContext.Provider>
    )
}

export default ElementsContext