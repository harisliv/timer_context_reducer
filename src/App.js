import "./App.css";
import React, {useState} from "react";
import Input from "./Input";
import Timer from "./Timer";
import TestContext from "./test-context";
const App = () => {
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="App">
      <TestContext.Provider value={{value, setValue}}>
      <Timer />
      </TestContext.Provider>
      <Input value={value} onChange={changeHandler} />
    </div>
  );
};

export default App;
