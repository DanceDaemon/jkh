import { MetersTable } from '../meters-table/MetersTable';
import styles from './MetersPage.module.css';

export const MetersPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Список счётчиков</h1>
      <MetersTable />
    </div>
  );
};
