export default class Agent {
  constructor(parentAgent) {
    this.brain = parentAgent ? parentAgent.brain : new brain.NeuralNetwork({
      hiddenLayers:[1],
    });
    this.health = 1;
    this.attack = .1;
  }

  step(senses) {
    return this.brain.run(senses);
  }

  learn(senses, action, feedback) {
    if (feedback === 0) return;
    for (var key in action) {
      action[key] *= feedback;
    }
    this.brain.train([{
      input: senses,
      output: action}], 
      {iterations:100000 * feedback * feedback}); // perhaps iterations = K * abs(feedback)? 
  }
  
  sense() {
    return [1]; // [this.health, this.attack, 1];  
  }
}


