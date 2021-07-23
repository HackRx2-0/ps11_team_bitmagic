const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');




const PatientSchema =new mongoose.Schema({
   
            title: {
        type: String,
        
      },
      gender: {
        type: String,
        },
      dateOfBirth: {
        type: String, // Date
      },
      phoneNumber: {
        type: String,
       
      },
      weight: {
        type: Number,
        
      },
      medicalHistory: [
        {
         
          startDate: {
            type: String, // Date
          },
          condition: {
            type: String,
           
          },
          notes: {
            type: String,
           
          },
        },
      ],
      allergies: [
        {
          
          aname: {
            type: String,
           
          },
          severity: {
            type: Number,
           
          },
        },
      ],
      medication: [
        {
          
          mname: {
            type: String,
            
          },
          dosage: {
            type: Number,
            
          },
          manufacturer: {
            type: String,
            
          },
        },
      ],
      bloodType: {
        type: String,
        
      },
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

module.exports = Patient = mongoose.model('Patient',PatientSchema);