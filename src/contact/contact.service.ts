import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save({ ...contact });
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find({ relations: ['numero'] });
  }

  async findAllFilterByName(nome: string, numero: string): Promise<Contact[]> {
    // return await this.contactRepository.find({
    //   order: {
    //     createdAt: 'DESC',
    //   },
    //   where: {
    //     nome: ILike(`%${nome}%`),
    //     numero: ILike(`%${telefone}%`),
    //   },
    //   relations: ['numero'],
    // });
    const query = this.contactRepository
      .createQueryBuilder('contact')
      .leftJoinAndSelect('contact.numero', 'phone') // Relacionamento entre Contact e Phone
      .where('contact.nome ILIKE :nome', { nome: `%${nome}%` })
      .andWhere('phone.numero ILIKE :numero', { numero: `%${numero}%` })
      .orderBy('contact.createdAt', 'DESC');

    return await query.getMany();
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id: id },
      relations: ['numero'],
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID #${id} not found`);
    }
    return contact;
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.findOne(id);
    this.contactRepository.merge(contact, updateContactDto);
    return await this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    const contact = await this.findOne(id);

    await this.contactRepository.delete({ id: contact.id });
  }
}
