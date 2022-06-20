export const abbreviatedAddress = (address: string | undefined) => {
  if (address) {
    return address.substring(0, 6) + "..." + address.substring(address.length, address.length - 6);
  }
};

export function trimNumberString(number = "0", precision = 0) {
  // why would number ever be undefined??? what are we trimming?
  const array = number.toString().split(".");
  if (array.length === 1) return number.toString();
  if (precision === 0) return array[0].toString();

  const poppedNumber = array.pop() || "0";
  array.push(poppedNumber.substring(0, precision));
  const trimmedNumber = array.join(".");
  return trimmedNumber;
}
