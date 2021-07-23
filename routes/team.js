const express = require('express');
const app =express();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");


const Meet = require('../models/meet');
const Team = require('../models/Team');
const Chat = require('../models/Chat');
const Doctor = require('../models/Doctor');

// @Route GET api/auth
//@desc Test routr
//@access Public 

// router.get('/',(req,res)=>res.send('Chat  route'));

router.get('/:name',async (req,res)=>{

    try{
        
        // Finds the information about the team whose name is :name
        var team = await Team.findOne({team_name:req.params.name});
        // // Finds all the calls whose team name is :name
        // var allCalls = await Meet.find({team_name:req.params.name});

        // Renders the page team's page showing all the calls
        res.render('teams_callSection',{teamInfo:team})
    }catch(err)
    {
        console.log(err);
        res.redirect('/');
    }
    
})




router.get('/:name/start_call/:username',async (req,res)=>{
    
    // Returns a unique ID. This ID is used as the Room ID during the video call
    let id=uuidv4();
    try{
        // Finds the information about the user who started the video call
        const user = await Doctor.findOne({email:req.params.username});
        // Saves the information about the video call in the Database
        const meet = new Meet({
            team_name:req.params.name,
            callID:id,
            count:0,
            host:req.params.username
        });
        await meet.save();
        
        const chat = new Chat({ChatID:id});
        await chat.save();

        // Redirects to video call page
        res.redirect(`/team/${req.params.name}/${id}`);
    }catch(err){
        console.log(err);
    }
})

// @route   GET team/:name/:room
// @desc    Joins a call using an ID
// @access  Private
router.get('/:name/:room',async (req,res)=>{
    // var meet =await Meet.findOne({callID:req.params.room});
    // meet.count=meet.count+1;
    // meet.attndc.unshift({
    //     participant:res.locals.user.username,
    //     objective:"Entered",
    //     time: new Date()
    // })
    // await meet.save();
    res.render('room',{roomId:req.params.room,channel:req.params.name});    
})





module.exports=router;

