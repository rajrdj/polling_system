import { useState } from 'react';
import { useRouter } from 'next/router';

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (data.success) {
      router.push(`/questions/${data.data._id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter question"
        required
      />
      <button type="submit">Create Question</button>
    </form>
  );
}