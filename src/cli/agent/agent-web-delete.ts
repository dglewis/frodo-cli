import { Command, Option } from 'commander';
import { Authenticate, Agent, state } from '@rockcarver/frodo-lib';
import * as common from '../cmd_common.js';
import { printMessage, verboseMessage } from '../../utils/Console.js';

const { getTokens } = Authenticate;
const { deleteWebAgent, deleteWebAgents } = Agent;

const program = new Command('frodo agent web delete');

program
  .description('Delete web agents.')
  .helpOption('-h, --help', 'Help')
  .showHelpAfterError()
  .addArgument(common.hostArgument)
  .addArgument(common.realmArgument)
  .addArgument(common.usernameArgument)
  .addArgument(common.passwordArgument)
  .addOption(common.deploymentOption)
  .addOption(common.insecureOption)
  .addOption(common.verboseOption)
  .addOption(common.debugOption)
  .addOption(common.curlirizeOption)
  .addOption(
    new Option(
      '-i, --agent-id <agent-id>',
      'Agent id. If specified, -a and -A are ignored.'
    )
  )
  .addOption(new Option('-a, --all', 'Delete all web agents. Ignored with -i.'))
  .action(
    // implement command logic inside action handler
    async (host, realm, user, password, options) => {
      state.default.session.setTenant(host);
      state.default.session.setRealm(realm);
      state.default.session.setUsername(user);
      state.default.session.setPassword(password);
      state.default.session.setDeploymentType(options.type);
      state.default.session.setAllowInsecureConnection(options.insecure);
      state.default.session.setVerbose(options.verbose);
      state.default.session.setDebug(options.debug);
      state.default.session.setCurlirize(options.curlirize);
      if (await getTokens()) {
        // delete by id
        if (options.agentId) {
          verboseMessage(
            `Deleting agent '${
              options.agentId
            }' in realm "${state.default.session.getRealm()}"...`
          );
          try {
            await deleteWebAgent(options.agentId);
          } catch (error) {
            printMessage(error.message, 'error');
            process.exitCode = 1;
            return;
          }
        }
        // --all -a
        else if (options.all) {
          verboseMessage('Deleting all agents...');
          try {
            await deleteWebAgents();
          } catch (error) {
            printMessage(error.message, 'error');
            process.exitCode = 1;
            return;
          }
        }
        // unrecognized combination of options or no options
        else {
          verboseMessage(
            'Unrecognized combination of options or no options...'
          );
          program.help();
        }
      }
    }
    // end command logic inside action handler
  );

program.parse();
