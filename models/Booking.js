import mongoose from "mongoose";

const flightBookingSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  fromCity: {
    type: String,
  },
  toCity: {
    type: String,
  },
  departureDate: {
    type: Date,
    required: [true, "تاريخ المغادرة مطلوب"],
    validate: {
      validator: function (value) {
        return !isNaN(Date.parse(value));
      },
      message: "تاريخ المغادرة غير صالح",
    },
  },
  returnDate: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!value) return true; // allow null
        return !isNaN(Date.parse(value));
      },
      message: "تاريخ العودة غير صالح",
    },
  },
  passengers: {
    type: Number,
    required: true,
    min: [1, "يجب أن يكون عدد الركاب 1 على الأقل"],
    default: 1,
  },
  alt: { type: String, trim: true },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
  {
    timestamps: true,
  }
);


const Booking = mongoose.model("Booking", flightBookingSchema);

export default Booking;
