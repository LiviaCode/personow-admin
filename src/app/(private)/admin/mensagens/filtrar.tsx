import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function Filtrar() {
  return (
    <>
      <label htmlFor='filter'>Filtros: </label>
      <input
        name='filter'
        type='text'
        placeholder='nome'
        className='basis-2xs mx-8 rounded-[8px] border border-secondary-web p-2 focus:outline-none'
      ></input>
      <select
        className='basis-2xs mx-8 rounded-[8px] border border-secondary-web p-2 focus:outline-none'
        name='mensagens'
      >
        <option value='naoLidas'>Todas</option>
        <option value='naoLidas'>Não lidas</option>
        <option value='banana'>Lidas</option>
      </select>
      <Button className='mx-8'>
        <Search />
      </Button>
    </>
  );
}
