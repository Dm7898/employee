import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to Admin Panel
        </h1>
      </div>
    </Layout>
  );
};

export default Dashboard;
