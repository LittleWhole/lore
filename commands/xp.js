exports.run = (client, message, args, level) => {
  let score = client.getScore.get(message.author.id, message.guild.id);
  var Discord = client.dependencies.discord;
  
  let embed = new Discord.MessageEmbed()
  .setTitle(`${message.author.username}'s XP Stats`)
  .addField("Level", score.level, true)
  .addField("XP", score.points, true)
  .setColor(client.config.color)
  .setTimestamp();
  message.channel.send({ embed: embed });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["level", "xp", "experience"],
  permLevel: "User"
};

exports.help = {
  name: "xp",
  category: "Leveling & Stats",
  description: "Check your XP and experience level.",
  usage: "xp"
};
