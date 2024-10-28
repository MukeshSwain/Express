import express from 'express';
const app = express();
const port = 3000;


// app.get('/', (req, res) => {
//     res.send("This is my first meet with express..")
// })
// app.get('/mukesh', (req, res) => {
//     res.send("ME MUKESH");
    
// })
// app.get('/ice-cream', (req, res) => {
//     res.send('I love Ice cream in summer...')
// })
// app.get('/about', (req, res) => {
//     res.send("My name is mukesh ,Now i am persuing my Masters in cse")
// })
app.use(express.json())
let teaData = [];
let nextId = 1;

//Add new tea..
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = {id:nextId++,name,price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})
//get all tea..
app.get('/show', (req, res) => {
    res.send(teaData);
})

//get a specified single tea....
app.get('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('tea not found');
    }
    res.status(203).send(tea)
})

//update..
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found!');
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

//delete tea..
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found');
    }
    teaData.splice(index, 1);
    return res.status(200).send('Tea deleted');
})
app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})