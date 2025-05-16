import React, { useEffect, useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No auth token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://cybersphere7.runasp.net/api/Student/get-all-students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        );

        if (response.status === 401) {
          setError("Unauthorized. Please log in again.");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading students...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h2>Students List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id || student.studentId || student.ID}>
              {student.name || student.fullName || JSON.stringify(student)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
