
var uuid5 = require('uuid5');

function Plan(id, venue, assistants, createdAt) {

  assistants = assistants || [];
  createdAt = createdAt instanceof Date ? createdAt : new Date();
  id = id || uuid5(createdAt.toString());

  this.id = function() {
    return id;
  };

  this.venue = function() {
    return venue
  };

  this.assistants = function() {
    return assistants;
  };

  this.addAssistant = function(userId) {
    if (-1 < assistants.indexOf(userId)) {
      return;
    }

    assistants.push(userId);
  };

  this.removeAssistant = function (userId) {
    var pos = assistants.indexOf(userId);

    assistants.splice(pos, 1);
  };

  this.createdAt = function() {
    return createdAt.toISOString();
  };

}

module.exports = Plan;
