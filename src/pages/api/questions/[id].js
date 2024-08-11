import dbConnect from '../../../lib/mongodb';
import Question from '../../../lib/models/Question';
import Option from '../../../lib/models/Option';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const question = await Question.findById(id).populate('options');
        if (!question) {
          return res.status(404).json({ success: false });
        }
        const formattedOptions = question.options.map(option => ({
          id: option._id,
          text: option.text,
          votes: option.votes,
          link_to_vote: `${process.env.NEXT_PUBLIC_API_URL}/api/options/${option._id}/add_vote`
        }));
        res.status(200).json({ success: true, data: {
          id: question._id,
          title: question.title,
          options: formattedOptions
        }});
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const question = await Question.findById(id).populate('options');
        if (!question) {
          return res.status(404).json({ success: false });
        }
        const hasVotes = question.options.some(option => option.votes > 0);
        if (hasVotes) {
          return res.status(400).json({ success: false, message: 'Cannot delete question with voted options' });
        }
        await Option.deleteMany({ _id: { $in: question.options } });
        await question.remove();
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}