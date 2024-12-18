import React, { useState } from 'react';
import { ContainerPage } from './_Page.styles';
import Input from '../components/Input';
import Button from '../components/Button';
import HeaderTitle from '../view/HeaderTitle';

const Dashboard = () => {

  const [formValues, setFormValues] = useState({
    name: '',
    value: '',
    duration: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  };

  return (
    <ContainerPage>
      {/* <HeaderTitle title="Dashboard"></HeaderTitle>
      
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
        <Input
          width="300"
          type="text"
          placeholder="Nome"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        
        <Input
          width="300"
          type="number"
          placeholder="Valor"
          name="value"
          value={formValues.value}
          onChange={handleInputChange}
        />
        
        <Input
          width="300"
          type="number"
          placeholder="Duração"
          name="duration"
          value={formValues.duration}
          onChange={handleInputChange}
        />
        
        <Button text="adicionar" type="submit"/>
      </form> */}
    </ContainerPage>
  );
};

export default Dashboard;
