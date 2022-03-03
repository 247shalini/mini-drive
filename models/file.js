import mongoose from "mongoose";

const { Schema } = mongoose;

const FileSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    path: { type: Schema.Types.String, required: true },
    size: { type: Schema.Types.Number, required: true },
    type: { type: Schema.Types.String, required: true },
    permittedUsers: [
      new Schema(
        {
          userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
          },
          isOwner: { type: Schema.Types.Boolean, default: false },
        },
        {
          timestamps: true,
        }
      ),
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("file", FileSchema);
