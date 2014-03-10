/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2014 eBay Software Foundation                                │
│                                                                             │
│hh ,'""`.                                                                    │
│  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
│  |(@)(@)|  you may not use this file except in compliance with the License. │
│  )  __  (  You may obtain a copy of the License at                          │
│ /,'))((`.\                                                                  │
│(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
│ `\ `)(' /'                                                                  │
│                                                                             │
│   Unless required by applicable law or agreed to in writing, software       │
│   distributed under the License is distributed on an "AS IS" BASIS,         │
│   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
│   See the License for the specific language governing permissions and       │
│   limitations under the License.                                            │
\*───────────────────────────────────────────────────────────────────────────*/
'use strict';


var chalk = require('chalk');


module.exports = function banner() {
    console.log('');
    console.log(chalk.blue('     ,\'""`. '));
    console.log(chalk.blue('hh  / _  _ \\'));
    console.log(chalk.blue('    |(@)(@)|  '), chalk.white.bold('Release the Kraken!'));
    console.log(chalk.blue('    )  __  ('));
    console.log(chalk.blue('   /,\'))((`.\\ '));
    console.log(chalk.blue('  (( ((  )) ))'));
    console.log(chalk.blue('   `\\ `)(\' /\''));
    console.log('');
    console.log('Tell me a bit about your application:');
    console.log('');
};
