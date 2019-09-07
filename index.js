// Discord
const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true });

// Config + fs library
const config = require("./config.json");
const fs = require("fs");

// Load commands
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  files.forEach(file => {
    let props = require(`./commands/${file}`);
    client.commands.set(props.help.name, props);
  });
});

// Load events
fs.readdir("./events/", (err, eventFiles) => {
  if (err) console.error(err);
  eventFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    event(client, config);
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.on("error", console.error);
client.on("warn", console.warn);

client.login(config.token);

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.commands.set(command, cmd);
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.permissions = (message, override) => {
  if (override) return override;
  let permLevel;
  if (permLevel >= 10) return permLevel;
  permLevel = 0; // Member
  if (message.member.hasPermission('MANAGE_ROLES')) permLevel = 1; // Moderator
  if (message.member.hasPermission('ADMINISTRATOR')) permLevel = 2; // Admin
  if (message.author.id === "230880116035551233") permLevel = 99; // Developer
  return permLevel;
};

