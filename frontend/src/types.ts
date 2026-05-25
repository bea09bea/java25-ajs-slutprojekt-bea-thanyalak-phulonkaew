export type Task = {
     id: number;
     title: string;
     project: string;
     description: string;
     deadline: string;
     person: string;
     status: string;
     category: string;
}

export type NewTask = {
     title: string;
     project: string;
     description: string;
     deadline: string;
}