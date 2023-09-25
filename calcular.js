const { Client, GatewayIntentBits, REST } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const math = require('mathjs');

const TOKEN = 'MTE1MzY4OTQ0NDAzNDAzOTg0OA.GCvdWq.bZNXFgDI7xZkRYnjF6PgDMXDke_TO0LALsFSss';
const PREFIX = '!';

const CLIENT_ID = '1153689444034039848'; // Adicione o ID do seu bot aqui
const GUILD_ID = '1153322698244636702'; // Adicione o ID do servidor onde você deseja registrar o comando aqui

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const commands = [
  {
    name: 'calcular',
    description: 'Realiza cálculos matemáticos',
    type: 1,
    options: [
      {
        name: 'expressao',
        description: 'A expressão matemática a ser calculada',
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
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), // Corrija aqui
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

  if (commandName === 'calcular') {
    const expressao = options.getString('expressao');

    try {
      const resultado = math.evaluate(expressao);
      await interaction.reply(`Resultado: ${resultado}`);
    } catch (error) {
      await interaction.reply('Erro ao avaliar a expressão.');
    }
  }
});

client.login(TOKEN);
