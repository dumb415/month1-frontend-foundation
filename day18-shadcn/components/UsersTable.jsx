import {
  Table,        // ← <table> wrapper
  TableHeader,  // ← <thead>
  TableBody,    // ← <tbody>
  TableRow,     // ← <tr>
  TableHead,    // ← <th> (column title)
  TableCell,    // ← <td> (data cell)
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // from Day 18
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Map status → Badge variant. Static strings only (Day 16 lesson: never build class names dynamically).
const statusVariant = {
  Active: "default",
  Pending: "secondary",
  Inactive: "outline",
};

export default function UsersTable({ users }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
  // key={user.id} ← stable unique id, NOT the index (Day 12 lesson). A JS // comment ← produces no DOM node at all
  <TableRow key={user.id}>
    <TableCell className="font-medium">{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <Badge variant={statusVariant[user.status] ?? "outline"}>{user.status}</Badge> {/* inside a <td>, a space is legal HTML */}
    </TableCell>
  </TableRow>
))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}