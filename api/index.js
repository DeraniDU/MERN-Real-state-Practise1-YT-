import express from 'express';

const app = express();  // create express app                                       
const PORT = 3000;  // port number

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!!!Horrayyy`);
} );