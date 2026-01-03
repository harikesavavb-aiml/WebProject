import React from "react";
import Form from "react-bootstrap/Form";

function SearchBar({ query, onChange }) {
  return (
    <Form className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search by name, age, roll no, course"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form>
  );
}

export default SearchBar;