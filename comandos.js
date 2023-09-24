const { SlashCommandBuilder } = require('@discordjs/builders');

const resolverCommand = new SlashCommandBuilder()
  .setName('resolver')
  .setDescription('Resolve uma expressão matemática.')
  .addStringOption((option) =>
    option
      .setName('expressao')
      .setDescription('A expressão matemática a ser resolvida.')
      .setRequired(true)
  )
  .toJSON();

module.exports = {
  resolverCommand,
};
