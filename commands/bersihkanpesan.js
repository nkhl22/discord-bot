const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const hasPermission = require("../utils/hasPermission");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bersihkanpesan")
    .setDescription("Hapus 100 pesan terakhir"),

  async execute(interaction) {
    if (!hasPermission(interaction.member)) {
      return interaction.reply({ content: "❌ Tidak ada izin.", ephemeral: true });
    }

    await interaction.channel.bulkDelete(100, true);
    await interaction.reply({ content: "✅ 100 pesan terakhir dihapus!", ephemeral: true });
  }
};
