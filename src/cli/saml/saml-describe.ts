import { state } from '@rockcarver/frodo-lib';
import { Option } from 'commander';

import { getTokens } from '../../ops/AuthenticateOps';
import { describeSaml2Provider } from '../../ops/Saml2Ops';
import { verboseMessage } from '../../utils/Console';
import { FrodoCommand } from '../FrodoCommand';

export default function setup() {
  const program = new FrodoCommand('frodo saml describe');

  program
    .description('Describe the configuration of an entity provider.')
    .addOption(new Option('-i, --entity-id <entity-id>', 'Entity id.'))
    .action(
      // implement command logic inside action handler
      async (host, realm, user, password, options, command) => {
        command.handleDefaultArgsAndOpts(
          host,
          realm,
          user,
          password,
          options,
          command
        );
        if (await getTokens()) {
          verboseMessage(
            `Describing SAML entity provider ${
              options.entityId
            } in realm "${state.getRealm()}"...`
          );
          const outcome = await describeSaml2Provider(options.entityId);
          if (!outcome) process.exitCode = 1;
        } else {
          process.exitCode = 1;
        }
      }
      // end command logic inside action handler
    );

  return program;
}
