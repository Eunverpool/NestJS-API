import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }
  @Get('/search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie with a after: ${searchingYear}`;
  }
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `this will return one movie with the id:${id}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `This will Delete a movie with the id: ${id}`;
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      updatedMovie: id,
      ...updateData,
    };
  }
}
