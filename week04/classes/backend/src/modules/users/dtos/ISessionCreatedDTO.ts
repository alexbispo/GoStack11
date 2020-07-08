import User from '@modules/users/infra/typeorm/entities/User';

export default interface ISessionCreatedDTO {
  user: User;
  token: string;
}
