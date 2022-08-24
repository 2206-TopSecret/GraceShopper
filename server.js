const chalk = require('chalk');
const {app} = require('./app');

<<<<<<< HEAD
const { PORT = 1337 } = process.env;
=======
const PORT = process.env['PORT'] ?? 4000;
>>>>>>> f87be325b0be26de706c39713566ac0c301e61be


app.listen(PORT, async () => {
  console.log(
    chalk.blueBright('Server is listening on PORT:'),
    chalk.yellow(PORT),
    chalk.blueBright('Get your shopping on!')
  );
});