// vim: syntax=javascript17
//
// to train an agent:
// senses = universe.getSenses(this)
// action = this.net.run(senses)
// feedback = universe.act(this, action)
//
// feedback should be between -1 and 1
// this.net.train([{
//   input: senses
//   output: scale(action, feedback) // Learn to repeat or do the opposite.
// }]);
//
// feedback could just be (health1 - health0)
// healthN is betwene 0 and 1
//
//Universe:
//  addAgent(agent)
//    Add agent to the universes agent set
//  advanceRandomAgent()
//    Have a random agent in the universe perofmr an action
// 
//Agent:
//  step(senses) -> actions
//

import Universe from './universe'

var universe = window.universe = new Universe(10);
var agent = window.agent = universe.randomAgent()[0];
console.log(agent);
//universe.advanceRandomAgent();

var interval = setInterval(universe.advanceRandomAgent.bind(universe), 1);
window.stop = function() { clearInterval(interval); }


