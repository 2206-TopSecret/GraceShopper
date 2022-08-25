const chalk = require('chalk');
const { app } = require('./app');

const PORT = process.env['PORT'] ?? 4000;
<<<<<<< HEAD

=======
>>>>>>> f84909342ec4f6c4eded62072a6fd362562fe081

app.listen(PORT, async () => {
  console.log(
    chalk.blueBright('Server is listening on PORT:'),
    chalk.yellow(PORT),
    chalk.blueBright('Get your shopping on!')
  );
});
