import styles from './component-module.module.scss';

/* eslint-disable-next-line */
export interface ComponentModuleProps {}

export function ComponentModule(props: ComponentModuleProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ComponentModule!</h1>
    </div>
  );
}

export default ComponentModule;
