import mongoose, { Schema, model } from 'mongoose';

export interface VideoDoc {
  _id: mongoose.Types.ObjectId;
  youtubeId: string;
  title: string;
  description?: string | null;
  thumbnailUrl: string;
  channelName: string;
  channelId: string;
  publishedAt: Date;
  duration: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  engagementScore: number;
  topics: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<VideoDoc>({
  youtubeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  thumbnailUrl: { type: String, required: true },
  channelName: { type: String, required: true },
  channelId: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  duration: { type: String, required: true },
  viewCount: { type: Number, required: true },
  likeCount: { type: Number, required: true },
  commentCount: { type: Number, required: true },
  engagementScore: { type: Number, required: true },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
}, { timestamps: true });

VideoSchema.index({ engagementScore: -1 });
VideoSchema.index({ publishedAt: -1 });
VideoSchema.index({ viewCount: -1 });

export const Video = model<VideoDoc>('Video', VideoSchema);
