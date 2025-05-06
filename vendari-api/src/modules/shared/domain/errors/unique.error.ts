export class UniqueError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UniqueError';
  }
}
export default UniqueError;
