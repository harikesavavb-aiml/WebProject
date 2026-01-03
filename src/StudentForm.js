import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const emptyForm = { name: "", age: "", rollNo: "", course: "", marks: "" };

function StudentForm({ initialData, onAdd, onUpdate }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        age: String(initialData.age),
        rollNo: initialData.rollNo,
        course: initialData.course,
        marks: String(initialData.marks),
      });
    } else setForm(emptyForm);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Name required";
    if (!form.age.trim()) er.age = "Age required";
    else if (isNaN(Number(form.age))) er.age = "Age must be number";
    else if (Number(form.age) <= 0) er.age = "Age must be positive";
    if (!form.rollNo.trim()) er.rollNo = "Roll no required";
    if (!form.course.trim()) er.course = "Course required";
    if (form.marks === "") er.marks = "Marks required";
    else if (isNaN(Number(form.marks))) er.marks = "Marks must be number";
    else if (Number(form.marks) < 0 || Number(form.marks) > 100)
      er.marks = "Marks 0–100 only";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...initialData,
      name: form.name.trim(),
      age: Number(form.age),
      rollNo: form.rollNo.trim(),
      course: form.course.trim(),
      marks: Number(form.marks),
    };

    if (initialData && initialData.id) onUpdate(data);
    else onAdd(data);
    setForm(emptyForm);
  };

  const editing = Boolean(initialData && initialData.id);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{editing ? "Edit Student" : "Add Student"}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Age</Form.Label>
            <Form.Control
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Roll No</Form.Label>
            <Form.Control
              name="rollNo"
              value={form.rollNo}
              onChange={handleChange}
              isInvalid={!!errors.rollNo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rollNo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Course</Form.Label>
            <Form.Control
              name="course"
              value={form.course}
              onChange={handleChange}
              isInvalid={!!errors.course}
            />
            <Form.Control.Feedback type="invalid">
              {errors.course}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marks</Form.Label>
            <Form.Control
              type="number"
              name="marks"
              value={form.marks}
              onChange={handleChange}
              isInvalid={!!errors.marks}
            />
            <Form.Control.Feedback type="invalid">
              {errors.marks}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant={editing ? "warning" : "primary"}>
            {editing ? "Update" : "Add"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default StudentForm;