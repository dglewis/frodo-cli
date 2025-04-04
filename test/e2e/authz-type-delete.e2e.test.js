/**
 * Follow this process to write e2e tests for the CLI project:
 *
 * 1. Test if all the necessary mocks for your tests already exist.
 *    In mock mode, run the command you want to test with the same arguments
 *    and parameters exactly as you want to test it, for example:
 *
 *    $ FRODO_MOCK=1 frodo conn save https://openam-frodo-dev.forgeblocks.com/am volker.scheuber@forgerock.com Sup3rS3cr3t!
 *
 *    If your command completes without errors and with the expected results,
 *    all the required mocks already exist and you are good to write your
 *    test and skip to step #4.
 *
 *    If, however, your command fails and you see errors like the one below,
 *    you know you need to record the mock responses first:
 *
 *    [Polly] [adapter:node-http] Recording for the following request is not found and `recordIfMissing` is `false`.
 *
 * 2. Record mock responses for your exact command.
 *    In mock record mode, run the command you want to test with the same arguments
 *    and parameters exactly as you want to test it, for example:
 *
 *    $ FRODO_MOCK=record frodo conn save https://openam-frodo-dev.forgeblocks.com/am volker.scheuber@forgerock.com Sup3rS3cr3t!
 *
 *    Wait until you see all the Polly instances (mock recording adapters) have
 *    shutdown before you try to run step #1 again.
 *    Messages like these indicate mock recording adapters shutting down:
 *
 *    Polly instance 'conn/4' stopping in 3s...
 *    Polly instance 'conn/4' stopping in 2s...
 *    Polly instance 'conn/save/3' stopping in 3s...
 *    Polly instance 'conn/4' stopping in 1s...
 *    Polly instance 'conn/save/3' stopping in 2s...
 *    Polly instance 'conn/4' stopped.
 *    Polly instance 'conn/save/3' stopping in 1s...
 *    Polly instance 'conn/save/3' stopped.
 *
 * 3. Validate your freshly recorded mock responses are complete and working.
 *    Re-run the exact command you want to test in mock mode (see step #1).
 *
 * 4. Write your test.
 *    Make sure to use the exact command including number of arguments and params.
 *
 * 5. Commit both your test and your new recordings to the repository.
 *    Your tests are likely going to reside outside the frodo-lib project but
 *    the recordings must be committed to the frodo-lib project.
 */

/*
FRODO_MOCK=record FRODO_NO_CACHE=1 FRODO_HOST=https://openam-frodo-dev.forgeblocks.com/am frodo authz type delete -n FrodoTestResourceType13
FRODO_MOCK=record FRODO_NO_CACHE=1 FRODO_HOST=https://openam-frodo-dev.forgeblocks.com/am frodo authz type delete --type-name FrodoTestResourceType13
FRODO_MOCK=record FRODO_NO_CACHE=1 FRODO_HOST=https://openam-frodo-dev.forgeblocks.com/am frodo authz type delete -i 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76
FRODO_MOCK=record FRODO_NO_CACHE=1 FRODO_HOST=https://openam-frodo-dev.forgeblocks.com/am frodo authz type delete --type-id 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76
FRODO_MOCK=record FRODO_NO_CACHE=1 FRODO_HOST=https://openam-frodo-dev.forgeblocks.com/am frodo authz type delete -a
FRODO_MOCK=record FRODO_NO_CACHE=1 FRODO_HOST=https://openam-frodo-dev.forgeblocks.com/am frodo authz type delete --all
*/
import cp from 'child_process';
import { promisify } from 'util';
import { getEnv, removeAnsiEscapeCodes } from './utils/TestUtils';
import { connection as c } from './utils/TestConfig';

const exec = promisify(cp.exec);

process.env['FRODO_MOCK'] = '1';
const env = getEnv(c);

describe('frodo authz type delete', () => {
  test('"frodo authz type delete -n FrodoTestResourceType13": should delete the resource type with name FrodoTestResourceType13', async () => {
    const CMD = `frodo authz type delete -n FrodoTestResourceType13`;
    const { stdout } = await exec(CMD, env);
    expect(removeAnsiEscapeCodes(stdout)).toMatchSnapshot();
  });

  test('"frodo authz type delete --type-name FrodoTestResourceType13": should display error when the resource type with name FrodoTestResourceType13 cannot be deleted since it does not exist', async () => {
    const CMD = `frodo authz type delete --type-name FrodoTestResourceType13`;
    expect.assertions(1);
    try {
      await exec(CMD, env);
      fail(`Command expected to fail: ${CMD}`);
    } catch (error) {
      expect(removeAnsiEscapeCodes(error.stderr)).toMatchSnapshot();
    }
  });

  test('"frodo authz type delete -i 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76": should delete the resource type with id 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76', async () => {
    const CMD = `frodo authz type delete -i 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76`;
    const { stdout } = await exec(CMD, env);
    expect(removeAnsiEscapeCodes(stdout)).toMatchSnapshot();
  });

  test('"frodo authz type delete --type-id 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76": should display error when the resource type with id 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76 cannot be deleted since it does not exist', async () => {
    const CMD = `frodo authz type delete --type-id 0aa5ed25-0c62-4ff5-9a42-3bda8c5cbb76`;
    expect.assertions(1);
    try {
      await exec(CMD, env);
      fail(`Command expected to fail: ${CMD}`);
    } catch (error) {
      expect(removeAnsiEscapeCodes(error.stderr)).toMatchSnapshot();
    }
  });

  //TODO: Generate mock for this test (skip for meantime)
  test.skip('"frodo authz type delete -a": should delete all resource types', async () => {
    const CMD = `frodo authz type delete -a`;
    const { stdout } = await exec(CMD, env);
    expect(removeAnsiEscapeCodes(stdout)).toMatchSnapshot();
  });

  //TODO: Generate mock for this test (skip for meantime)
  test.skip('"frodo authz type delete --all": should do nothing when no resource types can be deleted', async () => {
    const CMD = `frodo authz type delete --all`;
    const { stderr } = await exec(CMD, env);
    expect(removeAnsiEscapeCodes(stderr)).toMatchSnapshot();
  });
});
