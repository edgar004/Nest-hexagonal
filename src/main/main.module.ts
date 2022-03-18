import { Module } from '@nestjs/common';
import { StudentsModule } from './features/students/students.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConnectionFactory } from './commons/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: defaultConnectionFactory,
      inject: [ConfigService],
    }),
    StudentsModule,
  ],
  exports: [StudentsModule],
})
export class MainModule {}
