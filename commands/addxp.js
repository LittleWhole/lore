exports.run = (client, message, args, level) => {
  if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
 
  const user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");
 
  const pointsToAdd = parseInt(args[1], 10);
  if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")
 
  let userscore = client.getScore.get(user.id, message.guild.id);
  if (!userscore) {
    userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
  }
  userscore.points += pointsToAdd;
 
  // Update level
  let userLevel = Math.floor(0.1 * Math.sqrt(userscore.points)) + 1;
  userscore.level = userLevel;
 
  client.setScore.run(userscore);
 
  return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "addxp",
  category: "Leveling & Stats",
  description: "Add to a user's XP. Input a negative number to subtract.",
  usage: "addxp <UserResolvable> <xp>"
};
