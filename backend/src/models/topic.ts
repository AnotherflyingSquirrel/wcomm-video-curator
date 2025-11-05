import mongoose, { Schema, model } from 'mongoose';

export interface TopicDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string | null;
}

const TopicSchema = new Schema<TopicDoc>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
});

export const Topic = model<TopicDoc>('Topic', TopicSchema);
