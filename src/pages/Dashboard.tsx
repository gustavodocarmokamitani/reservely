import React, { useState } from 'react';
import { ContainerPage } from './_StyledPage';
import Input from '../components/Input';
import ButtonRounded from '../components/Button';
import HeaderTitle from '../view/HeaderTitle';

const Dashboard = () => {
  // Estado do formulário
  const [formValues, setFormValues] = useState({
    nome: '',
    valor: '',
    duracao: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Dados do formulário:', formValues);
  };

  return (
    <ContainerPage>
      <HeaderTitle title="Dashboard"></HeaderTitle>
      
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
        <Input
          width="300"
          type="text"
          placeholder="Nome"
          name="nome"
          value={formValues.nome}
          onChange={handleInputChange}
        />
        
        <Input
          width="300"
          type="number"
          placeholder="Valor"
          name="valor"
          value={formValues.valor}
          onChange={handleInputChange}
        />
        
        <Input
          width="300"
          type="number"
          placeholder="Duração"
          name="duracao"
          value={formValues.duracao}
          onChange={handleInputChange}
        />
        
        <ButtonRounded text="Adicionar" type="submit" addIconIs={true} removeIconIs={false}/>
      </form>
    </ContainerPage>
  );
};

export default Dashboard;
