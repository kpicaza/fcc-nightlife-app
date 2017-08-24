'use strict';

function AssistToPlan(repository) {

  this.action = function (req, res) {

    repository.assist(
      req.params.id,
      req.body.venueId,
      req.user.id()
    ).then(function (plan) {
      res.json({
        nbrAssistants: plan.assistants().length
      });
    }).catch(function (e) {
      console.error(e);

      res.status(400).send(e.message);
    });

  };

}

module.exports = AssistToPlan;
