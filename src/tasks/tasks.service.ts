import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }

    //     return tasks;
    // }

    /**
     * Return the tuple from Database based on ID
     * @param id ID of the task
     */
    async getTaskById(id: number): Promise<Task> {
        const result = await this.taskRepository.findOne(id);
        if (!result) {
            throw new NotFoundException(`Task with id: "${id}" not found`);
        }

        return result;
    }

    /**
     * Returns new task added to the database
     * @param createTaskDto Title and Description of Task
     */
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task: Task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }
}
