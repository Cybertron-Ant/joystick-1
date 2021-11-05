import create from './create/index.js';
import start from './start/index.js';
import build from './build/index.js';
// import deploy from './deploy/index.js';

const [_node, _bin, ...rawArgs] = process.argv;

export default {
  create: {
    set: !!rawArgs.includes('create'),
    description: 'Create a new Joystick app.',
    args: {
      name: {
        set: !!rawArgs.includes('create') && !!rawArgs[rawArgs.indexOf('create') + 1],
        value: !!rawArgs.includes('create') && rawArgs[rawArgs.indexOf('create') + 1],
        description: 'The name of the app to create.',
      },
    },
    options: {},
    function: create,
  },
  start: {
    set: !!rawArgs.includes('start'),
    description: 'Start an existing Joystick app.',
    args: {},
    options: {
      environment: {
        flags: {
          '-e': {
            set: !!rawArgs.includes('-e'),
            value: !!rawArgs.includes('-e') && rawArgs[rawArgs.indexOf('-e') + 1],
          },
          '--environment': {
            set: !!rawArgs.includes('--environment'),
            value: !!rawArgs.includes('--environment') && rawArgs[rawArgs.indexOf('--environment') + 1],
          },
        },
        description: 'Environment to set for process.env.NODE_ENV.',
      },
      port: {
        flags: {
          '-p': {
            set: !!rawArgs.includes('-p'),
            value: !!rawArgs.includes('-p') && parseInt(rawArgs[rawArgs.indexOf('-p') + 1], 10),
          },
          '--port': {
            set: !!rawArgs.includes('--port'),
            value: !!rawArgs.includes('--port') && parseInt(rawArgs[rawArgs.indexOf('--port') + 1], 10),
          },
        },
        description: 'Port number to run the app on.',
      }
    },
    function: start,
  },
  build: {
    set: !!rawArgs.includes('build'),
    description: 'Build an existing Joystick app.',
    args: {},
    options: {},
    function: build,
  },
  // deploy: {
  //   set: !!rawArgs.includes('deploy'),
  //   description: 'Deploy an existing Joystick app.',
  //   args: {
  //     domain: {
  //       set: !!rawArgs.includes('deploy') && !!rawArgs[rawArgs.indexOf('deploy') + 1],
  //       value: !!rawArgs.includes('deploy') && rawArgs[rawArgs.indexOf('deploy') + 1],
  //       description: 'The domain to deploy the app to.',
  //     },
  //   },
  //   options: {
  //     token: {
  //       flags: {
  //         '-t': {
  //           set: !!rawArgs.includes('-t'),
  //           value: !!rawArgs.includes('-t') && rawArgs[rawArgs.indexOf('-t') + 1],
  //         },
  //         '--token': {
  //           set: !!rawArgs.includes('--token'),
  //           value: !!rawArgs.includes('--token') && rawArgs[rawArgs.indexOf('--token') + 1],
  //         },
  //       },
  //       description: 'Your domain\'s deployment token from the cheatcode.co/apps dashboard.',
  //     },
  //   },
  //   function: deploy,
  // }
};