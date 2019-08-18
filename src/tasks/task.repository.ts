/**
 * Repository is supposed to work with your entity objects.
 * Find entities, insert, update, delete, etc.
 */

import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> { }
