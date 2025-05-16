import React, { useState } from 'react';

function AddLevel() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [parentLevelId, setParentLevelId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLevel = {
      title,
      description,
      parentLevelId: Number(parentLevelId) || 0
    };

    try {
      const response = await fetch('https://cybersphere7.runasp.net/api/Level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLevel)
      });

      if (response.ok) {
        setMessage('Level added successfully!');
        setTitle('');
        setDescription('');
        setParentLevelId('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to add level'}`);
      }
    } catch (error) {
      setMessage('Error: Network or server issue');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add New Level</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Parent Level ID (optional):</label><br />
          <input
            type="number"
            value={parentLevelId}
            onChange={(e) => setParentLevelId(e.target.value)}
          />
        </div>
        <button type="submit">Add Level</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddLevel;
