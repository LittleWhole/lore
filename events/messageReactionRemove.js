/* MESSAGE_REACTION_REMOVE Event
   For role menus. */
   
module.exports = async (client, messageReaction, user) => {
  // Debug. Will be removed when actual content is added to this event.
  client.logger.log(messageReaction);
  client.logger.log(user);
}
