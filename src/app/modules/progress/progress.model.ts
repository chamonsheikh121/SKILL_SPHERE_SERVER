import { model, Schema } from "mongoose";
import { TProgress } from "./progress.interface";
import { progress_status_const } from "./progress.constances";

const progressSchema = new Schema<TProgress>(
{
userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
enrollmentId: { type: Schema.Types.ObjectId, ref: "Enrollments", required: true },
completedLessons: { type: Number, required: true, default: 0, min: 0 },
totalLessons: { type: Number, required: true, default: 0, min: 0 },
percentage: { type: Number, required: true, default: 0, min: 0, max: 100 },
status: { type: String, enum:progress_status_const, required: true, default: 'in_progress' }
},
{ timestamps: true }
);


export const Progress_Model = model<TProgress>("Progress", progressSchema);