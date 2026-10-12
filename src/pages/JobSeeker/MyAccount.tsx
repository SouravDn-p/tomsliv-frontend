import Container from "@/common/Container";
import MyAccountSidebar from "@/components/MyAccount/MyAccountSidebar";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home } from "lucide-react";

export default function MyAccount() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container
      className="flex flex-col lg:flex-row md:gap-6 pb-0 h-full relative"
      variant={"secondary"}
    >
      {/* Mobile Menu Trigger & Home Button */}
      <div className="lg:hidden flex items-center justify-between py-4 border-b border-border-primary mb-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2 text-[#205CA5]">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Menu</span>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#205CA5]">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-[300px] bg-background-lightgray"
            >
              <div className="h-full pt-10">
                <MyAccountSidebar onItemClick={() => setIsOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[324px]">
        <MyAccountSidebar />
      </div>

      <main className="flex-1 lg:py-0">
        <Outlet />
      </main>
    </Container>
  );
}
