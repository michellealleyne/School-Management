import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';

// Aqui no usamos creamos en otro sitio nuestro repositorio pero deberiamos
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
    console.log('pruebaaaa');
    console.log('prueba 2');
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = await this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    const students = await this.studentRepository.find({
      where: {
        id: { $in: studentIds },
      },
    });
    return students;
  }
}
