import Sidebar from "@/components/navigation/Sidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Sidebar />
      <main>
        <div className="ml-[80px] lg:ml-[235px]">{children}</div>
      </main>
    </div>
  );
};

export default UserLayout;
