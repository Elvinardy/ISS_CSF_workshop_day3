export class Todo {  // declare variables needed for this app
  constructor(
    public task: string,
    public priority: string,
    public dueDate: Date,
    public taskId: string,
    public status?: boolean
  ) {

  }
}
