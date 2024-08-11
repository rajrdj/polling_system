import Link from 'next/link';
import QuestionList from '../components/QuestionList';

export default function Home() {
  return (
    <div>
      <h1>Polling System Api</h1>
      <Link href="/create">
        Create New Question Polling stytem Api
      </Link>
      <h2>Recent Questions</h2>
      <QuestionList />
    </div>
  );
}