"use strict";

module.exports = {
  meta: {
    docs: {
      description: "Prevent usage of non native animation in React Native",
      category: "Performance",
      recommended: true
    },
    fixable: null,
    schema: []
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
          // this would be caught by typing with flow or ts, ignoring
          return;
        }

        const animationConfigAsMap = animationConfig.properties.reduce(
          (aggregator, property) => ({ ...aggregator, [property.key.name]: property.value.value }),
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
