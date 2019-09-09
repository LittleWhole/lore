/* MESSAGE_REACTION_REMOVE_ALL Event
   For role menus.
   If this event is triggered on a RoleMenu, a super bad
   error happened. */
   
module.exports = async (client, message) => {
  if (message.channel.id === "620576094772396044") {
    console.log("Super bad error happened. Please fix this promptly. All reactions were removed from a RoleMenu.");
  }
}
