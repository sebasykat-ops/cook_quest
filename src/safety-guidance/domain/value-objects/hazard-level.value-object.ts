import { ValueObject } from '../../../shared-kernel/domain/value-object';

type HazardLevelType = 'low' | 'medium' | 'high';

interface HazardLevelProps {
  value: HazardLevelType;
}

export class HazardLevel extends ValueObject<HazardLevelProps> {
  private constructor(props: HazardLevelProps) {
    super(props);
  }

  public static create(value: HazardLevelType): HazardLevel {
    return new HazardLevel({ value });
  }

  public get value(): HazardLevelType {
    return this.props.value;
  }
}
