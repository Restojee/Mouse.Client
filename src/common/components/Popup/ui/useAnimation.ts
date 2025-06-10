import { useState, useEffect, useCallback, useRef } from 'react';

type AnimationState = 'initial' | 'entering' | 'entered' | 'exiting' | 'exited';

interface UseAnimationProps {
  isVisible: boolean;
  duration?: number;
  enterDelay?: number;
  exitDelay?: number;
}

/**
 * Хук для управления анимациями появления/исчезновения
 * @param isVisible Флаг видимости элемента
 * @param duration Длительность анимации в мс
 * @param enterDelay Задержка перед появлением в мс
 * @param exitDelay Задержка перед исчезновением в мс
 */
export const useAnimation = ({
  isVisible,
  duration = 300,
  enterDelay = 20,
  exitDelay = 0
}: UseAnimationProps) => {
  const [animationState, setAnimationState] = useState<AnimationState>(
    isVisible ? 'entered' : 'exited'
  );
  
  // Используем ref для хранения таймеров, чтобы правильно их очищать
  const timersRef = useRef<number[]>([]);
  
  // Очистка всех таймеров
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(timerId => window.clearTimeout(timerId));
    timersRef.current = [];
  }, []);
  
  // Обработчик для открытия с анимацией
  const animateEnter = useCallback(() => {
    // Очищаем предыдущие таймеры
    clearTimers();
    
    // Устанавливаем начальное состояние
    setAnimationState('initial');
    
    // Запускаем вход после небольшой задержки для применения начальных стилей
    const enteringTimerId = window.setTimeout(() => {
      setAnimationState('entering');
      
      // Устанавливаем entered после завершения анимации
      const enteredTimerId = window.setTimeout(() => {
        setAnimationState('entered');
      }, duration);
      
      timersRef.current.push(enteredTimerId);
    }, enterDelay);
    
    timersRef.current.push(enteringTimerId);
  }, [clearTimers, duration, enterDelay]);
  
  // Обработчик для закрытия с анимацией
  const animateExit = useCallback(() => {
    // Очищаем предыдущие таймеры
    clearTimers();
    
    // Устанавливаем состояние выхода
    setAnimationState('exiting');
    
    // Устанавливаем exited после завершения анимации
    const exitedTimerId = window.setTimeout(() => {
      setAnimationState('exited');
    }, duration + exitDelay);
    
    timersRef.current.push(exitedTimerId);
  }, [clearTimers, duration, exitDelay]);
  
  // Отслеживаем изменение isVisible
  useEffect(() => {
    if (isVisible) {
      if (animationState === 'exited' || animationState === 'exiting') {
        animateEnter();
      }
    } else {
      if (animationState === 'entered' || animationState === 'entering') {
        animateExit();
      }
    }
    
    // Очистка таймеров при размонтировании
    return clearTimers;
  }, [isVisible, animationState, animateEnter, animateExit, clearTimers]);
  
  // Свойства, которые можно использовать в компоненте
  const shouldRender = animationState !== 'exited';
  const isAnimating = animationState === 'entering' || animationState === 'exiting';
  const classNames = {
    enter: animationState === 'entering',
    enterActive: animationState === 'entering',
    enterDone: animationState === 'entered',
    exit: animationState === 'exiting',
    exitActive: animationState === 'exiting',
    exitDone: animationState === 'exited'
  };
  
  return {
    animationState,
    shouldRender,
    isAnimating,
    classNames,
    animateEnter,
    animateExit
  };
}; 