import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);