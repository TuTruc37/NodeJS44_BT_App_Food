import express from "express";

const app = express();

// anfn : function phím tắt -- ...handlers: (req, res,next)
app.get(`/`, (req,res,next) => {
    res.status(200).json(`Hello World!`)
 })

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

