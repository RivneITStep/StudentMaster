

export class  SignalrErrorHandler {

 constructor() {}
 public  ErrorHandle(err) {
    const error = err.message.toString();
    console.log(error);
 }
}
