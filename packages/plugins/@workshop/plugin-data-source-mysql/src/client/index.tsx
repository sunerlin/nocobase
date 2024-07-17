/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import PluginDataSourceManagerClient from '@nocobase/plugin-data-source-manager/client';
import { dataSourceType } from '../constants';

export class PluginDataSourceMysqlClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
    const dsmClient = this.app.pm.get(PluginDataSourceManagerClient);
    dsmClient.registerType(dataSourceType, {
      label: 'MySQL',
      DataSourceSettingsForm: 'MySQLDataSourcePane',
    });
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    console.log(this.app);
    // this.app.addComponents({})
    // this.app.addScopes({})
    // this.app.addProvider()
    // this.app.addProviders()
    // this.app.router.add()
  }
}

export default PluginDataSourceMysqlClient;
