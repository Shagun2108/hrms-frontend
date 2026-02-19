import { useEffect, useState } from "react";
import { getSummary } from "../services/dashboard.service";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSummary().then(setData);
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card>
        <h2 className="text-gray-500">Total Employees</h2>
        <p className="text-2xl font-bold">{data.totalEmployees}</p>
      </Card>
      <Card>
        <h2 className="text-gray-500">Present Today</h2>
        <p className="text-2xl font-bold text-green-600">
          {data.presentToday}
        </p>
      </Card>
      <Card>
        <h2 className="text-gray-500">Absent Today</h2>
        <p className="text-2xl font-bold text-red-600">
          {data.absentToday}
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
