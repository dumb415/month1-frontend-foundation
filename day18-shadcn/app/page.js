"use client"; // ← Next.js: marks this file as a Client Component. Required for useState/onClick.
              //   Without it, Next treats the file as a Server Component (runs only on the server).

import { useState } from "react"; // ← same useState you know from Day 10

// ← "@/" is the import alias to project root (set up by create-next-app). Like an -I include path in g++.
import { Button } from "@/components/ui/button"; // ← named import of YOUR copied source file
import { Input } from "@/components/ui/input";
import {
  Card,            // ← shadcn splits one Card into many small parts (composition, like Day 9)
  CardHeader,      // ← top section wrapper
  CardTitle,       // ← heading text
  CardDescription, // ← muted subtitle text
  CardContent,     // ← main body
  CardFooter,      // ← bottom section
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // ← small pill label

export default function TodoPage() {
  // Best practice: state named as noun + setNoun
  const [tasks, setTasks] = useState([]);      // ← array of { id, text, done }
  const [inputValue, setInputValue] = useState(""); // ← controlled input value (Day 12)

  const addTask = () => {
    const trimmed = inputValue.trim(); // ← .trim() removes leading/trailing spaces
    if (trimmed === "") return;        // ← guard clause: ignore empty input (early return, like in C++)

    // Immutable update: NEW array via spread, never tasks.push() (Day 10 lesson)
    setTasks([...tasks, { id: Date.now(), text: trimmed, done: false }]);
    setInputValue(""); // ← clear the input after adding
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t // ← copy object, flip ONE field
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id)); // ← keep everything EXCEPT this id
  };

  const doneCount = tasks.filter((t) => t.done).length; // ← derived value: no extra state needed

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      {/* ← Tailwind from Days 15-16: flex + centering */}
      <Card className="w-full max-w-md">
        {/* ← className is MERGED with the Card's built-in classes (via cn() in lib/utils.js) */}
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>Built with shadcn/ui</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ← space-y-4: vertical gap between direct children */}
          <div className="flex gap-2">
            <Input
              value={inputValue}                                // ← controlled input
              onChange={(e) => setInputValue(e.target.value)}   // ← update state on each keystroke
              onKeyDown={(e) => e.key === "Enter" && addTask()} // ← Enter key submits (&& short-circuit)
              placeholder="Add a task..."
            />
            <Button onClick={addTask}>Add</Button>
            {/* ← default variant = primary style */}
          </div>

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-2">
                {/* ← key={task.id}: stable id, NOT index (Day 12 lesson) */}
                <span className={task.done ? "line-through text-muted-foreground" : ""}>
                  {/* ← text-muted-foreground: shadcn theme color token (adapts to dark mode) */}
                  {task.text}
                </span>
                <div className="flex gap-1">
                  <Button
                    size="sm"                                    // ← size variant: small
                    variant={task.done ? "secondary" : "outline"} // ← variant prop, like your Day 16 Button
                    onClick={() => toggleTask(task.id)}           // ← arrow wrapper so it runs on click, not on render
                  >
                    {task.done ? "Undo" : "Done"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive" // ← red variant
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground">No tasks yet.</p> // ← empty state (Day 14 habit)
          )}
        </CardContent>

        <CardFooter className="flex gap-2">
          <Badge variant="secondary">{tasks.length} total</Badge>
          {/* ← Badge = pill label */}
          <Badge>{doneCount} done</Badge>
        </CardFooter>
      </Card>
    </main>
  );
}