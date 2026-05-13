const express = require("express")
const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
    res.json({message:"le serveur est en marche hehehe"})
});

const authorsRouter = require('./routes/authors.routes');
app.use('/authors', authorsRouter);
const articlesRouter = require('./routes/articles.routes');
app.use('/articles', articlesRouter);

app.listen(3000, () =>{
    console.log("serveur en marche");
});

