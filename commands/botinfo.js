const Discord = require('discord.js');
const ms = require('ms');
const os = require('os');
const worker = require("core-worker");

exports.run = async (client, message, args, level) => {
    const npmv = await worker.process("npm -v").death();
    let stats = new Discord.MessageEmbed()
    .setTitle("`Lore Statistics`")
    .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Swap Partition Size", `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("Uptime", ms(client.uptime), true)
    .addField("Users", client.users.size, true)
    .addField("Servers", client.guilds.size, true)
    .addField("Channels", client.channels.size, true)
    .addField("Emojis", client.emojis.size, true)
    .addField("Library", "discord.js", true)
    .addField("Library Version", `v${Discord.version}`, true)
    .addField("Bot Created", client.user.createdAt, true)
    .addField("Node Version", process.version, true)
    .addField("NPM Version", npmv.data.replace("\n", ""), true)
    .addField('OS', `${os.platform()} (${process.arch})`, true)
    .setColor(message.settings.color)
    .setTimestamp();
    message.channel.send({ embed: stats })  
};
    
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User"
    };
    
    exports.help = {
      name: "botinfo",
      description: "Provides some information about this bot.",
      usage: "",
      category: "Information"
    };
