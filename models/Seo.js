import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
    {
        metaTitle: { type: String, trim: true, maxlength: 60 },
        metaDescription: { type: String, trim: true, maxlength: 160 },
        keywords: { type: String, trim: true },
        slugUrl: { type: String, trim: true, sparse: true },
        priority: { type: Number, default: 0.5 },
        changeFrequency: {
            type: String,
            enum: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"],
            default: "monthly",
        },
        noIndex: {
            type: String,
            enum: ["true", "false"],
            default: "false"
        },
        noFollow: {
            type: String,
            enum: ["true", "false"],
            default: "false"
        },
        noArchive: {
            type: String,
            enum: ["true", "false"],
            default: "false"
        },
        noSnippet: {
            type: String,
            enum: ["true", "false"],
            default: "false"
        },

        ogTitle: { type: String, trim: true, maxlength: 60 },
        ogDescription: { type: String, trim: true, maxlength: 160 },
        ogImage: { type: String, trim: true },
    },
    { _id: false }
);

export default seoSchema;
