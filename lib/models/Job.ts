import { Schema, model, models, Document } from 'mongoose';

export interface IJob extends Document {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'open' | 'closed' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: [{ type: String, required: true }],
    requirements: [{ type: String, required: true }],
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'draft'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

export const Job = models.Job || model<IJob>('Job', JobSchema);
export default Job;
