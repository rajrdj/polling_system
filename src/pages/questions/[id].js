import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OptionForm from '../../components/OptionForm';

export default function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState(null);

  const fetchQuestion = async () => {
    if (id) {
      const res = await fetch(`/api/questions/${id}`);
      const data = await res.json();
      if (data.success) {
        setQuestion(data.data);
      }
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleVote = async (optionId) => {
    const res = await fetch(`/api/options/${optionId}/add_vote`, {
      method: 'POST',
    });
    if (res.ok) {
      fetchQuestion();
    }
  };

  if (!question) return <div>Loading...</div>;

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
      <OptionForm questionId={id} onOptionAdded={fetchQuestion} />
    </div>
  );
}