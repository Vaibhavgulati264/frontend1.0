import React from 'react';

function CourseInstanceList({ instances }) {
  return (
    <div className="container">
      <h2>Course Instances</h2>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Year-Sem</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance, index) => (
            <tr key={index}>
              <td>{instance.title}</td>
              <td>{instance.year}-{instance.semester}</td>
              <td>{instance.code}</td>
              <td>
                <button>🔍</button>
                <button>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseInstanceList;