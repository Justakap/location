
const express = require("express");
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const DriverModel = require('./models/driver');

const bodyParser = require('body-parser');
const roomModel = require("./models/room");
const UserModel = require("./models/user");
const studentModel = require("./models/student");
const vehicleModel = require("./models/vehicle");
const routeModel = require("./models/route");
const stopModel = require("./models/stop");




const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://marklogistics.netlify.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Apply CORS middleware
app.use(cors({
    origin: ["http://localhost:3000", "https://marklogistics.netlify.app"],
    credentials: true,
}));


const port = 8000;

mongoose.connect("mongodb+srv://anantk15:root@cluster0.972saxu.mongodb.net/transportation?retryWrites=true&w=majority")
    .then(() => {
        console.log("MongoDB connection successful");
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
    });

app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/userNew', async (req, res) => {
    try {
        const { _id } = req.query; // Extract email from query parameters

        // Find the user by email
        const user = await UserModel.findOne({ _id: _id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user); // Send user data as response
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get('/rooms', (req, res) => {
    roomModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
app.get('/student', (req, res) => {
    studentModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
app.get('/vehicle', (req, res) => {
    vehicleModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
app.get('/route', (req, res) => {
    routeModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
app.get('/stops', (req, res) => {
    stopModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
app.get('/driver', (req, res) => {
    DriverModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})




app.delete('/deleteRoom/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRoom = await roomModel.findOneAndDelete({ roomCode: id });
        if (deletedRoom) {
            res.status(200).json({ message: `Room with room code ${id} deleted successfully` });
        } else {
            res.status(404).json({ message: `Room with room code ${id} not found` });
        }
    } catch (err) {
        console.error('Error deleting room:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});





// login and signup routes 

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            // Check if the password matches
            if (user.password === password) {

                // Respond with JSON data containing user's information
                res.json({ auth: true, user: user });
            } else {
                // If the password doesn't match, respond with JSON indicating incorrect password
                res.json("incorrect");
            }
        } else {
            // If no user found with the provided email, respond with JSON indicating user does not exist
            res.json("notexist");
        }
    } catch (error) {
        // If an error occurs, respond with JSON indicating server error
        console.error(error);
        res.status(500).json("server error");
    }
});
app.post('/signup', async (req, res) => {
    const { name, email, password, contact } = req.body

    const data = {
        email: email,
        password: password,
        name: name,
        contact: contact,

    }

    try {
        const check = await UserModel.findOne({ email: email })
        if (check) {
            res.json("exist")
        } else {
            res.json("notexist")
            await UserModel.insertMany([data])
        }
    } catch (error) {
        console.log(error);
        res.json("invalid")
    }

})

// add-driver route
app.post('/add-driver', async (req, res) => {
    const {email, name, password, org ,contact} = req.body;

    if (!name || !password || !email || !org|| !contact) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = {
        email:email,
        password: password,
        name: name,
        org: org,
        contact:contact,

    };

    try {
        await DriverModel.insertMany([data]); // Assuming DriverModel is a Mongoose model
        res.status(201).json({ message: 'Driver added successfully' });
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/add-student', async (req, res) => {
    const { email, password, name, contact, emergencyContact, org, vehicleNo, stop } = req.body;


    // org will be added automatically user cant add this like {user.org} because org admin will add this 
    // Check for required fields
    if (!email || !password || !name || !contact || !emergencyContact || !org || !stop) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = {
        email,
        password,
        name,
        contact,
        emergencyContact,
        org,
        vehicleNo,
        stop
    };

    try {
        await studentModel.insertMany([data]);
        res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/add-vehicle', async (req, res) => {
    const { vehicleNo, name, org } = req.body;

    // Check for required fields
    if (!vehicleNo || !name || !org) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = {
        vehicleNo,
        name,
        org
    };

    try {
        await vehicleModel.insertMany([data]);
        res.status(201).json({ message: 'Vehicle added successfully' });
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/add-route', async (req, res) => {
    const { name, org, stop, vehicleNo } = req.body;

    // Check for required fields
    if (!name || !org) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = {
        name,
        org,
        stop,
        vehicleNo
    };

    try {
        await routeModel.insertMany([data]);
        res.status(201).json({ message: 'Route added successfully' });
    } catch (error) {
        console.error('Error adding route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/add-stop', async (req, res) => {
    const { name, org, lat, long, radius } = req.body;

    // Check for required fields
    if (!name || !org || !lat || !long || !radius) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = {
        name,
        org,
        lat,
        long,
        radius
    };

    try {
        await stopModel.insertMany([data]);
        res.status(201).json({ message: 'Stop added successfully' });
    } catch (error) {
        console.error('Error adding stop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/AddRoom', async (req, res) => {
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const { owner } = req.body;

    // Generate the room code
    const roomCode = makeid(9);

    const data = {
        owner: owner,
        roomCode: roomCode,
    };

    try {
        const check = await roomModel.findOne({ owner: owner });
        const check2 = await roomModel.findOne({ roomCode: roomCode });

        if (check || check2) {
            await roomModel.findOneAndDelete({ owner: owner });
            await roomModel.create(data);
            return res.json({ message: "added", roomCode: roomCode });
        }

        await roomModel.create(data);
        console.log("Data inserted:", data);
        return res.json({ message: "added", roomCode: roomCode });

    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ message: "nadded" });
    }
});










io.on('connection', (socket) => {
    // console.log(`A user connected: ${socket.id}`);

    // Handle the driver joining the room
    socket.on('joinDriverRoom', (roomCode) => {
        // console.log(`Driver joined room: driver_${roomCode}`);
        socket.join(`driver_${roomCode}`, (err) => {
            if (err) {
                console.error(`Error joining room driver_${roomCode}:`, err.message);
            }
        });
    });

    // Handle location updates from driver
    socket.on('locationUpdate', (data) => {
        const { userId, roomCode, lat, long, accuracy, speed, LastUpdated, altitude, altitudeAccuracy, heading } = data;
        console.log(`Location update for driver ${userId} in room driver_${roomCode}:`, lat, long, accuracy, speed, heading, altitude, altitudeAccuracy);
        io.to(`driver_${roomCode}`).emit('locationUpdate', { lat, long, accuracy, speed, LastUpdated, altitude, heading, altitudeAccuracy });
    });

    // Handle the student joining the room
    socket.on('joinStudentRoom', (roomCode) => {
        console.log(`Student joined room: driver_${roomCode}`);
        socket.join(`driver_${roomCode}`, (err) => {
            if (err) {
                console.error(`Error joining room driver_${roomCode}:`, err.message);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
