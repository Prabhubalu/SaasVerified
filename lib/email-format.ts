/** Reasonable “looks like an email” check (aligned with typical HTML email + server zod). */
export function isValidEmailFormat(email: string): boolean {
  const t = email.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

/** Actionable hint when the value is non-empty but invalid. */
export function getEmailGuidance(raw: string): string {
  const t = raw.trim();
  if (!t) return "Enter your email address so we can reach you.";
  if (/\s/.test(t)) {
    return "Emails can’t include spaces. Try you@company.com (one continuous address).";
  }
  if (!t.includes("@")) {
    return "Use an @ between your name and domain — for example you@gmail.com or you@company.com.";
  }
  const segments = t.split("@");
  if (segments.length > 2) {
    return "Use a single @ only. Example: name@company.com.";
  }
  const local = segments[0] ?? "";
  const domain = segments[1] ?? "";
  if (!local) {
    return "Add the part before @ (your name or inbox), e.g. priya@company.com.";
  }
  if (!domain) {
    return "Add the domain after @, such as gmail.com or yourcompany.in.";
  }
  if (!domain.includes(".")) {
    return "The domain after @ should include a dot, like .com, .in, or .org.";
  }
  const afterLastDot = domain.slice(domain.lastIndexOf(".") + 1);
  if (afterLastDot.length < 2) {
    return "Finish the domain with at least two letters after the last dot (e.g. .com).";
  }
  return "Double-check the spelling — use a format like name@domain.com.";
}
