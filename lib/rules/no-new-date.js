"use strict";

module.exports = {
  meta: {
    docs: {
      description: "Prevent usage of new Date(string) in React Native",
      category: "Possible Errors",
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create(context) {
    return {
      ExpressionStatement(node) {
        const expression = node.expression;

        const isNewDate = expression.type === "NewExpression" && expression.callee.name === "Date";
        const args = expression.arguments;

        if (isNewDate && args.length > 0) {
          if (typeof args[0].value === "string") {
            context.report(
              node,
              "new Date(string) is not compatible with RN JS engine (with debugger disabled). Prefer using parse from date-fns for instance"
            );
          }
        }
      }
    };
  }
};
