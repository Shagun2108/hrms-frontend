import { useEffect, useState } from "react";
import { getEmployees } from "../services/employee.service";
import {
  markAttendance,
  getAttendance,
} from "../services/attendance.service";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: "",
    status: "PRESENT",
  });

  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
  });

  // Fetch employees for dropdown
  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  // Fetch attendance records
  const fetchAttendance = async () => {
    if (!selectedEmployee) return;

    setLoading(true);
    const data = await getAttendance(
      selectedEmployee,
      filter.startDate,
      filter.endDate
    );
    setAttendance(data);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedEmployee) {
      fetchAttendance();
    }
  }, [selectedEmployee]);

  // Mark attendance
  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    await markAttendance({
      employeeId: selectedEmployee,
      date: form.date,
      status: form.status,
    });

    setForm({ date: "", status: "PRESENT" });
    fetchAttendance();
  };

  return (
    <div className="space-y-6">
      {/* Employee Selection */}
      <Card>
        <div className="flex flex-col gap-4">
          <label className="font-medium">Select Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Choose Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp.employeeId}>
                {emp.fullName} ({emp.employeeId})
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Mark Attendance */}
      {selectedEmployee && (
        <Card>
          <form
            onSubmit={handleMarkAttendance}
            className="grid grid-cols-3 gap-4 items-end"
          >
            <Input
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              required
            />

            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
              </select>
            </div>

            <Button type="submit">Mark Attendance</Button>
          </form>
        </Card>
      )}

      {/* Filter Section */}
      {selectedEmployee && (
        <Card>
          <div className="grid grid-cols-3 gap-4 items-end">
            <Input
              label="Start Date"
              type="date"
              value={filter.startDate}
              onChange={(e) =>
                setFilter({ ...filter, startDate: e.target.value })
              }
            />
            <Input
              label="End Date"
              type="date"
              value={filter.endDate}
              onChange={(e) =>
                setFilter({ ...filter, endDate: e.target.value })
              }
            />
            <Button onClick={fetchAttendance}>Apply Filter</Button>
          </div>
        </Card>
      )}

      {/* Attendance Table */}
      {selectedEmployee && (
        <Card>
          {loading ? (
            <Loader />
          ) : attendance && attendance.length === 0 ? (
            <EmptyState message="No attendance records found." />
          ) : attendance ? (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td
                      className={`font-semibold ${
                        record.status === "PRESENT"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState message="Select an employee to view attendance." />
          )}
        </Card>
      )}
    </div>
  );
};

export default Attendance;
