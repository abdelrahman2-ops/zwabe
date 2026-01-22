import mongoose from "mongoose";
import { generateSlug } from "../utils/slugifyHelper.js";
import seoSchema from "./Seo.js";

const baseSectionSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    btnText: { type: String, trim: true },
}, { _id: false });


const seoPageSchema = new mongoose.Schema({
    hero: {type: String, trim: true},
    footer: {type: String, trim: true},
    title: { type: String, trim: true, required: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    descText: { type: String, trim: true },
    sections: {
        type: Map,
        of: baseSectionSchema,
        default: new Map()
    },
    slug: { type: String, unique: true, sparse: true },
    seo: { type: seoSchema, default: {} },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

seoPageSchema.pre('save', async function (next) {
    if (!this.slug && this.title) {
        this.slug = await generateSlug(this.title, this.constructor);
    }

    if (!this.seo?.slugUrl && this.slug) {
        if (!this.seo) this.seo = {};
        this.seo.slugUrl = this.slug;
    }

    next();
});

export default mongoose.model("SeoPage", seoPageSchema);