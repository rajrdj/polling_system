import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('/api/questions');
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <ul>
      {questions.map((question) => (
        <li key={question._id}>
          <Link href={`/questions/${question._id}`}>
            {question.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}