import dbConnect from '../../../../lib/mongodb';
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
        const option = await Option.findById(id);
        if (!option) {
          return res.status(404).json({ success: false });
        }
        option.votes += 1;
        await option.save();
        res.status(200).json({ success: true, data: option });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}