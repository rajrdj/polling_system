import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OptionForm from '../../components/OptionForm';

export default function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (id) {
        try {
          setLoading(true);
          const res = await fetch(`/api/questions/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch question');
          }
          const data = await res.json();
          if (data.success) {
            setQuestion(data.data);
          } else {
            throw new Error(data.message || 'Failed to fetch question');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuestion();
  }, [id]);

  const handleVote = async (optionId) => {
    try {
      const res = await fetch(`/api/options/${optionId}/add_vote`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to add vote');
      }
      const updatedQuestion = { ...question };
      const votedOption = updatedQuestion.options.find(opt => opt.id === optionId);
      if (votedOption) {
        votedOption.votes += 1;
      }
      setQuestion(updatedQuestion);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddOption = async (newOption) => {
    try {
      const res = await fetch(`/api/questions/${id}/options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newOption }),
      });
      if (!res.ok) {
        throw new Error('Failed to add option');
      }
      const data = await res.json();
      if (data.success) {
        const updatedQuestion = { ...question };
        updatedQuestion.options.push({
          id: data.data._id,
          text: data.data.text,
          votes: 0,
          link_to_vote: `/api/options/${data.data._id}/add_vote`,
        });
        setQuestion(updatedQuestion);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!question) return <div>Question not found</div>;

  return (
    <div>
      <h1>{question.title}</h1>
      <ul>
        {question.options.map((option) => (
          <li key={option.id}>
            {option.text} - Votes: {option.votes}
            <button onClick={() => handleVote(option.id)}>Vote</button>
          </li>
        ))}
      </ul>
      <h2>Add New Option</h2>
      <OptionForm onAddOption={handleAddOption} />
    </div>
  );
}