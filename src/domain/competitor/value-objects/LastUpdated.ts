export class LastUpdated {
  private constructor(private readonly value: Date) { }

  public static fromUnixTimestamp(timestamp: number): LastUpdated {
    const timestampInMillis = timestamp * (timestamp < 1e10 ? 1000 : 1);
    return new LastUpdated(new Date(timestampInMillis));
  }

  public static fromDate(date: Date): LastUpdated {
    return new LastUpdated(date);
  }

  public static now(): LastUpdated {
    return new LastUpdated(new Date());
  }

  public toDate(): Date {
    return this.value;
  }

  public toUnixTimestamp(): number {
    return Math.floor(this.value.getTime() / 1000);
  }

  public equals(other: LastUpdated): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  public isWithinSeconds(seconds: number, from: Date | LastUpdated = LastUpdated.now()): boolean {
    const compareDate = from instanceof Date ? from : from.toDate();
    const diffInSeconds = Math.abs((compareDate.getTime() - this.value.getTime()) / 1000);
    return diffInSeconds <= seconds;
  }
} 