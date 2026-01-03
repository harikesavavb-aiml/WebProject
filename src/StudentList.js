import React from "react";
import StudentCard from "./StudentCard";

function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p>No students to display.</p>;
  }

  return (
    <div>
      {students.map((s) => (
        <StudentCard
          
          key={s.id}
          student={s}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default StudentList;