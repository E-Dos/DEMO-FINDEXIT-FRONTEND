
export class Helper {

  static digitDate(dt: Date) {
    if (dt && dt instanceof Date) {
      let day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()
      let year = dt.getFullYear()
      let m = dt.getMonth() + 1
      let monthName = m < 10 ? '0' + m : m;
      return `${day}.${monthName}.${year}`
    }
    return ''
  }
}
