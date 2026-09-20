import { useState } from 'react';
// ^ named import — like `using std::vector;` — pulls one specific
//   tool out of the 'react' module rather than the whole library

function Counter() {
  const [count, setCount] = useState(0);
  // ^ this line does THREE things at once, unpack it carefully:
  //
  // 1. useState(0)        → creates a state variable, starting value 0
  //                          (0 is only used on the VERY FIRST render —
  //                          think of it like a constructor's initial value)
  //
  // 2. useState() RETURNS an array of exactly 2 things: [currentValue, setterFn]
  //                          similar to how a C function could return a
  //                          struct { int value; void(*setter)(int); }
  //
  // 3. const [count, setCount] = ...
  //                          this is ARRAY DESTRUCTURING — position-based
  //                          unpacking. It's like:
  //                          int count = arr[0];
  //                          auto setCount = arr[1];
  //                          The NAMES (count, setCount) are yours to choose —
  //                          React doesn't care what you call them, only
  //                          the ORDER matters.

  // count       → read-only snapshot of current state (like a const int)
  // setCount(x) → the ONLY legal way to change it (like a private member
  //               you can only touch through a setter method)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* ^ onClick takes a FUNCTION, not a value. This is like passing
             a function pointer in C: onClick(&handler) not onClick(handler()).
             Writing onClick={setCount(count+1)} (no arrow) would CALL it
             immediately during render — a classic beginner bug. */}
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;