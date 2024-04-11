import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectRepository(Food) private readonly foodRepository: Repository<Food>,) { }

  create(createFoodDto: CreateFoodDto): Promise<Food> {
    //Crea un objeto
    const food = new Food();
    if (createFoodDto.id){
      food.id = createFoodDto.id;
    }
    food.name = createFoodDto.name;
    food.description = createFoodDto.description;
    food.category = createFoodDto.category;
    food.image = createFoodDto.image;
    food.price = createFoodDto.price;
    //Metodo que crea una tabla con typeORM
    return this.foodRepository.save(food);
  }

  async findAll(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  findOne(id: number): Promise<Food> {
    return this.foodRepository.findOneBy({ id: id });
  }

  async delete(id: string): Promise<void> {
    await this.foodRepository.delete(id);
  }
}
