exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send("Pinging...");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "Check the latency of the bot.",
  usage: "ping"
};
