export default class extends Error {
  constructor(message) {
    super(message);
    this.validationErrorMessage = message;
  }
}
