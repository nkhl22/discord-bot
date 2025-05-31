const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketsetup")
    .setDescription("Setup tombol ticket support"),

  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("create_ticket")
        .setLabel("🎫 Buat Ticket")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: "Klik tombol di bawah untuk membuka ticket.",
      components: [row]
    });
  }
};
