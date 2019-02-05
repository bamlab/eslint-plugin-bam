/**
 * @fileoverview Prevent react/react-native bugs encountered
 * @author AmauryLiet
 */
"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
  rules: {
    "no-react-unbound": require("./rules/no-react-unbound"),
    "no-react-uncast-to-boolean": require("./rules/no-react-uncast-to-boolean"),
    "react-only-native-animation": require("./rules/react-only-native-animation"),
    "no-new-date": require("./rules/no-new-date")
  },
  configs: {
    recommended: {
      rules: {
        "bam/no-react-unbound": "error",
        "bam/no-react-uncast-to-boolean": "error",
        "bam/react-only-native-animation": "error",
        "bam/no-new-date": "error"
      }
    }
  }
};
