const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repp')
    .setDescription('Kirim testimoni untuk produk')
    .addStringOption(option =>
      option.setName('pesan')
        .setDescription('Isi pesan testimoni')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('product')
        .setDescription('Nama produk')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('rate')
        .setDescription('Rating bintang (1–5)')
        .setRequired(true)
        .addChoices(
          { name: '⭐', value: 1 },
          { name: '⭐⭐', value: 2 },
          { name: '⭐⭐⭐', value: 3 },
          { name: '⭐⭐⭐⭐', value: 4 },
          { name: '⭐⭐⭐⭐⭐', value: 5 },
        )),
  async execute(interaction) {
    const pesan = interaction.options.getString('pesan');
    const product = interaction.options.getString('product');
    const rate = interaction.options.getInteger('rate');

    const bintang = '⭐'.repeat(rate);

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('📝 Testimoni Baru')
      .addFields(
        { name: '**Dari**', value: `<@${interaction.user.id}>`, inline: true },
        { name: '**Produk**', value: product, inline: true },
        { name: '**Rating**', value: bintang, inline: true },
        { name: '**Pesan**', value: pesan }
      )
      .setTimestamp();

    try {
      // Ganti '1378274598222692433' dengan ID saluran tujuan Anda
      const channel = await interaction.client.channels.fetch('1378274598222692433');

      // Pastikan saluran adalah saluran teks
      if (!channel || channel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: '❌ Saluran testimoni tidak ditemukan atau bukan saluran teks.', ephemeral: true });
      }

      // Kirim embed ke saluran testimoni
      await channel.send({ embeds: [embed] });

      // Beri tahu pengguna bahwa testimoni telah dikirim
      await interaction.reply({ content: '✅ Testimoni berhasil dikirim ke saluran testimoni.', ephemeral: true });
    } catch (error) {
      console.error('❌ Gagal mengirim testimoni:', error);
      await interaction.reply({ content: '❌ Terjadi kesalahan saat mengirim testimoni.', ephemeral: true });
    }
  },
};
