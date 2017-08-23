
function Plan(id, venue, assistants, createdAt) {

  assistants = assistants || [];

  this.id = function() {
    return id;
  };

  this.venue = function() {
    return venue
  };

  this.assistants = function() {
    return assistants;
  };

  this.createdAt = function() {
    return createdAt;
  };

}

module.exports = Plan;
