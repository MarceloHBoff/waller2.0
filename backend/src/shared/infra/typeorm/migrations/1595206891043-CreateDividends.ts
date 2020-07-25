import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDividends1595206891043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dividends',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'active_id', type: 'uuid' },
          { name: 'type', type: 'enum', enum: ['jscp', 'dividends'] },
          { name: 'value', type: 'decimal', precision: 10, scale: 8 },
          { name: 'EX_date', type: 'date' },
          { name: 'pay_date', type: 'date', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'DividendActive',
            referencedTableName: 'actives',
            referencedColumnNames: ['id'],
            columnNames: ['active_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dividends');
  }
}
