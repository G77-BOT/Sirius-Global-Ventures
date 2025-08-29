import { Schema, model, models, Document } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: string; // URL to the uploaded resume
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'interviewing' | 'hired' | 'rejected';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'interviewing', 'hired', 'rejected'],
      default: 'pending',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const JobApplication =
  models.JobApplication || model<IJobApplication>('JobApplication', JobApplicationSchema);

export default JobApplication;
