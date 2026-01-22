import mongoose from 'mongoose';
import Package from './Package.js';
const rateSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    }
}, {
    timestamps: true
});

rateSchema.statics.calculateAvgRatings = async function (packageId) {
    const stats = await this.aggregate([
        {
            $match: { package: packageId }
        },
        {
            $group: {
                _id: '$package',
                numRating: { $sum: 1 },
                avgRating: { $avg: '$rate' }
            }

        }
    ])
    if (stats.length > 0) {
        await Package.findByIdAndUpdate(packageId, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].numRating
        })

    } else {
        await Package.findByIdAndUpdate(packageId, {
            ratingsAverage: 4,
            ratingsQuantity: 0
        })

    }

}

rateSchema.post('save', function () {
    const model = this.constructor;

    model.calculateAvgRatings(this.package);
})


rateSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calculateAvgRatings(doc.package);
  }
});


export default mongoose.model('Rate', rateSchema);
