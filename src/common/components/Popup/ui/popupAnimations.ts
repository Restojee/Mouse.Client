import { CSSProperties } from 'react';

// Тип для анимационных стилей
export interface AnimationStyles {
  initial: CSSProperties;
  enter: CSSProperties;
  exit: CSSProperties;
}

// Типы анимаций для разных позиций
export type PopupPositionType = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type AnimationPresetType = 'fade' | 'slide' | 'scale' | 'flip';

// Базовые пресеты анимаций - усиленные для лучшей видимости
const fadeAnimation: AnimationStyles = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1, 
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
  },
  exit: { 
    opacity: 0, 
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
  }
};

const scaleAnimation: AnimationStyles = {
  initial: { opacity: 0, transform: 'scale(0.8)' },
  enter: { 
    opacity: 1, 
    transform: 'scale(1)', 
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
  },
  exit: { 
    opacity: 0, 
    transform: 'scale(0.8)', 
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)' 
  }
};

// Пресеты анимаций для разных позиций - более выраженные смещения
export const positionAnimations: Record<PopupPositionType, AnimationStyles> = {
  top: {
    initial: { opacity: 0, transform: 'translateY(-30px)' },
    enter: { 
      opacity: 1, 
      transform: 'translateY(0)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
    },
    exit: { 
      opacity: 0, 
      transform: 'translateY(-30px)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)' 
    }
  },
  bottom: {
    initial: { opacity: 0, transform: 'translateY(30px)' },
    enter: { 
      opacity: 1, 
      transform: 'translateY(0)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
    },
    exit: { 
      opacity: 0, 
      transform: 'translateY(30px)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)' 
    }
  },
  left: {
    initial: { opacity: 0, transform: 'translateX(-30px)' },
    enter: { 
      opacity: 1, 
      transform: 'translateX(0)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
    },
    exit: { 
      opacity: 0, 
      transform: 'translateX(-30px)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)' 
    }
  },
  right: {
    initial: { opacity: 0, transform: 'translateX(30px)' },
    enter: { 
      opacity: 1, 
      transform: 'translateX(0)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
    },
    exit: { 
      opacity: 0, 
      transform: 'translateX(30px)', 
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)' 
    }
  },
  center: scaleAnimation
};

// Получить анимацию в зависимости от позиции и типа
export const getAnimationByPosition = (
  position: PopupPositionType = 'bottom',
  animationType: AnimationPresetType = 'slide'
): AnimationStyles => {
  if (animationType === 'fade') {
    return fadeAnimation;
  }
  
  if (animationType === 'scale') {
    return scaleAnimation;
  }
  
  if (animationType === 'flip') {
    // Добавляем новый тип анимации - flip
    return {
      initial: { 
        opacity: 0, 
        transform: position === 'top' || position === 'bottom'
          ? 'perspective(400px) rotateX(90deg)'
          : 'perspective(400px) rotateY(90deg)'
      },
      enter: { 
        opacity: 1, 
        transform: 'perspective(400px) rotate(0deg)', 
        transition: 'opacity 0.3s, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      exit: { 
        opacity: 0, 
        transform: position === 'top' || position === 'bottom'
          ? 'perspective(400px) rotateX(90deg)'
          : 'perspective(400px) rotateY(90deg)', 
        transition: 'opacity 0.3s, transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)'
      }
    };
  }
  
  return positionAnimations[position];
}; 