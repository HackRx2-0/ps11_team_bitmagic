const express = require('express');
const app = express();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Doctor=require('../models/Doctor');
const Team=require('../models/Team');
const Chat = require('../models/Chat');
const Patient = require('../models/Patient');



// @route   GET settings/new_team
// @desc    Creates a new Team
// @access  Private
router.get("/new_team",async (req,res)=>{
    const allDoctors=await Doctor.find({});
    res.render("new_team",{doc:allDoctors});
});


// @route   POST settings/new_team
// @desc    Creates a new team
// @access  Private
router.post('/new_team',async (req,res)=>{


    let id=uuidv4();
    try{
       
        const team=new Team({
            team_name:req.body.team_name,avatar:req.body.avatar,ChatID:id
        })
        team.members.unshift({
            member:req.body.members
            
        })
        await team.save();
        const teamChat = new Chat({ChatID:id});
        await teamChat.save();
        console.log(req.body.members);
        res.redirect('/dashboardd')
    }catch(err){
        console.log(err+" <== Error");
        res.redirect('/')
    }
})

// @route   GET settings/new_team
// @desc    Creates appointments
// @access  Private
router.get("/appointment",async (req,res)=>{
    const allTeams=await Team.find({});
    res.render("appointment",{team:allTeams});
});

router.post('/appointment',async (req,res)=>{


    let id=uuidv4();
    try{
       
        const appointment=new Appointment({
            team_name:req.body.team_name,avatar:req.body.avatar,ChatID:id
        })
        team.members.unshift({
            member:req.body.members
            
        })
        await team.save();
        const teamChat = new Chat({ChatID:id});
        await teamChat.save();
        console.log(req.body.members);
        res.redirect('/dashboardp')
    }catch(err){
        console.log(err+" <== Error");
        res.redirect('/')
    }
})


// @route   GET settings/consult
// @desc    Store all medical details for the patient
// @access  Private

router.get("/consult",async (req,res)=>{
  
    res.render("consult");
});


// @route   POST settings/new_team
// @desc    Creates a new team
// @access  Private
router.post('/consult',async (req,res)=>{

    
    
    try{
        const patient = await Patient.findOne({email:req.body.email});
        patient.phoneNumber = req.body.phone;
        patient.title = req.body.title;
        patient.gender = req.body.sex;
        patient.weight = req.body.weight;
        patient.bloodType = req.body.bloodType;

        patient.medicalHistory.unshift({
            startDate:req.body.date,
            condition:req.body.condition,
            notes:req.body.notes
        })
        console.log("Medical History appended");
        patient.allergies.unshift({
            aname:req.body.aname,
            severity:req.body.severity
        });
        console.log("Allergies History appended");
        patient.medication.unshift({
            mname:req.body.mname,
            dosage:req.body.dosage,
            manufacturer:req.body.manufacturer
        });
       
        console.log("Medication History appended");
         await patient.save();
       
        res.redirect('/dashboardp')
    }catch(err){
        console.log(err+" <== Error");
        res.redirect('/')
    }
})





module.exports = router;