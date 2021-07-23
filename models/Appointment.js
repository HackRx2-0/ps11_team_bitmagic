const mongoose = require('mongoose');
const AppointmentSchema =new mongoose.Schema({
    AppointmentID:{
        type:String,
    },

    patientName: {
		type: String,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
    team_name: {
        type: String,
    },
    date: {
		type: Date,
		default: Date.now,
	},
    time_slot: {
        type: String,
    }
});

//date, time, patientname, email,
module.exports = Chat = mongoose.model('Appointment',ChatScehma);