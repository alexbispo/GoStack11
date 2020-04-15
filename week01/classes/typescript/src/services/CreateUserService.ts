const createUser = ({ name } : User): User => {
  return { name, message: `hello ${name}` }
};

export default createUser;
