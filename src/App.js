import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "./SearchBar";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [query, setQuery] = useState("");

  const handleAdd = (student) => {
    const newStudent = { ...student, id: Date.now() };
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleUpdate = (updated) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditingStudent(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const filteredStudents = useMemo(() => {
    const q = query.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q)
    );
  }, [students, query]);

  return (
    <Container className="my-4 ">
      <h2 className="text-center mb-4 bg-light p-3 rounded">
        Simple Student Management System
      </h2>

      <Row className="mb-3">
        <Col md={4}>
          <StudentForm
            key={editingStudent ? editingStudent.id : "new"}
            initialData={editingStudent}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
          />
        </Col>
        <Col md={8}>
          <SearchBar query={query} onChange={setQuery} />
          <StudentList
            students={filteredStudents}
            onEdit={setEditingStudent}
            onDelete={handleDelete}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;