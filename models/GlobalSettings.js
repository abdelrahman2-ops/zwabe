import mongoose from 'mongoose';

const globalSettingsSchema = new mongoose.Schema({

    contactInfo: {
        phones: [{
            number: {
                type: String,
                required: true
            },
            label: {
                type: String,
                default: 'Main'
            },
            isPrimary: {
                type: Boolean,
                default: false
            },
            isWhatsApp: {
                type: Boolean,
                default: false
            },
            countryCode: {
                type: String,
                default: '+966'
            }
        }],

        emails: [{
            email: {
                type: String,
                required: true
            },
            label: {
                type: String,
                default: 'General'
            },
            isPrimary: {
                type: Boolean,
                default: false
            },
            department: {
                type: String,
                enum: ['general', 'support', 'sales', 'booking', 'complaints'],
                default: 'general'
            }
        }],
        addresses: [
            String
        ]
    },
    socialMedia: {
        facebook: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        },
        instagram: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        },
        youtube: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        },
        twitter: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        },
        tiktok: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        },
        snapchat: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        },
        linkedin: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        },
        whatsApp: {
            name: String,
            url: String,
            deskTopImage: String,
            mobileImage: String
        }
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});


export default mongoose.model('GlobalSettings', globalSettingsSchema);