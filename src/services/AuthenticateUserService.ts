import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRespositories";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';



interface IAuthencticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password}: IAuthencticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if(!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/Passwprd incorrect");
    }

    const token = sign({
      email: user.email,
    }, "12a8f3f9b09f7c9fec12c75a125f0e26", {
      subject: user.id,
      expiresIn: "1d"
    } );

    return token;
  }
}

export { AuthenticateUserService }