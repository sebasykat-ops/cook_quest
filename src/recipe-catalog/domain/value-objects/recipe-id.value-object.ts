import { ValueObject } from '../../../shared-kernel/domain/value-object';

interface RecipeIdProps {
  value: string;
}

export class RecipeId extends ValueObject<RecipeIdProps> {
  private constructor(props: RecipeIdProps) {
    super(props);
  }

  public static create(value: string): RecipeId {
    if (!value.trim()) {
      throw new Error('RecipeId cannot be empty');
    }

    return new RecipeId({ value });
  }

  public get value(): string {
    return this.props.value;
  }
}
