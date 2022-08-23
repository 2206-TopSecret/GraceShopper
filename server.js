const chalk = require('chalk');
const {app} = require('./app');

const { PORT = 1337 } = process.env;


app.listen(PORT, async () => {
  console.log(
    chalk.blueBright('Server is listening on PORT:'),
    chalk.yellow(PORT),
    chalk.blueBright('Get your shopping on!')
  );
});
