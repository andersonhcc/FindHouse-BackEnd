import { Schema, model } from "mongoose";

const HouseSchema = new Schema(
  {
    // quais campos vai ter nessa tabela?
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtual: true,
    },
  }
);

HouseSchema.virtual("thumbnail_url").get(function () {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

export default model("House", HouseSchema);
