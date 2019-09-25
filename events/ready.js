module.exports = async client => {
  const web = require('../web/site.js');
  client.logger.log(`${client.user.tag}\n${client.users.size} users \n${client.guilds.size} servers.`, "ready");
  web();
  client.user.setActivity(`for ${client.config.prefix}help`, {type: "WATCHING"});
};
