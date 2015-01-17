import Agent from './agent'

function randInt(max) { 
  return ~~(Math.random() * max); 
}

export default class Universe {
  constructor(seed) {
    this.WIDTH = 10;
    this.HEIGHT= 10;
    // . . . .
    //.X   X
    //.
    //.X   X
    //.


    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
   
    this.occupied = {}; 
    this.agents = [];
    for (var i = 0 ; i < this.HEIGHT ; i ++) {
      let row = [];
      row.length = this.WIDTH;
      this.agents.push(row);
    }

    for (var i = 0 ; i < seed ; i++) {
      let row = randInt(this.HEIGHT);
      let col = randInt(this.WIDTH);
      if (this.get(row,col) !== undefined) {
        i -= .9 // Try again, but prevent infinite loops.
        continue;
      }
      
      let senses = this.getSenses(row, col);
      let agent = new Agent();
      agent.learn(senses, {up:0, down:0, left:0, right:0, idle:0, fight:0, breed:0});
      this.set(row, col, agent);
    }
  }

  rem(row, col) {
    this.agents[row][col] = undefined;
    delete this.occupied[[row,col]]

    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(col, row, 1, 1);
  }

  get(row, col) {
    if (row >= this.HEIGHT) row -= this.HEIGHT;
    if (col >= this.WIDTH) col -= this.WIDTH;
    if (row <0) row += this.HEIGHT;
    if (col <0) col += this.WIDTH;
    return this.agents[row][col];
  }

  set(row, col, agent) {
    if (agent === undefined)
      return rem(row, col);
    
    if (row <0) row += this.HEIGHT;
    if (col <0) col += this.WIDTH;
    if (row >= this.HEIGHT) row -= this.HEIGHT;
    if (col >= this.WIDTH) col -= this.WIDTH;

    this.agents[row][col] = agent;
    this.occupied[[row,col]] = [row,col];
    
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(col, row, 1, 1);
  }

  randomAgent() {
    var keys = Object.keys(this.occupied);
    var loc = this.occupied[keys[randInt(keys.length)]];
    var agent = this.get(loc[0],loc[1]);
    return [agent, loc];
  }

  advanceRandomAgent() {
    var tmp = this.randomAgent();
    var agent = tmp[0];
    var loc = tmp[1];

    var senses = this.getSenses(loc[0], loc[1]);
    var action = agent.step(senses);
    var feedback = this.performAction(agent, action, loc);

    agent.learn(senses, action, feedback);
  }

  getSenses(row, col) {
    var neighbors = [];
    var R = 1;
    for(var drow = -R ; drow <= R ; drow ++) 
    for(var dcol = -R ; dcol <= R ; dcol ++) {
      if(drow == dcol && drow == 0)
        continue;
      var agent = this.get(row + drow, col + dcol);
      if (agent === undefined) 
        neighbors = neighbors.concat([0]);//[0,0,0]);
      else
        neighbors = neighbors.concat(agent.sense());
    }
    return neighbors.concat([row, col, Math.random(), 1]); 
  }

  performAction(agent, action, loc) {
    /* Given the output from an agent, perform the action they want to do
     */
    var best = "up";
    if (action.down > action[best]) best = "down";
    if (action.left > action[best]) best = "left";
    if (action.right > action[best]) best = "right";
    if (action.idle > action[best]) best = "idle";
    
    var conflict = "fight";
    if (action.breed > action.fight) conflict = "breed";

    
    //console.log("Perform action:", agent, action, best, conflict, loc);

    var row = loc[0], col = loc[1];
    switch(best) {
      case "up": row -= 1; break;
      case "down": row += 1; break;
      case "left": col -= 1; break;
      case "right": col += 1; break;
    }
    
    if (best === "idle"){
      this.ctx.fillStyle = "#0F0";
      this.ctx.fillRect(col, row, 1,1);
      return 1;
    }

    var cell = this.get(row, col);
    if (cell === undefined) {
      this.rem(loc[0], loc[1]);
      this.set(row, col, agent);


      // Feedback - train them to stay away from other agents.
      /*let neighbors = 0;
      if (this.get(row-1, col+1) !== undefined) neighbors ++;
      if (this.get(row-1, col) !== undefined) neighbors ++;
      if (this.get(row-1, col-1) !== undefined) neighbors ++;
      if (this.get(row, col+1) !== undefined) neighbors ++;
      if (this.get(row, col-1) !== undefined) neighbors ++;
      if (this.get(row+1, col+1) !== undefined) neighbors ++;
      if (this.get(row+1, col) !== undefined) neighbors ++;
      if (this.get(row+1, col-1) !== undefined) neighbors ++;
      
      if (neighbors) {
      }
      return neighbors == 0? 1: 0;*/
    }
    return Math.random()*.02 - .01;
  }
}
