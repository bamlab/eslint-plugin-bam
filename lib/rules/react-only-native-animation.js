/**
 * @fileoverview Prevent usage of non native animation in React Native
 * @author almouro
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Prevent usage of non native animation in React Native",
      category: "Fill me in",
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create(context) {
    return {
      ExpressionStatement(node) {
        const expression = node.expression;

        const isAnimatedEvent =
          expression.type === "CallExpression" &&
          expression.callee.object &&
          expression.callee.property &&
          expression.callee.object.name === "Animated" &&
          expression.callee.property.name === "event";

        if (!isAnimatedEvent) return;

        const args = expression.arguments;

        if (args.length !== 2) {
          context.report(
            node,
            "Please use the native driver for your animation for performance purposes. See https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated"
          );
          return;
        }

        const animationConfig = args[1];

        if (animationConfig.type !== "ObjectExpression") {
          context.report(node, "Second argument of Animated.event should be an object");
          return;
        }

        const animationConfigAsMap = animationConfig.properties.reduce(
          (aggregator, property) =>
            Object.assign({}, aggregator, {
              [property.key.name]: property.value.value
            }),
          {}
        );

        if (!animationConfigAsMap.useNativeDriver) {
          context.report(
            node,
            "Please use the native driver for your animation for performance purposes. See https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated"
          );
        }
      }
    };
  }
};
