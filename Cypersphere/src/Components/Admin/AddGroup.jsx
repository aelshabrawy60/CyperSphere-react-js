import React, { useState } from 'react';

function AddGroup() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      alert('Auth token not found!');
      return;
    }

    const data = {
      name,
      description,
      isPrivate,
    };

    try {
      const response = await fetch('https://cybersphere7.runasp.net/api/Group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Group added successfully!');
        handleReset();
      } else {
        const errorData = await response.json();
        alert('Failed to add group: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the group.');
    }
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setIsPrivate(false);
  };

  const handleCancel = () => {
    // You can also navigate away or close a modal if this is part of a modal
    handleReset();
  };

  return (
    <div>
      <h2>Add Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Group Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label>Private Group:</label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button type="submit">Add Group</button>
          <button type="button" onClick={handleReset}>Reset</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddGroup;
