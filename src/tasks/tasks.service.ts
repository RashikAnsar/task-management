import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    /**
     * Return the tuple from Database based on ID
     * @param id ID of the task
     */
    async getTaskById(id: number, user: User): Promise<Task> {
        const result = await this.taskRepository.findOne({ where: { id, userId: user.id } });
        if (!result) {
            throw new NotFoundException(`Task with id: "${id}" not found`);
        }

        return result;
    }

    /**
     * Returns new task added to the database
     * @param createTaskDto Title and Description of Task
     */
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    /**
     * returns the task after updated with the given task status.
     * @param id id in the database
     * @param status TaskStatus to update
     */
    // async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    //     const task = await this.getTaskById(id);
    //     task.status = status;
    //     await task.save();
    //     return task;
    // }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID: "${id}" not found.`)
        }
    }
}
