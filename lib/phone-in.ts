/** Last 10 digits for CRM systems that expect a plain national number. */
export function digitsOnlyPhoneLast10(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10) return digits.slice(-10);
  return digits;
}

/** Validates Indian mobile numbers: 10 digits (6–9 start), optional leading 0 or +91/91. */
export function isValidIndiaPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
  if (digits.length === 11 && digits.startsWith("0")) {
    return /^[6-9]\d{9}$/.test(digits.slice(1));
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }
  return false;
}
