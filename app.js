const express = require("express");
const app = express();
const bookRouter = require("./routers/book");
const textRouter = require("./routers/text");

app.use("/book", bookRouter);
app.use("/text", textRouter);

app.listen(8080, () => {
    console.log("Server runnning...")
});