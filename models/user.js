import mongoose from "mongoose";

const { Schema } = mongoose;

const UserModelSchema = new Schema(
  {
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: false, default: "" },
  },
  {
    timestamps: true,
  }
);

UserModelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("user", UserModelSchema);
