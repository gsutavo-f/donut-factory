import styles from '../../styles/Formulario.module.scss';
import { StringNumber } from '../../types';
import { useRef } from 'react';

interface Props {
  id: number;
  label: string;
  type: string;
  newValue: StringNumber;
  submit: (id: number) => void;
  setNewValue: React.Dispatch<React.SetStateAction<StringNumber>>;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateForm({ label, type, newValue, id, setNewValue, submit, setOpenUpdateModal }: Props) {

  function atualiza(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    setOpenUpdateModal(false);
    setNewValue(newValue);
    submit(id);
  }

  return (
    <form onSubmit={atualiza} className={styles.formulario}>
      <label htmlFor="update">
        {label}
      </label>
      <input
        type={type}
        name="update"
        value={newValue as unknown as StringNumber}
        onChange={(event) => setNewValue(event.target.value)}
        required
      />
      <button className={styles.botao} type="submit">
        Atualizar
      </button>
    </form>
  );

}