/**
 * @fileoverview Prevent usage of uncast value in react JSX
 * @author almouro
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/no-new-date");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = {
  parser: "babel-eslint"
};

require("babel-eslint");

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run("react-only-native-animation", rule, {
  valid: [`new Yolo()`, `new Date()`, `new Date(2015)`],

  invalid: [
    {
      code: `new Date("2014-04-24")`,
      errors: [
        {
          message:
            "new Date(string) is not compatible with RN JS engine (with debugger disabled). Prefer using parse from date-fns for instance",
          type: "ExpressionStatement"
        }
      ]
    }
  ]
});
