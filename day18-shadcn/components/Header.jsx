// No "use client": no hooks, no state, no events -> stays a Server Component (less JS sent to browser)
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Fallback = initials shown when there's no image

export default function Header() {
  return (
    // sticky top-0 = scrolls normally, then sticks at top (unlike fixed, it stays IN flow)
    // z-10 = stack above scrolling content | backdrop-blur = frosted glass | bg-background/80 = 80% opacity
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-8 backdrop-blur">
      {/* relative parent so the absolute icon positions against THIS box, not the page */}
      <div className="relative w-full max-w-sm">
        {/* top-1/2 + -translate-y-1/2 = vertically center an absolute element */}
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="pl-9" /> {/* pl-9 = room for the icon */}
      </div>

      <Avatar>
        <AvatarFallback>NI</AvatarFallback>
      </Avatar>
    </header>
  );
}