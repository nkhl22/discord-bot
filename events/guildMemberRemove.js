// guildMemberRemove.js
const config = require("../config.json");

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (channel) channel.send(`😢 <@${member.id}> telah keluar dari server.`);
  }
};
