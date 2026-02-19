import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../services/employee.service";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

const Employees = () => {
  const [employees, setEmployees] = useState(null);
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const fetchData = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee(form);
    setForm({ employeeId: "", fullName: "", email: "", department: "" });
    fetchData();
  };

  if (!employees) return <Loader />;

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
          <Input
            label="Employee ID"
            value={form.employeeId}
            onChange={(e) =>
              setForm({ ...form, employeeId: e.target.value })
            }
          />
          <Input
            label="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <Input
            label="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />
          <Button type="submit" className="col-span-4">
            Add Employee
          </Button>
        </form>
      </Card>

      <Card>
        {employees.length === 0 ? (
          <EmptyState message="No employees found" />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Present Days</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-b">
                  <td>{emp.fullName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td className="text-green-600 font-semibold">
                    {emp.totalPresentDays}
                  </td>
                  <td>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        deleteEmployee(emp._id);
                        fetchData();
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default Employees;
