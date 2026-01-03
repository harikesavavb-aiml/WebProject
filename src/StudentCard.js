import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

function StudentCard({ student, onEdit, onDelete }) {
  const pass = student.marks >= 40;
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>
          {student.name}{" "}
          <Badge bg="secondary" className="ms-2">
            {student.rollNo}
          </Badge>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Age: {student.age}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Course: {student.course}
        </Card.Subtitle>
        <Card.Text>
          Marks: {student.marks}{" "}
          <Badge bg={pass ? "success" : "danger"}>
            {pass ? "Pass" : "Fail"}
          </Badge>
        </Card.Text>
        <Button
          size="sm"
          variant="info"
          className="me-2"
          onClick={() => onEdit(student)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;