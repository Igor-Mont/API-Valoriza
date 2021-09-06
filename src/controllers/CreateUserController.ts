import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserSerice';

class CreateUserController {

  async handle(request: Request, response: Response) {
    const { name, email, admin } = request.body;

    const createUserSerice = new CreateUserService();

    const user = await createUserSerice.execute({ name, email, admin });

    return response.json(user)
  }
}


export { CreateUserController };