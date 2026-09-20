// TodoApp.jsx
import { useState } from "react"; // useState ↔ a member variable + setter pair, like private int count; but reactive

function TodoApp() {
  // tasks: an array of objects, like std::vector<Task> where struct Task { string id; string text; bool done; };
  const [tasks, setTasks] = useState([]);

  // inputValue holds what's currently typed in the text box.
  // This is what makes the input "controlled" — React owns the value, not the DOM.
  const [inputValue, setInputValue] = useState("");

  // --- CREATE ---
  function addTask() {
    const trimmed = inputValue.trim(); // .trim() ↔ same as std::string trim, strips whitespace
    if (trimmed === "") return; // guard clause — don't add empty todos

    const newTask = {
      id: crypto.randomUUID(), // crypto.randomUUID() ↔ generates a unique string id, like boost::uuids::random_generator()()
      text: trimmed,
      done: false,
    };

    // Spread syntax [...tasks, newTask] ↔ creates a NEW array containing old elements + new one.
    // Equivalent to: vector<Task> newVec = oldVec; newVec.push_back(newTask);
    // We do NOT do tasks.push(newTask) — that mutates in place and React won't detect the change.
    setTasks([...tasks, newTask]);
    setInputValue(""); // clear the input after adding
  }

  // --- UPDATE (toggle done) ---
  function toggleTask(id) {
    // .map() ↔ like std::transform — builds a NEW array by applying a function to each element
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done } // spread on an OBJECT ↔ copy all fields, then override `done`
          : task // unchanged tasks pass through as-is
      )
    );
  }

  // --- DELETE ---
  function deleteTask(id) {
    // .filter() ↔ like std::remove_if but returns a NEW array instead of mutating in place
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div>
      <h2>My Tasks</h2>

      {/* Controlled input: value comes FROM state, onChange writes BACK to state.
          One-way-in, one-way-out loop — React state is the single source of truth,
          unlike an uncontrolled <input> where the DOM itself holds the value. */}
      <input
        type="text"
        value={inputValue} // value is always exactly what's in state — React controls it
        onChange={(e) => setInputValue(e.target.value)} // e.target.value ↔ e is the event object, like Qt's QEvent
        placeholder="New task..."
        onKeyDown={(e) => e.key === "Enter" && addTask()} // also allow pressing Enter
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {/* .map() renders JSX for each task. key={task.id} is REQUIRED and must be stable —
            tied to the DATA (a UUID), not the array position. This is the fix for the
            key={index} bug you just reproduced: with task.id, each task always gets its
            own DOM node regardless of reordering or deletion. */}
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.done ? "line-through" : "none", // ternary ↔ same as C++ ?:
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;