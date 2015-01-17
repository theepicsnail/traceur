/*test*/
import {foo} from 'foo';


class Greeter {
  constructor(message) {
    this.message = message;
  }

  greet() {
    let element = document.querySelector('#message');
    element.textContent = this.message;
  }
}

let greeter = new Greeter('Hello Worl!');
greeter.greet();


let canvas = document.querySelector('#canvas');
canvas.width=10;
canvas.height=10;

let ctx = canvas.getContext('2d');
ctx.fillStyle = "#000";
ctx.fillRect(0,0,1,1);
ctx.fillStyle = "#F00";
ctx.fillRect(foo, foo, 1, 1);
