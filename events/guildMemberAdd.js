// guildMemberAdd.js
const config = require("../config.json");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (channel) channel.send(`👋 Selamat datang, <@${member.id}>!`);
    const role = member.guild.roles.cache.get(config.autoRoleId);
    if (role) member.roles.add(role).catch(console.error);
  }
};
