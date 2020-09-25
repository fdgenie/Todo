import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateTodoInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  done?: boolean;

  @Field({ nullable: true })
  date?: Date;
}