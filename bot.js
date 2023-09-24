const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = 'MTE1MzY4OTQ0NDAzNDAzOTg0OA.G0DZx8.1Qf2vrU830XvvGA8dDU8eMYE0UeXQsX9EHMQtw';
const PREFIX = '!';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'calcular') {
      // Verifica se a mensagem possui o formato correto (e.g., !calcular 2 + 2)
      if (args.length === 3 && ['+', '-', '*', '/', '%'].includes(args[1])) {
        const num1 = parseFloat(args[0]);
        const operador = args[1];
        const num2 = parseFloat(args[2]);

        // Realiza o cálculo com base no operador
        let resultado;
        switch (operador) {
          case '+':
            resultado = num1 + num2;
            break;
          case '-':
            resultado = num1 - num2;
            break;
          case '*':
            resultado = num1 * num2;
            break;
          case '/':
            resultado = num1 / num2;
            break;
          case '%':
            resultado = (num1 * num2) / 100;
            break;
          default:
            resultado = 'Operador inválido';
        }

        message.reply(`Resultado: ${resultado}`);
      } else {
        message.reply('Formato inválido. Use !calcular <número> <operador> <número>. Por exemplo, !calcular 2 + 2');
      }
    }
  }
});

client.login(TOKEN);
