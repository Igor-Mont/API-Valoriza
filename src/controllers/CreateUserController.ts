import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserSerice';

class CreateUserController {

  async handle(request: Request, response: Response) {
      const { name, email, admin, password } = request.body;
  
      const createUserSerice = new CreateUserService();
  
      const user = await createUserSerice.execute({ name, email, admin, password });
  
      return response.json(user);    

  }
}


export { CreateUserController };