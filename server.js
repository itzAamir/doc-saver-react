const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.listen(port, () => console.log(`Server started at PORT: ${port}`))