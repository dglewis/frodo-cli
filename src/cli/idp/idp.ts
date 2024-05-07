import { FrodoStubCommand } from '../FrodoCommand';
import ExportCmd from './idp-export.js';
import ImportCmd from './idp-import.js';
import ListCmd from './idp-list.js';

export default function setup() {
  const program = new FrodoStubCommand('idp').description(
    'Manage (social) identity providers.'
  );

  program.addCommand(ListCmd().name('list'));

  program.addCommand(ExportCmd().name('export'));

  program.addCommand(ImportCmd().name('import'));

  return program;
}
