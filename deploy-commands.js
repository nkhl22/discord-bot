const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");
const config = require("./config.json");

// Load semua command dari folder
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[WARNING] Command di ${filePath} tidak valid.`);
  }
}

// Setup REST client
const rest = new REST().setToken(config.token);

// Deploy ke Guild (langsung muncul)
(async () => {
  try {
    console.log("🚀 Mengupdate (dan menimpa) semua slash command...");

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );

    console.log("✅ Semua slash command berhasil didaftarkan ke GUILD.");
  } catch (error) {
    console.error("❌ Gagal deploy:", error);
  }
})();
