/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { DataSource, ICollectionManager } from '@nocobase/data-source-manager';
import { MySQLCollectionManager } from './MySQLCollectionManager';

export class MySQLDataSource extends DataSource {
  createCollectionManager(options?: any): ICollectionManager {
    return new MySQLCollectionManager(options);
  }

  async load(): Promise<void> {
    this.collectionManager.defineCollection({
      name: 'posts',
      title: '文章',
      introspected: true,
      filterTargetKey: 'title',
      fields: [
        {
          type: 'string',
          name: 'title',
          title: '标题',
          interface: 'input',
          uiSchema: {
            rawTitle: '标题',
            title: '标题',
            type: 'string',
            'x-component': 'Input',
          },
        },
        {
          type: 'hasMany',
          name: 'comments',
          title: '评论',
          interface: 'input',
          uiSchema: {
            rawTitle: '评论',
            title: '评论',
            type: 'string',
            'x-component': 'Input',
          },
        },
      ],
    });

    const tableCollection = this.collectionManager.defineCollection({
      name: 'information_schema.TABLES',
      title: '数据表',
      introspected: false,
      fields: [
        {
          type: 'string',
          name: 'TABLE_NAME',
        },
      ],
    });
  }
}
