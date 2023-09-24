const { Client, GatewayIntentBits, REST, Permissions } = require('discord.js');
const { Routes } = require('discord-api-types/v9');

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
    name: 'limpar',
    description: 'Limpa mensagens em um canal',
    type: 1,
    options: [
      {
        name: 'modo',
        description: 'Modo de limpeza',
        type: 3,
        required: true,
        choices: [
          {
            name: 'Todas',
            value: 'todas',
          },
          {
            name: 'Por Usuário',
            value: 'usuario',
          },
        ],
      },
      {
        name: 'usuario',
        description: 'Usuário para limpar mensagens (somente no modo "Por Usuário")',
        type: 6,
        required: false,
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

  if (commandName === 'limpar') {
    const modo = options.getString('modo');
    const usuario = options.getUser('usuario');

    if (modo === 'todas') {
      const channel = interaction.channel;
      const fetched = await channel.messages.fetch({ limit: 100 });
      channel.bulkDelete(fetched);
    } else if (modo === 'usuario' && usuario) {
      const channel = interaction.channel;
      const fetched = await channel.messages.fetch({ limit: 100 });
      const mensagensDoUsuario = fetched.filter((msg) => msg.author.id === usuario.id);
      channel.bulkDelete(mensagensDoUsuario);
    } else {
      interaction.reply('Modo inválido ou usuário não especificado.');
    }
  }
});

client.login(TOKEN);
