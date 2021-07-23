const express = require('express');
const router = express.Router();

const Team = require('../models/Team');

// Welcome Page
router.get('/',  (req, res) => res.render('index'));

// Dashboard
router.get('/dashboardp',  async (req, res) =>{
 const teams = await Team.find({}); 
  res.render('dashboardp', {
    user: req.user,
    teams: teams
  
  })
}
);

router.get('/dashboardd', async (req, res) =>{
  const teams = await Team.find({});
  console.log(teams[0].team_name);
  res.render('dashboardd',  {
    user: req.user,
    teams: teams
  

  })
}
);

module.exports = router;