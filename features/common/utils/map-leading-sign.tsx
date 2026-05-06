export function mapLeadingSign(number: number): string {
    return number > 0 ? `+${number}` : number.toString();
}
