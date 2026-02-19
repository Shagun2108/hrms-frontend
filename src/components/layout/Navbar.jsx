import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">HRMS Lite</h1>
      <div className="flex gap-6">
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/attendance">Attendance</Link>
      </div>
    </nav>
  );
};

export default Navbar;
