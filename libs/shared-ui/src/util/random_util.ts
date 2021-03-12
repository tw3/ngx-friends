export class RandomUtil {
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static stringGen(): string {
    const len: number = this.getRandomInt(3, 8);
    let text = '';

    const charset = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < len; i++) {
      let randomChar: string = charset.charAt(Math.floor(Math.random() * charset.length));
      if (i === 0) {
        randomChar = randomChar.toUpperCase();
      }
      text += randomChar;
    }

    return text;
  }

  static getRandomArraySubset<T>(array: T[]): T[] {
    const numItems: number = this.getRandomInt(0, array.length);
    const shuffledArray: T[] = this.shuffleArray(array);
    const arraySubset: T[] = shuffledArray.slice(0, numItems);
    return arraySubset;
  }

  static shuffleArray<T>(array: T[]): T[] {
    const result: T[] = array.slice(0);

    let currentIndex: number = result.length;
    let temporaryValue: T;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = result[currentIndex];
      result[currentIndex] = result[randomIndex];
      result[randomIndex] = temporaryValue;
    }

    return result;
  }
}
