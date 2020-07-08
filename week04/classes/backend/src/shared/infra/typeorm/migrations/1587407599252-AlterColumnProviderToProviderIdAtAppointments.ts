import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AlterColumnProviderToProviderIdAtAppointments1587407599252
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('appointments');

    if (!table) {
      return;
    }

    const findFk = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('provider_id') !== -1,
    );

    if (findFk) {
      await queryRunner.dropForeignKey(table, findFk);
    }

    await queryRunner.dropColumn(table, 'provider_id');

    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
