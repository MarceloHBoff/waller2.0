import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateActives1592177391123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'actives',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'code', type: 'varchar' },
          { name: 'name', type: 'varchar' },
          { name: 'type', type: 'varchar' },
          { name: 'price', type: 'decimal', precision: 10, scale: 2 },
          {
            name: 'last_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('actives');
  }
}
