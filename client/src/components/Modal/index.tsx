import styles from './Modal.module.scss';

interface Props {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  titulo: string
  children?: React.ReactNode;
}

export default function Modal({ openModal, setOpenModal, titulo, children }: Props) {
  return (
    <>
      <div
        className={`${styles.fundoModal} ${openModal ? styles['fundoModal--ativo'] : ''} `}
        onClick={() => setOpenModal(false)}
      >
      </div>
      <div className={styles.conteudoModal}>
        <div className={styles.conteudoModal__header}>
          <div className={styles.conteudoModal__header__titulo}>
            <h1> {titulo} </h1>
          </div>
          <div
            onClick={() => setOpenModal(false)}
            className={styles.conteudoModal__header__fechar}
          >
            X
          </div>
        </div>
        <div className={styles.conteudoModal__body}>
          {children}
        </div>
      </div>
    </>
  );
}