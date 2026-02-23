import { ValueObject } from '../../../shared-kernel/domain/value-object';

interface MissionIdProps {
  value: string;
}

export class MissionId extends ValueObject<MissionIdProps> {
  private constructor(props: MissionIdProps) {
    super(props);
  }

  public static create(value: string): MissionId {
    if (!value.trim()) {
      throw new Error('MissionId cannot be empty');
    }

    return new MissionId({ value });
  }

  public get value(): string {
    return this.props.value;
  }
}
