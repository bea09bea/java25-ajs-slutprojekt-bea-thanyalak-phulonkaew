export type task = {
     id: number;
     title: string;
     project: string;
     description: string;
     deadline: string;
     person: string;
     status: string;
     category: string;
}

export type newTask = {
     title: string;
     project: string;
     description: string;
     deadline: string;
}