import { FrodoCommand } from '../FrodoCommand';
import { Option } from 'commander';
import { frodo } from '@rockcarver/frodo-lib';
import { verboseMessage } from '../../utils/Console';
import {
  importFirstResourceTypeFromFile,
  importResourceTypeByNameFromFile,
  importResourceTypeFromFile,
  importResourceTypesFromFile,
  importResourceTypesFromFiles,
} from '../../ops/ResourceTypeOps';

const program = new FrodoCommand('frodo authz type import');

program
  .description('Import authorization resource types.')
  .addOption(
    new Option(
      '-i, --type-id <type-uuid>',
      'Resource type uuid. If specified, -a and -A are ignored.'
    )
  )
  .addOption(
    new Option(
      '-n, --type-name <type-name>',
      'Resource type name. If specified, -a and -A are ignored.'
    )
  )
  .addOption(new Option('-f, --file <file>', 'Name of the file to import.'))
  .addOption(
    new Option(
      '-a, --all',
      'Import all resource types from single file. Ignored with -i.'
    )
  )
  .addOption(
    new Option(
      '-A, --all-separate',
      'Import all resource types from separate files (*.resourcetype.authz.json) in the current directory. Ignored with -i, -n, or -a.'
    )
  )
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
      // import by uuid
      if (options.typeId && (await frodo.login.getTokens())) {
        verboseMessage(
          'Importing authorization resource type by uuid from file...'
        );
        const outcome = importResourceTypeFromFile(
          options.typeId,
          options.file
        );
        if (!outcome) process.exitCode = 1;
      }
      // import by name
      else if (options.typeName && (await frodo.login.getTokens())) {
        verboseMessage(
          'Importing authorization resource type by name from file...'
        );
        const outcome = importResourceTypeByNameFromFile(
          options.typeName,
          options.file
        );
        if (!outcome) process.exitCode = 1;
      }
      // -a/--all
      else if (options.all && (await frodo.login.getTokens())) {
        verboseMessage(
          'Importing all authorization resource types from file...'
        );
        const outcome = await importResourceTypesFromFile(options.file);
        if (!outcome) process.exitCode = 1;
      }
      // -A/--all-separate
      else if (options.allSeparate && (await frodo.login.getTokens())) {
        verboseMessage(
          'Importing all authorization resource types from separate files...'
        );
        const outcome = await importResourceTypesFromFiles();
        if (!outcome) process.exitCode = 1;
      }
      // import first
      else if (options.file && (await frodo.login.getTokens())) {
        verboseMessage(
          `Importing first authorization resource type from file "${options.file}"...`
        );
        const outcome = await importFirstResourceTypeFromFile(options.file);
        if (!outcome) process.exitCode = 1;
      }
      // unrecognized combination of options or no options
      else {
        verboseMessage('Unrecognized combination of options or no options...');
        program.help();
        process.exitCode = 1;
      }
    }
    // end command logic inside action handler
  );

program.parse();
