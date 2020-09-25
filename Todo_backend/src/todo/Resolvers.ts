import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Todo } from "./Todo";
import { CreateTodoInput } from "./inputs/CreateTodoInput";
import { UpdateTodoInput } from "./inputs/UpdateTodoInput";

@Resolver()
export class GetTodosResolver {
  @Query(() => [Todo])
  async getTodos(): Promise<Todo[]> {
    return await Todo.find();
  }
}

@Resolver()
export class GetTodoByIdResolver {
  @Query(() => Todo)
  async getTodoById(@Arg("id") id: number): Promise<Todo> {
    return await Todo.findOne({ where: { id } });
  }
}

@Resolver()
export class CreateTodoResolver {
  @Mutation(() => Todo)
  async createTodo(@Arg("todo") todo: CreateTodoInput): Promise<Todo> {
    const todos = await Todo.create(todo).save();

    return todos;
  }
}

@Resolver()
export class UpdateTodoResolver {
  @Mutation(() => Todo)
  async updateTodo(
    @Arg("id") id: number,
    @Arg("todo") todo: UpdateTodoInput
  ): Promise<Todo> {
    const todos = await Todo.findOne({ where: { id } });

    if (!todo) throw new Error("Todo Not Found!");
    Object.assign(todos, todo);

    await todos.save();

    return todos;
  }
}

@Resolver()
export class DeleteTodoResolver {
  @Mutation(() => Todo)
  async deleteTodo(@Arg("id") id: number): Promise<Todo> {
    const todo = await Todo.findOne({ where: { id } });

    if (!todo) throw new Error("todo not found!");
    await todo.remove();

    return todo;
  }
}

@Resolver()
export class ChangeTodoStatusResolver {
  @Mutation(() => Todo)
  async changeTodoStatus(@Arg("id") id: number): Promise<Todo> {
    const todo = await Todo.findOne({ where: { id } });

    if (!todo) throw new Error("todo not found!");
    todo.done = !todo.done;
    await todo.save();

    return todo;
  }
}
