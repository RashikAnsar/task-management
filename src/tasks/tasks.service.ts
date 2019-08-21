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

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

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

    /**
     * returns the task after updated with the given task status.
     * @param id id in the database
     * @param status TaskStatus to update
     */
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID: "${id}" not found.`)
        }
    }
}
