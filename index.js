// Utilizzo di CommonJS per importare i moduli in un ambiente Node.js con type: module
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

//
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;


// Middleware per gestire dati JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Imposta EJS come motore di rendering
app.set('view engine', 'ejs');
// Imposta la directory delle viste
app.set('views', path.join(__dirname, 'views'));

// Middleware per servire file statici dalla directory 'public'
app.use(express.static(path.join(__dirname, 'Public')));


app.get('/about', (req, res) => {
  res.render("about.ejs");
})

// Gestisce la richiesta GET alla radice
app.get('/', (req, res) => {
  res.render('index.ejs', { articles });
});


// Gestisce la richiesta POST all'endpoint /submit
app.post('/submit', (req, res) => {
  const { autor, title, message } = req.body;
  articles.push({ id: uuidv4(), autor, title, corp: message });
  res.redirect('/');
});

// Gestisce la richiesta GET per l'edit di un articolo
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const article = articles.find(article => article.id === id);
  if (article) {
    res.render('edit', { article });
  } else {
    res.redirect('/');
  }
});

// Gestisce la richiesta POST per cancellare un articolo
app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = articles.findIndex(article => article.id === id);
  if (index !== -1) {
    articles.splice(index, 1);
  }
  res.redirect('/');
});

// Gestisce la richiesta POST per aggiornare un articolo
app.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { autor, title, message } = req.body;
  const article = articles.find(article => article.id === id);
  if (article) {
    article.autor = autor;
    article.title = title;
    article.corp = message;
  }
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})