/**
 * @fileoverview Prevent usage of uncast value in react JSX
 * @author almouro
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/react-only-native-animation");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = {
  parser: "babel-eslint"
};

require("babel-eslint");

var ruleTester = new RuleTester({ parserOptions });
ruleTester.run("react-only-native-animation", rule, {
  valid: [
    `Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
    useNativeDriver: true,
    listener: onScroll
  });`,
    `Animated.timing()`
  ],

  invalid: [
    {
      code: `Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
        useNativeDriver: false,
        listener: onScroll
      });`,
      errors: [
        {
          message:
            "Please use the native driver for your animation for performance purposes. See https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated",
          type: "ExpressionStatement"
        }
      ]
    },
    {
      code: `Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
        listener: onScroll
      });`,
      errors: [
        {
          message:
            "Please use the native driver for your animation for performance purposes. See https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated",
          type: "ExpressionStatement"
        }
      ]
    },
    {
      code: `Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]);`,
      errors: [
        {
          message:
            "Please use the native driver for your animation for performance purposes. See https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated",
          type: "ExpressionStatement"
        }
      ]
    },
    {
      code: `Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], "not an object");`,
      errors: [
        {
          message: "Second argument of Animated.event should be an object",
          type: "ExpressionStatement"
        }
      ]
    }
  ]
});
