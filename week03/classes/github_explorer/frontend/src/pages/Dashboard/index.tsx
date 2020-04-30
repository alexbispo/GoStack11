import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explorador de reppositórios do Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/6197542?s=460&u=1108d6a14dfd172137ee2221ace8495f4d161a30&v=4"
            alt="alexbispo"
          />

          <div>
            <strong>alexbispo/bandeirantes</strong>
            <p>My first Elixir App.</p>
          </div>

          <FiChevronRight />
        </a>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/6197542?s=460&u=1108d6a14dfd172137ee2221ace8495f4d161a30&v=4"
            alt="alexbispo"
          />

          <div>
            <strong>alexbispo/bandeirantes</strong>
            <p>My first Elixir App.</p>
          </div>

          <FiChevronRight />
        </a>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/6197542?s=460&u=1108d6a14dfd172137ee2221ace8495f4d161a30&v=4"
            alt="alexbispo"
          />

          <div>
            <strong>alexbispo/bandeirantes</strong>
            <p>My first Elixir App.</p>
          </div>

          <FiChevronRight />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
