import * as React from 'react';
import { Column, Paper, type TextInputProps } from '@common/index';
import clsx from 'clsx';
import { memo } from 'react';
import styles from './Input.module.scss';

export const InputText: React.FC<TextInputProps> = memo((props) => {
  const {
    readOnly = false,
    onChange = () => {},
    append = null,
    value = '',
    onClick = () => {},
    prepend = null,
    className = '',
    placeholder = '',
    bgColor,
    color,
    leftIcon,
    rightIcon,
    integrated,
    noBorder,
    noHover,
  } = props;

  const renderLeft = React.useMemo(
    () => <Column className={styles.Prepend}>{prepend}</Column>,
    [prepend, leftIcon],
  );

  const renderRight = React.useMemo(
    () => <Column className={styles.Append}>{append}</Column>,
    [append, rightIcon],
  );

  const centerProps = React.useMemo(
    () => ({
      className: styles.TextInput,
      readOnly,
      value: value?.toString(),
      onClick,
      onChange,
      placeholder,
      type: 'text',
    }),
    [readOnly, value, onClick, onChange, placeholder],
  );

  const renderCenter = React.useMemo(() => <input {...centerProps} />, [centerProps]);

  return (
    <Paper bgColor={bgColor} color={color} className={clsx([className, styles.Wrapper])}>
      {prepend && renderLeft}
      {renderCenter}
      {append && renderRight}
    </Paper>
  );
});
