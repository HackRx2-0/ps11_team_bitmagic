const mongoose = require('mongoose');
const DoctorSchema =new mongoose.Schema({
    // profileImage: {
    //     type: String, // Link
    //   },
    //   firstName: {
    //     type: String,
    //     required: [true, 'first name can not be blank'],
    //     minlength: 2,
    //     maxlength: 255,
    //     trim: true,
    //   },
    //   lastName: {
    //     type: String,
    //     required: [true, 'last name can not be blank'],
    //     minlength: 2,
    //     maxlength: 255,
    //     trim: true,
    //   },
    //   title: {
    //     type: String,
    //     minlength: 2,
    //     maxlength: 255,
    //     trim: true,
    //   },
    //   sex: {
    //     type: String,
    //     lowercase: true,
    //     enum: ['male', 'female'],
    //   },
    //   dateOfBirth: {
    //     type: String, // Date
    //   },
    //   phoneNumber: {
    //     type: String,
    //     minlength: 10,
    //     maxlength: 24,
    //     trim: true,
    //   },
    //   address: {
    //     number: {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //     },
    //     street: {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //       trim: true,
    //     },
    //     city: {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //       trim: true,
    //     },
    //     state: {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //       trim: true,
    //     },
    //     country: {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //       trim: true,
    //     },
    //     postcode: {
    //       type: Number,
    //       min: 1,
    //       max: 1000000,
    //     },
    //   },
    //   email: {
    //     type: String,
    //     required: [true, 'email name can not be blank'],
    //     minlength: 6,
    //     maxlength: 255,
    //     trim: true,
    //     unique: true,
    //   },
    //   password: {
    //     type: String,
    //     required: [true, 'password can not be blank'],
    //     minlength: 6,
    //     maxlength: 1024,
    //     trim: true,
    //   },
    
    // workSchedule: {
    //     openingTime: String,
    //     closingTime: String,
    //     lunchBreakStart: String,
    //     lunchBreakEnd: String,
    //     unavailableDateTimes: [
    //       {
    //         startDateTime: String,
    //         endDateTime: String,
    //         modifier: String,
    //       },
    //     ],
    //   },
    //   licence: {
    //     type: String,
    //     min: 6,
    //     max: 12,
    //   },
    //   accreditations: [
    //     {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //     },
    //   ],
    //   specialtyField: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 255,
    //     trim: true,
    //   },
    //   subSpecialtyField: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 255,
    //     trim: true,
    //   },
    //   education: [
    //     {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //     },
    //   ],
    //   yearsExperience: {
    //     type: Number,
    //     min: 1,
    //     max: 100,
    //   },
    //   tags: [
    //     {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //     },
    //   ],
    //   languagesSpoken: [
    //     {
    //       type: String,
    //       minlength: 1,
    //       maxlength: 255,
    //     },
    //   ],
    //   rating: {
    //     type: Number,
    //     min: 1,
    //     max: 5,
    //   },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Doctor = mongoose.model('Doctor',DoctorSchema);