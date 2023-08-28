export const getFirstWord = (sentence = "") => sentence.split(" ")[0];

export function phoneNumber(phoneNumber: string | undefined): string {
  if (!phoneNumber) return "";

  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  if (numericPhoneNumber.length < 10) {
    return numericPhoneNumber; // Return as is
  }

  const formattedPhoneNumber = `(${numericPhoneNumber.slice(
    0,
    3
  )}) ${numericPhoneNumber.slice(3, 6)}-${numericPhoneNumber.slice(6)}`;

  return formattedPhoneNumber;
}

export default { phoneNumber, getFirstWord };
