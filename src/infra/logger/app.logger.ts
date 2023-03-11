export class AppLogger {
  fail(obj: any) {
    console.log(
      JSON.stringify({
        datetime: new Date().toISOString(),
        ...obj
      })
    );
  }
}
