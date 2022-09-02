namespace api.Models {
  public class ResponseBase<T> {
    public ResponseBase(T value) {
      this.value = value;
    }
    public T value { get; private set; }
  }
}