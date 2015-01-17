System.registerModule("js/test", [], function() {
  "use strict";
  var __moduleName = "js/test";
  var foo = "bar";
  return {get foo() {
      return foo;
    }};
});
System.registerModule("js/main.js", [], function() {
  "use strict";
  var __moduleName = "js/main.js";
  var foo = System.get("js/test").foo;
  console.log("A");
  console.log(foo);
  console.log(System);
  return {};
});
System.get("js/main.js" + '');
