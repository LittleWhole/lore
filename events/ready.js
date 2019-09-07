module.exports = async client => {
  client.logger.log(`${client.user.tag}\n${client.users.size} users \n${client.guilds.size} servers.`, "ready");

  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
};
