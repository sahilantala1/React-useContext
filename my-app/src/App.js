import { createContext } from "react";
import { ComA } from "./ComA";

const FirstName = createContext();
const LastName = createContext();

function App() {
  return (
    <div>
      <FirstName.Provider value={"Sahil"}>
        <LastName.Provider value={"Antala"}>
          <ComA></ComA>
        </LastName.Provider>
      </FirstName.Provider>
    </div>
  );
}

export default App;
export { FirstName, LastName };
