import { APP_NAME } from "@/constants/appConstants";
 
const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-600">
      <h1 className="text-5xl font-bold mb-4">Welcome to {APP_NAME}</h1>
      <p className="text-lg mb-8">
        Manage your investments and policies with ease.
      </p>
    </div>
  );
};
 
export default Dashboard;
 