import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/helpers/swaggers/bad-request.swagger';
import { InternalServerSwagger } from 'src/helpers/swaggers/internal-server.swagger';
import { NotFoundSwagger } from 'src/helpers/swaggers/not-found.swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { TodoService } from './todo.service';


@Controller('app/v1/todo')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService){}

  @Get()
  @ApiOperation({ summary: 'Lista todas as tarefas.' })
  @ApiResponse({ status:200, description: 'Tarefas Listadas com sucesso.', type: IndexTodoSwagger, isArray: true })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.', type: InternalServerSwagger })
  async showAll(){
    return await this.todoService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma tarefa pelo Id.' })
  @ApiResponse({ status: 200, description: 'Tarefa Listada com sucesso.', type: IndexTodoSwagger  })
  @ApiResponse({ status: 400, description: 'Parâmetro(s) inválido(s).', type: BadRequestSwagger })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.', type: NotFoundSwagger })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.', type: InternalServerSwagger })
  async showOne(@Param('id', new ParseUUIDPipe()) id: string){
    return await this.todoService.findOneOrFail(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova tarefa.'})
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso', type: CreateTodoSwagger })
  @ApiResponse({ status: 400, description: 'Parâmetro(s) inválido(s).', type: BadRequestSwagger})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.', type: InternalServerSwagger })
  async create(@Body() body: CreateTodoDto){
    return await this.todoService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atera informações de uma tarefa.' })
  @ApiResponse({ status: 200, description: 'Tarefa alterada com sucesso.', type: UpdateTodoSwagger})
  @ApiResponse({ status: 400, description: 'Parâmetro(s) inválido(s).', type: BadRequestSwagger })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.', type: NotFoundSwagger })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.', type: InternalServerSwagger })
  async modify(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto){
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Realiza a exclusão lógica da tarefa.'})
  @ApiResponse({ status: 204, description: 'Tarefa excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.', type: NotFoundSwagger })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.', type: InternalServerSwagger })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string){
    await this.todoService.remove(id);
  }
}
