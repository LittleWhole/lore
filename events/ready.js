module.exports = async client => {
  client.logger.log(`${client.user.tag}\n${client.users.size} users \n${client.guilds.size} servers.`, "ready");

  client.user.setActivity(`for ${client.config.prefix}help`, {type: "WATCHING"});
};
