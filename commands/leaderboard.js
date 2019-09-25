exports.run = (client, message, args, level) => {
  const sql = client.dependencies.sql;
  const Discord = client.dependencies.discord;
  if (!args[0]) args[0] = 10;
  if (parseInt(args[0]) > 20) args[0] = 20;
  const top = sql.prepare(`SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT ${args[0]};`).all(message.guild.id);
 
  const embed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription(`Leaderboard: Top ${args[0]} Users by XP`)
    .setColor(client.config.color);
  let i = 0;
  for(const data of top) {
    i++;
    embed.addField(`#${i} ${client.users.get(data.user).tag}`, `**Level ${data.level}** | ${data.points} XP`);
  }
  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lb", "xplb"],
  permLevel: "User"
};

exports.help = {
  name: "leaderboard",
  category: "Leveling & Stats",
  description: "Check top x people with most XP",
  usage: "leaderboard"
};
