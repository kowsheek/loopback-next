// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BindingScope, ContextTags} from '@loopback/core';
import {expect, TestSandbox} from '@loopback/testlab';
import {resolve} from 'path';
import {BooterApp} from '../fixtures/application';

describe('global interceptor script booter integration tests', () => {
  const SANDBOX_PATH = resolve(__dirname, '../../.sandbox');
  const sandbox = new TestSandbox(SANDBOX_PATH);

  const INTERCEPTOR_PREFIX = 'globalInterceptors';
  const INTERCEPTOR_TAG = ContextTags.GLOBAL_INTERCEPTOR;

  let app: BooterApp;

  beforeEach('reset sandbox', () => sandbox.reset());
  beforeEach(getApp);

  it('boots life cycle observers when app.boot() is called', async () => {
    const expectedBinding = {
      key: `${INTERCEPTOR_PREFIX}.MyGlobalInterceptor`,
      tags: [
        ContextTags.PROVIDER,
        ContextTags.TYPE,
        INTERCEPTOR_TAG,
        ContextTags.GLOBAL_INTERCEPTOR_GROUP,
      ],
      scope: BindingScope.TRANSIENT,
    };

    await app.boot();

    const bindings = app
      .findByTag(INTERCEPTOR_TAG)
      .map(b => ({key: b.key, tags: b.tagNames, scope: b.scope}));
    expect(bindings).to.containEql(expectedBinding);
  });

  async function getApp() {
    await sandbox.copyFile(resolve(__dirname, '../fixtures/application.js'));
    await sandbox.copyFile(
      resolve(__dirname, '../fixtures/interceptor.artifact.js'),
      'interceptors/interceptor.interceptor.js',
    );

    const MyApp = require(resolve(SANDBOX_PATH, 'application.js')).BooterApp;
    app = new MyApp();
  }
});
