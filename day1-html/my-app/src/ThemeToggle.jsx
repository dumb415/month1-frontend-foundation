import { useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  // ^ boolean state — same rules as before, just true/false instead of a number

  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#1a1a1a';
  // ^ derive colors FROM state instead of writing two separate blocks of JSX

  return (
    <div style={{ background: bgColor, color: textColor, padding: '20px' }}>
      <p>Current mode: {isDark ? 'Dark' : 'Light'}</p>
      <button onClick={() => setIsDark(!isDark)}>
        {/* ^ setIsDark(!isDark) reads current isDark, flips it, sets it.
               Equivalent to isDark = !isDark; but routed through the
               setter so React knows to re-render. */}
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeToggle;