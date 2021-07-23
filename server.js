const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const passport = require('passport');
const server = require("http").Server(app);
const flash = require('connect-flash');
const session = require('express-session');
const moment = require('moment'); // Library that helps in printing time in a more user friendly manner
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});


require('./config/passport')(passport);


//Body parser Middleware 


app.use(express.urlencoded({extended: false}));

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());


  // Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');



// Set Static path
app.use(express.static(path.join(__dirname,'public')));

//Connecting to the Database
connectDB();

///Define Routes

app.use('/patients' ,require('./routes/patients.js'));
app.use('/doctors' ,require('./routes/doctors.js'));
app.use('/', require('./routes/index.js'));
app.use('/settings' ,require('./routes/settings.js'));
app.use('/team',require('./routes/team'));



// app.get('/',(req,res)=>{
//     res.render('index');
// })


app.get('/api/team',(req,res)=>{
    res.render('newteam.ejs',{
        title:'Create new team'
    });
})



io.on("connection", (socket) => {

  // Chat during Video Call (room.ejs)
  socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("user-connected", userId);

      socket.on("message",async (message) => {
          // Reads the chat from Database whose ChatID = roomID and appends the recieved message to it.
          var chat =await Chat.findOne({ChatID:roomId});
          console.log(roomId);
          chat.msg.push({
              message:message.msg,
              timestamp:moment().format('h:mm a'),
              username:message.user
          });
          // Saves the chat along with the new message
          await chat.save();
          console.log('Message Saved');
          // Displays the messages on the right side of the video call
          io.to(roomId).emit("createMessage", message);
          // Displays the message in the view chat option that can be accessed from team_callSection page
          // even during the video call
          io.to(roomId).emit('Show-Message', {username:message.user, msg:message.msg})
      });
  });

  // Personal Chat (chat.ejs)
  socket.on('join',(options,callback)=>{
      socket.join(options.roomId);
      
      socket.on('sendMessage',async (data, callback) => {
          console.log(data.roomId);
          const chat =await Chat.findOne({ChatID:data.roomId});
          chat.msg.push({
              username:data.username,
              message:data.message,
              timestamp:data.time,
          })
          await chat.save();
          // Displays the message in the chat page
          io.to(data.roomId).emit('Show-Message', {username:data.username, msg:data.message})
          // Displays the message on the right side of the video call
          io.to(data.roomId).emit("createMessage", {msg:data.message,user:data.username});
          callback()
      })

  })

});


const PORT = process.env.PORT || 4001;

app.listen(PORT , ()=>
    console.log(`Server running at port ${PORT}`)
)