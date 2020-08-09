import React, { useState, useEffect, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Select from "../../components/Select";

import Input from "../../components/Input";
import api from "../../services/api";

import "./styles.css";


function TeacherList() {
  const [classes, setClasses] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    api.get('classes')
      .then((response) => {
        setClasses(response.data)
      })
  }, [])

  async function searchTeachers(e: FormEvent) {
    e.preventDefault()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    setClasses(response.data)
    // console.log(response)

  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponiveis.">
        <form id="search-teacher">
          <Select
            name="subject"
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
              { value: 'Física', label: 'Física' },
              { value: 'Espanhol', label: 'Espanhol' }
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda' },
              { value: '2', label: 'Terça' },
              { value: '3', label: 'Quarta' },
              { value: '4', label: 'Quinta' },
              { value: '5', label: 'Sexta' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input name="time" label="Hora" type="time" />
          <button onClick={searchTeachers}>
            Pesquisar
          </button>

        </form>
      </PageHeader>

      <main>
        {classes.map((c: Teacher) => {
          return (<TeacherItem key={c.id} teacher={c} />)
        })}
      </main>
    </div>
  );
}

export default TeacherList;
