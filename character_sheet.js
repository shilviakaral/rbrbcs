Hooks.on('renderActorSheet', (app, html, data) => {
    // Get the character data from the sheet
    const actorData = data.actor.data;
  
    // Update the character's name on the sheet
    const nameField = html.find('.name input');
    nameField.val(actorData.name);
  
    // Update the character's attributes on the sheet
    const attributes = actorData.attributes;
    html.find('.might .value input').val(attributes.might);
    html.find('.grace .value input').val(attributes.grace);
    html.find('.speed .value input').val(attributes.speed);
    html.find('.intellect .value input').val(attributes.intellect);
  
    // Update the character's defenses on the sheet
    const defenses = actorData.defenses;
    html.find('.block .value input').val(defenses.block);
    html.find('.dodge .value input').val(defenses.dodge);
    html.find('.parry .value input').val(defenses.parry);
  
    // Update the character's skills on the sheet
    const skills = actorData.skills;
    html.find('.skill').each((index, element) => {
      const skillName = $(element).find('.name').text();
      const skillValue = skills[skillName];
      $(element).find('.value input').val(skillValue);
    });
  
    // Add a listener for the "Roll" button
    html.find('.roll-button').click(() => {
      // Get the skill name from the input field
      const skillName = html.find('.skill-input').val();
  
      // Get the skill rank from the character data
      const skillRank = actorData.skills[skillName];
  
      // Roll the dice and get the result
      let result;
      if (skillRank > 0) {
        // If the character has ranks in the skill, roll skillRank d10s
        const rolls = new Roll(`${skillRank}d10`).roll().rolls;
        result = rolls.reduce((acc, roll) => {
          return Math.max(acc, roll.total);
        }, 0);
      } else {
        // If the character has no ranks in the skill, roll 2d10 and take the lower roll
        const rolls = new Roll(`2d10`).roll().rolls;
        result = rolls.reduce((acc, roll) => {
          return Math.min(acc, roll.total);
        }, 20);
      }
  
      // Display the result on the sheet
      html.find('.roll-result').text(result);
    });
  });
  