import React, { useCallback } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Button } from "@/ui/Button";
import { SheetComponentProps } from "@/ui/Sheet/core/createSheet";
import styles from "./PrivacyPolicy.module.scss";

export const PrivacyPolicy = ({ onClose }: SheetComponentProps<void>) => {
  const { theme } = useAppTheme();
  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <p className={styles.lead}>
          OnlyPlanks обрабатывает данные, которые нужны для работы аккаунта и функций сайта.
        </p>

        <section className={styles.section}>
          <h3 className={styles.title}>Какие данные обрабатываются</h3>
          <p className={styles.text}>
            Никнейм, данные для входа в защищённом виде, технические cookie и данные сессии, статистика аккаунта, а
            также данные, которые пользователь сам добавляет или сохраняет на сайте. В технических логах могут
            сохраняться IP-адрес, user-agent и время запроса; эти данные используются только для безопасности,
            диагностики ошибок и защиты сайта.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.title}>Зачем это нужно</h3>
          <p className={styles.text}>
            Для входа в аккаунт, защиты сайта, работы карт, тегов, комментариев, избранного, статистики и других функций
            OnlyPlanks.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.title}>Срок хранения</h3>
          <p className={styles.text}>
            Данные аккаунта и пользовательский контент хранятся, пока существует аккаунт или пока контент не удалён.
            Технические логи обычно хранятся до 30 дней, если более длительное хранение не требуется для безопасности
            сайта или по закону.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.title}>Права пользователя</h3>
          <p className={styles.text}>
            Пользователь может запросить доступ к своим данным, исправление, удаление аккаунта или отзыв согласия на
            обработку данных. Для этого достаточно написать администратору сайта: onlyplanks.fun@gmail.com.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.title}>Инфраструктура</h3>
          <p className={styles.text}>
            Сайт может использовать стороннюю хостинговую, доменную и техническую инфраструктуру для своей работы.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.title}>Оператор</h3>
          <p className={styles.text}>Оператор персональных данных: физическое лицо, администратор сайта OnlyPlanks.</p>
        </section>
      </div>

      <div className={styles.actions}>
        <Button
          label="Понятно"
          color={theme.colors.brandColorContrastText}
          onClick={handleClose}
        />
      </div>
    </div>
  );
};
