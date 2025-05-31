const { SlashCommandBuilder } = require("discord.js");
const config = require("../config.json");
const hasPermission = require("../utils/hasPermission");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pengumuman")
    .setDescription("Kirim pengumuman")
    .addStringOption(opt => opt.setName("pesan").setDescription("Isi pesan").setRequired(true)),

  async execute(interaction) {
    if (!hasPermission(interaction.member)) {
      return interaction.reply({ content: "❌ Tidak ada izin.", ephemeral: true });
    }

    const pesan = interaction.options.getString("pesan");
    const channel = await interaction.guild.channels.fetch(config.announcementChannelId);
    await channel.send(pesan);
    await interaction.reply({ content: "✅ Pengumuman dikirim!", ephemeral: true });
  }
};
