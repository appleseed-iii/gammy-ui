export const abbreviatedAddress = (address: string | undefined) => {
  if (address) {
    return address.substring(0, 6) + "..." + address.substring(address.length, address.length - 6);
  }
};
