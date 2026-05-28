import { useStore } from '@/models/useStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { MetersRow } from '../meters-row/MetersRow';
import styles from './MetersTable.module.css';

export const MetersTable = observer(() => {
  const tableBottomElRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const store = useStore();

  useEffect(() => {
    store.loadMore();
  }, [store]);

  useEffect(() => {
    if (!scrollRef.current || !tableBottomElRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          store.loadMore();
        }
      },
      { root: scrollRef.current, rootMargin: '150px' }
    );

    observer.observe(tableBottomElRef.current);

    return () => observer.disconnect();
  }, [store]);

  // хук для догрузки контента, если все 20 элементов влезли в экран, и скролла нет
  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    const noScroll = scroll.scrollHeight <= scroll.clientHeight;
    if (noScroll && store.hasMore && !store.isLoading) {
      store.loadMore();
    }
  });

  return (
    <div className={styles.scrollContainer} ref={scrollRef}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeaderRow}>
            <th>№</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Текущие показания</th>
            <th>Адрес</th>
            <th>Примечание</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {store.meters.map((meter, index) => {
            const {
              description,
              formattedDate,
              isAutomatic,
              kind,
              formattedValues,
              id,
              areaId,
            } = meter;

            const address = store.areas.get(areaId)?.fullAddress;
            return (
              <MetersRow
                address={address ?? ''}
                description={description}
                index={index + 1}
                installationDate={formattedDate}
                isAuto={isAutomatic}
                kind={kind}
                values={formattedValues}
                onDelete={() => store.deleteMeter(id)}
                key={id}
              />
            );
          })}
        </tbody>
      </table>
      <div ref={tableBottomElRef} aria-hidden />
    </div>
  );
});
