require('dotenv').config();
const app = require('./app');
const port = 3000;
const db = require('./database');
require('./redis/blacklist')

const routes = require('./rotas');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));

/*
const bcrypt = require('bcrypt');    
for (let custo = 6; custo < 18; custo++) {
  const tempoInicial  = Date.now();
  bcrypt.hash('A', custo).then(
    () => console.log(`custo: ${custo}; tempo: ${ Date.now() - tempoInicial} ms`)
  );
} */