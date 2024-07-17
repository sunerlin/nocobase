/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';
import { dataSourceType } from '../constants';
import { DataSource, ICollectionManager } from '@nocobase/data-source-manager';
import { SQLServerCollectionManager } from './SQLServerCollectionManager';
import { Database } from '@nocobase/database';
import { lodash } from '@nocobase/utils';

export class SQLServerDataSource extends DataSource {
  createCollectionManager(options?: any): ICollectionManager {
    return new SQLServerCollectionManager(options);
  }

  async load(): Promise<void> {
    const SysObjectsCollection = this.collectionManager.defineCollection({
      name: 'sysobjects',
      title: '数据库对象',
      filterTargetKey: 'title',
      autoGenId: false,
      createdAt: false,
      deletedAt: false,
      updatedAt: false,
      fields: [
        {
          type: 'string',
          name: 'name',
          title: '表名',
          interface: 'input',
          uiSchema: {
            rawTitle: '表名',
            title: '表名',
            type: 'string',
            'x-component': 'Input',
          },
        },
      ],
    });

    try {
      const db = this.collectionManager['db'] as Database;
      const allTables = await db.sequelize.query(
        `
        SELECT 
          table_name       =  isnull(t.name, ''),
          table_comment     = isnull(f.value, '')
        FROM sysobjects t
          left join sys.extended_properties f on t.id=f.major_id and f.minor_id=0
        WHERE t.xtype='U'
      `,
        { type: 'SELECT' },
      );

      const groupedTables = {};
      allTables.forEach((table) => {
        groupedTables[table['table_name']] = table;
      });

      const allColumns = await db.sequelize.query(
        `
        SELECT 
          d.name table_name,
          col_name     = a.name,
          col_comment   = isnull(g.[value],'')
        FROM syscolumns a
          left join sys.extended_properties   g on a.id=G.major_id and a.colid=g.minor_id  
          inner join sysobjects d on a.id=d.id  and d.xtype='U'
      `,
        {
          type: 'SELECT',
        },
      );
      const groupedColumns = lodash.groupBy(allColumns, 'table_name');

      for (const key in groupedTables) {
        const table = groupedTables[key];
        const fields = [];
        const columns = groupedColumns[key];
        columns.forEach((column) => {
          fields.push({
            type: 'string',
            name: column['col_name'],
            title: column['col_comment'],
            interface: 'input',
            uiSchema: {
              rawTitle: column['col_comment'],
              title: column['col_comment'],
              type: 'string',
              'x-component': 'Input',
            },
          });
        });

        this.collectionManager.defineCollection({
          name: table['table_name'],
          title: table['table_comment'],
          introspected: true,
          filterTargetKey: 'id',
          autoGenId: false,
          createdAt: false,
          deletedAt: false,
          updatedAt: false,
          fields,
        });
      }
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  }

  static testConnection(options?: any): Promise<boolean> {
    return Promise.resolve(false);
  }
}
