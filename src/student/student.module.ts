import { Module } from '@nestjs/common';
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
