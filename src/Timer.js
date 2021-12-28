import { useContext, useEffect, useReducer, useRef } from "react";
import "./App.css";
import TestContext from './test-context'


const reducer = (state, action) => {
  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { isRunning: false, time: 0 };
    case "tick":
      return { ...state, time: state.time + 1 };
    default:
      console.log("kar mot pid");
  }
};

const Timer = () => {
  const initialState = {
    isRunning: false,
    time: 0,
  };
  const {value, setValue} = useContext(TestContext);
  console.log(value);

  const [state, dispatch] = useReducer(reducer, initialState);
  const identifier = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      console.log("start return");
      return;
    }
    identifier.current = setInterval(() => {
      console.log("tick");
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      console.log("resolve return");
      clearInterval(identifier.current);
      identifier.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div>
      <h1>{state.time}</h1>

      <button onClick={() => dispatch({ type: "start" })}>Start</button>
      <button onClick={() => dispatch({ type: "stop" })}>Stop</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => setValue('Context')}>Context</button>
    </div>
  );
};
export default Timer;
