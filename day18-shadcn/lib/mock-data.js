// Plain arrays of objects ← like std::vector<struct> in C++. No JSX, no React here.
export const weeklyData = [          // export const ← makes this importable (like declaring in a .h file)
  { day: "Mon", users: 120 },        // each object = one chart point; "day" → X axis, "users" → Y axis
  { day: "Tue", users: 180 },
  { day: "Wed", users: 150 },
  { day: "Thu", users: 220 },
  { day: "Fri", users: 260 },
  { day: "Sat", users: 210 },
  { day: "Sun", users: 300 },
];

export const recentUsers = [
  { id: 1, name: "Ayesha Rahman", email: "ayesha@example.com", status: "Active" },
  { id: 2, name: "Tanvir Hasan", email: "tanvir@example.com", status: "Active" },
  { id: 3, name: "Nusrat Jahan", email: "nusrat@example.com", status: "Pending" },
  { id: 4, name: "Rafiq Ahmed", email: "rafiq@example.com", status: "Inactive" },
  { id: 5, name: "Sadia Islam", email: "sadia@example.com", status: "Active" },
];

export const stats = [
  { id: "users", label: "Total Users", value: "12,480", icon: "users" },
  { id: "revenue", label: "Revenue", value: "$48,200", icon: "revenue" },
  { id: "active", label: "Active", value: "3,210", icon: "active" },
  { id: "growth", label: "Growth %", value: "+12.5%", icon: "growth" },
];