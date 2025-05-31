module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({ content: "❌ Error saat eksekusi.", ephemeral: true });
      }
    }

    // Tombol ticket
    if (interaction.isButton() && interaction.customId === "create_ticket") {
      const existing = interaction.guild.channels.cache.find(c =>
        c.name === `ticket-${interaction.user.username.toLowerCase()}`
      );
      if (existing) return interaction.reply({ content: "Kamu sudah punya ticket!", ephemeral: true });

      const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        permissionOverwrites: [
          { id: interaction.guild.roles.everyone, deny: ["ViewChannel"] },
          { id: interaction.user.id, allow: ["ViewChannel", "SendMessages"] },
          { id: client.user.id, allow: ["ViewChannel", "SendMessages"] }
        ]
      });

      await channel.send(`🎫 Halo <@${interaction.user.id}>, silakan sampaikan kendala kamu.`);
      await interaction.reply({ content: `✅ Ticket dibuat: ${channel}`, ephemeral: true });
    }
  }
};
