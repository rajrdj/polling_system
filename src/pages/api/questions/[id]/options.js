import dbConnect from '../../../../lib/mongodb';
import Question from '../../../../lib/models/Question';
import Option from '../../../../lib/models/Option';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const question = await Question.findById(id);
        if (!question) {
          return res.status(404).json({ success: false });
        }
        const option = await Option.create({ ...req.body, question: id });
        question.options.push(option._id);
        await question.save();
        res.status(201).json({ success: true, data: option });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}