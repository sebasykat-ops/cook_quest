export abstract class ValueObject<TProps> {
  protected constructor(protected readonly props: TProps) {}

  public equals(other: ValueObject<TProps>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
