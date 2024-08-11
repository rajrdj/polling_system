import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option'
  }]
});

export default mongoose.models.Question || mongoose.model('Question', questionSchema);