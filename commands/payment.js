const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const hasPermission = require("../utils/hasPermission");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("payment")
    .setDescription("Menampilkan informasi pembayaran"),

  async execute(interaction) {
    if (!hasPermission(interaction.member)) {
      return interaction.reply({
        content: "❌ Kamu tidak memiliki izin untuk menggunakan perintah ini.",
        ephemeral: false
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#00B0F4")
      .setTitle("💰 Informasi Pembayaran")
      .setThumbnail("https://cdn.discordapp.com/emojis/1130283968889497660.webp") // (Opsional: emoji/ikon dompet)
      .addFields(
        { name: "***🏦 BANK***", value: "**BCA**", inline: true },
        { name: "***📄 Nomor Rekening***", value: "`0311416501`", inline: true },
        { name: "👤 Atas Nama", value: "**NASIKHUL UMAM (READY)**", inline: false },

        { name: "💳 E-WALLET", value: "**DANA / GOPAY**", inline: true },
        { name: "📱 Nomor", value: "`0856-0156-8401`", inline: true },
        { name: "👤 Atas Nama", value: "**NASIKHUL UMAM**", inline: false },

        {
          name: "✅ Konfirmasi",
          value: "Silakan **kirim satu bukti transfer** untuk memvalidasi pembayaran Anda kepada admin/support.",
          inline: false
        }
      )
      .setFooter({ text: "Nakuma Payment System", iconURL: "https://img.icons8.com/ios-filled/50/money.png" })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      ephemeral: false
    });
  }
};
