import React, { useState } from 'react';

function CourseForm({ onAddCourse }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && code && description) {
      onAddCourse({ title, code, description });
      setTitle('');
      setCode('');
      setDescription('');
    }
  };

  return (
    <div className="container">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default CourseForm;