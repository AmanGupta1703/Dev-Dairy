import { Outlet } from "react-router-dom";

import { Footer, Header } from "../components";

function AppLayout() {
  return (
    <div className="h-screen">
      <div className="font-lato mx-auto flex h-full max-w-7xl flex-col">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
