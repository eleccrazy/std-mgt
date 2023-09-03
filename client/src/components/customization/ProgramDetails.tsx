import { useEffect, useState } from 'react';
import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

function ProgramDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const [program, setProgram] = useState<any>(null);
  useEffect(() => {
    async function getProgram() {
      const { data } = await baseApi.get(`programs/${id}`);
      setProgram(data);
    }
    getProgram();
  }, []);
  console.log(program);
  return <div>{program && <h3>From Program: {program.name}</h3>}</div>;
}

export default ProgramDetails;
