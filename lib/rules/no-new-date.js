/**
 * @fileoverview Prevent usage of new Date(string) in React Native
 * @author almouro
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Prevent usage of new Date(string) in React Native",
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
