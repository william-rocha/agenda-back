import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  async create(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    const phone = this.phoneRepository.create(createPhoneDto);
    return await this.phoneRepository.save(phone);
  }

  async findAll(): Promise<Phone[]> {
    return await this.phoneRepository.find();
  }

  async findOne(id: number): Promise<Phone> {
    const phone = await this.phoneRepository.findOne({
      where: { id: id },
    });
    if (!phone) {
      throw new NotFoundException(`Phone with ID #${id} not found`);
    }
    return phone;
  }

  async update(id: number, updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
    const phone = await this.findOne(id);
    this.phoneRepository.merge(phone, updatePhoneDto);
    return await this.phoneRepository.save(phone);
  }

  async remove(id: number): Promise<void> {
    const phone = await this.findOne(id);
    await this.phoneRepository.remove(phone);
  }
}
