import Navbar from "./_components/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="bg-gray-100 w-full min-h-full overflow-y-auto flex flex-col items-center justify-center gap-10">
      <Navbar />

      {children}
    </div>
  );
};

export default ProtectedLayout;
