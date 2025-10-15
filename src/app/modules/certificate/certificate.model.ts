// models/Certificate.ts
import mongoose, { Schema, Document, Model, model } from "mongoose";
import { TCertificate } from "./certificate.interface";


const CertificateSchema = new Schema<TCertificate>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    certificateUrl: { type: String},
  },
  { timestamps: true }
);

const Certificate_Model =model<TCertificate>("Certificates", CertificateSchema);

export default Certificate_Model;
