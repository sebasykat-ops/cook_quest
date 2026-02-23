import { ValueObject } from '@shared/domain/value-object';

interface RatingProps {
  value: number;
}

export class Rating extends ValueObject<RatingProps> {
  private constructor(props: RatingProps) {
    super(props);
  }

  public static create(value: number): Rating {
    if (value < 1 || value > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    return new Rating({ value });
  }

  public get value(): number {
    return this.props.value;
  }
}
