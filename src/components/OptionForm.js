import { useState } from 'react';

export default function OptionForm({ onAddOption }) {
  const [newOption, setNewOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newOption.trim()) {
      onAddOption(newOption.trim());
      setNewOption('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        placeholder="Enter new option"
        required
      />
      <button type="submit">Add Option</button>
    </form>
  );
}