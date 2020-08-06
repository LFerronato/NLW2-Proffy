import React from "react";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/TextArea";

import warningIcon from '../../assets/images/icons/warning.svg'

import './style.css'

function Teacherform() {
  return (

    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário"
      />


      <main>
        <fieldset>
          <legend>Seus Dados</legend>
          <Input name="name" label="Nome Completo" />
          <Input name="avatar" label="Avatar" />
          <Input name="whatsapp" label="WhatsApp" />
          <Textarea name="bio" label="Bio" />

        </fieldset>
        <fieldset>
          <legend>Sobre a Aula</legend>
          <Input
            name="subject"
            label="Matéria"
          />
          <Input name="cost" label="Custo da sua hora por aula" />

        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso Importante" />
            Importante! <br />
            Preencha todos os dados.
          </p>
          <button type="button">Salvar cadastro</button>
        </footer>

      </main>
    </div>
  );
}

export default Teacherform;
