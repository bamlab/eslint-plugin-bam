/**
 * @fileoverview Prevent react/react-native bugs encountered
 * @author AmauryLiet
 */
'use strict';


//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
  rules: {
    'no-react-unbound': require('./rules/no-react-unbound'),
    'no-react-uncast-to-boolean': require('./rules/no-react-uncast-to-boolean'),
  },
  configs: {
    recommended: {
      rules: {
        'bam/no-react-unbound': 'error',
        'bam/no-react-uncast-to-boolean': 'error',
      },
    },
  },
};
