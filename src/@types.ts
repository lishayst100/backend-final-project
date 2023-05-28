//add somthing to express request
// to make the file a module and avoid the TypeScript error


export type Role ={
    name:string
}


export type User = {
  username: string,
  password: string,
  email: string,
  roles: [];
};

export type Car ={
    vandor:string,
    model:string,
    color:string,
    image?:string
}


declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}