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

export function prettifySeconds(seconds: number, resolution?: string) {
  if (seconds !== 0 && !seconds) {
    return "";
  }

  if (seconds < 60) {
    return Math.round(seconds) + " second" + (seconds == 1 ? "" : "s");
  }

  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (resolution === "day") {
    return d + (d == 1 ? " day" : " days");
  }

  const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  const hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " min" : " mins") : "";
  const sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";

  let result = dDisplay + hDisplay + mDisplay;
  if (seconds < 60 * 15) {
    result = result + ", " + sDisplay;
  }
  if (mDisplay === "") {
    // remove the trailing ", " after hr(s)
    result = result.slice(0, result.length - 2);
  }

  return result;
}

// Function to generate random number
export const randomNumber = ({ min, max }: { min: number; max: number }) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
export const calculateAspectRatioFit = ({
  srcWidth,
  srcHeight,
  maxWidth,
  maxHeight,
}: {
  srcWidth: number;
  srcHeight: number;
  maxWidth: number;
  maxHeight: number;
}) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
};
