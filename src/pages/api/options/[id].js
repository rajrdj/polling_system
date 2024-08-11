import dbConnect from '../../../lib/mongodb';
import Option from '../../../lib/models/Option';
import Question from '../../../lib/models/Question';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'DELETE':
      try {
        const option = await Option.findById(id);
        if (!option) {
          return res.status(404).json({ success: false });
        }
        if (option.votes > 0) {
          return res.status(400).json({ success: false, message: 'Cannot delete option with votes' });
        }
        await Question.updateOne(
          { _id: option.question },
          { $pull: { options: option._id } }
        );
        await option.remove();
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