import React, { useState } from 'react';
import { ContainerPage } from './StyledPage';
import InputForm from '../components/smallComponent/InputForm';
import ButtonRounded from '../components/smallComponent/ButtonRounded';

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
      <h1 className='mb-5'>Dashboard</h1>
      
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <InputForm
          width="350"
          type="text"
          placeholder="Nome"
          name="nome"
          value={formValues.nome}
          onChange={handleInputChange}
        />
        
        <InputForm
          width="350"
          type="number"
          placeholder="Valor"
          name="valor"
          value={formValues.valor}
          onChange={handleInputChange}
        />
        
        <InputForm
          width="350"
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
