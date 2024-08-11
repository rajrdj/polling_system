import dbConnect from '../../../lib/mongodb';
import Question from '../../../lib/models/Question';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const question = await Question.create(req.body);
        res.status(201).json({ success: true, data: question });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}