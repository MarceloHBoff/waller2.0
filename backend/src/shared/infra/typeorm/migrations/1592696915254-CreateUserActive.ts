import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserActive1592696915254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_actives',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'user_id', type: 'uuid' },
          { name: 'active_id', type: 'uuid' },
          { name: 'quantity', type: 'decimal', precision: 5, scale: 2 },
          { name: 'buyPrice', type: 'decimal', precision: 5, scale: 2 },
          { name: 'buyDate', type: 'date' },
          {
            name: 'automatic',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'UserActive',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ActiveUser',
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
    await queryRunner.dropTable('user_actives');
  }
}
