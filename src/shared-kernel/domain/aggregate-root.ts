export default abstract class AggregateRoot<TPrimitives> {
  public abstract toPrimitives(): TPrimitives;

  public toJSON(): TPrimitives {
    return this.toPrimitives();
  }
}
