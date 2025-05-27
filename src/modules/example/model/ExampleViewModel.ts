import State from "@common/hocs/withView/decorators/State";
import Computed from "@common/hocs/withView/decorators/Computed";
import Action from "@common/hocs/withView/decorators/Action";
import Prop from "@common/hocs/withView/decorators/Prop";
import OnWatch from "@common/hocs/withView/decorators/OnWatch";
import OnMounted from "@common/hocs/withView/decorators/OnMounted";

/**
 * Эталонная ViewModel, демонстрирующая все возможности withView архитектуры
 */
export class ExampleViewModel {
  // 📦 Входные параметры от родительского компонента
  @Prop()
  initialTitle: string = "Пример MVVM";

  @Prop()
  maxCount: number = 10;

  // 🎯 Состояние компонента (автоматически становится observable)
  @State()
  count: number = 0;

  @State()
  title: string = "";

  @State()
  items: string[] = [];

  @State()
  isLoading: boolean = false;

  @State()
  message: string = "";

  // 🧮 Вычисляемые свойства (автоматически становятся computed)
  @Computed()
  get doubleCount(): number {
    return this.count * 2;
  }

  @Computed()
  get isMaxReached(): boolean {
    return this.count >= this.maxCount;
  }

  @Computed()
  get progressPercent(): number {
    return Math.min((this.count / this.maxCount) * 100, 100);
  }

  @Computed()
  get statusText(): string {
    if (this.isMaxReached) return "Достигнут максимум!";
    if (this.count === 0) return "Начните счет";
    return `Счетчик: ${this.count}`;
  }

  @Computed()
  get itemsText(): string {
    return this.items.join(", ");
  }

  // ⚡ Действия (автоматически становятся action)
  @Action()
  increment(): void {
    if (!this.isMaxReached) {
      this.count++;
      this.addItem(`Элемент ${this.count}`);
    }
  }

  @Action()
  decrement(): void {
    if (this.count > 0) {
      this.count--;
      this.items.pop();
    }
  }

  @Action()
  reset(): void {
    this.count = 0;
    this.items = [];
    this.message = "Счетчик сброшен";
  }

  @Action()
  setTitle(newTitle: string): void {
    this.title = newTitle;
  }

  @Action()
  addItem(item: string): void {
    this.items.push(item);
  }

  @Action()
  async loadData(): Promise<void> {
    this.isLoading = true;
    this.message = "Загружаем данные...";
    
    // Имитация асинхронной загрузки
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.isLoading = false;
    this.message = "Данные загружены успешно!";
    this.count = Math.floor(Math.random() * 5) + 1;
  }

  // 👀 Наблюдатели за изменениями (автоматические реакции)
  @OnWatch((vm: ExampleViewModel) => vm.count)
  onCountChange(newValue: number, oldValue: number): void {
    console.log(`Счетчик изменился с ${oldValue} на ${newValue}`);
    
    if (newValue === 0) {
      this.message = "Счетчик обнулен";
    } else if (newValue === this.maxCount) {
      this.message = "Достигнут максимум!";
    } else if (newValue > oldValue) {
      this.message = `Увеличено до ${newValue}`;
    } else {
      this.message = `Уменьшено до ${newValue}`;
    }
  }

  @OnWatch((vm: ExampleViewModel) => vm.items.length)
  onItemsLengthChange(newLength: number): void {
    if (newLength > 5) {
      console.log("Много элементов в списке!");
    }
  }

  @OnWatch((vm: ExampleViewModel) => vm.title)
  onTitleChange(newTitle: string): void {
    console.log(`Заголовок изменился на: ${newTitle}`);
  }

  // 🚀 Инициализация (вызывается автоматически после создания)
  @OnMounted()
  async initialize(): Promise<void> {
    console.log("ExampleViewModel инициализируется...");
    
    // Устанавливаем начальные значения из props
    this.title = this.initialTitle;
    this.message = "Компонент инициализирован";
    
    // Можем выполнить асинхронную инициализацию
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("ExampleViewModel готов к работе!");
  }
} 