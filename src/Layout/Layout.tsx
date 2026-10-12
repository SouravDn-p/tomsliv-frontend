import NavBar from "@/common/NavBar/NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <>
      {/* Navbar */}

      <NavBar />
      <main>
        <Outlet /> <ScrollRestoration key={pathname} />
      </main>
    </>
  );
};

export default Layout;
