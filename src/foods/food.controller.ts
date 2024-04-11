import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './food.entity';

@Controller('food')
export class FoodController {
//Instancia del servicio FoodService
    constructor(private readonly serviceFood : FoodService){}

    @Post('save')
    @HttpCode(201)
    create(@Body() createFoodDto:CreateFoodDto): Promise<Food>{
        return this.serviceFood.create(createFoodDto);
    }
    @Get('all')
    @HttpCode(200)
  findAll(): Promise<Food[]> {
    return this.serviceFood.findAll();
  }

  @Get('find/:id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id:number): Promise<Food>{
    return this.serviceFood.findOne(id);
  }
  
  @Delete('delete/:id')
  @HttpCode(200)
  delete(@Param('id') id: string): Promise<void>{
    return this.serviceFood.delete(id);
  }

}
