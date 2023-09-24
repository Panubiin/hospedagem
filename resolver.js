const { Client, GatewayIntentBits, REST } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const algebra = require('algebra.js');

const TOKEN = 'MTE1MzY4OTQ0NDAzNDAzOTg0OA.Gb25KJ.8nk6F-eVRiFoBd1Brr7QcyjgDKLL9aQWpKxZOk';
const CLIENT_ID = '1153689444034039848';
const GUILD_ID = '1153322698244636702';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const commands = [
  {
    name: 'resolver',
    description: 'Resolve uma equação de primeiro grau com uma incógnita',
    type: 1,
    options: [
      {
        name: 'equacao',
        description: 'A equação a ser resolvida (por exemplo, 2x + 3 = 7)',
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registrando comandos...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'resolver') {
    const equacao = options.getString('equacao');

    try {
      const resultado = resolverEquacao(equacao);
      interaction.reply(`Resultado: ${resultado}`);
    } catch (error) {
      interaction.reply('Erro ao resolver a equação.');
    }
  }
});

function resolverEquacao(equacao) {
  try {
    const eq = algebra.parse(equacao);
    const solution = eq.solveFor('x');
    return `O valor de x é ${solution.toString()}`;
  } catch (error) {
    throw new Error('Expressão inválida ou sem solução.');
  }
}

client.login(TOKEN);
