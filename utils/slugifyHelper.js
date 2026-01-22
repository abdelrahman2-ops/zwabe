import slugify from 'slugify';

export const generateSlug = async (text, Model, field = "slug") => {
  if (!text) return "";

  // base slug
  let baseSlug = slugify(text, {
      lower: true,
      strict: true,   
      locale: "ar",   
    });

  let slug = baseSlug;
  let counter = 1;

  // check if slug already exists in DB
  let exists = await Model.findOne({ [field]: slug });
  while (exists) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    exists = await Model.findOne({ [field]: slug });
  }

  return slug;
};


export function uniqueSlugPlugin(schema, Model) {
  schema.pre('updateOne', async function (next) {
    const update = this.getUpdate();
    const slug = update?.slug;

    if (!slug) return next();

    const exists = await Model.findOne({
      slug,
      _id: { $ne: this.getQuery()._id },
    });

    if (exists) {
      return next(new Error('Slug already exists, please choose another one'));
    }

    next();
  });
}
