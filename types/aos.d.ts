declare module 'aos' {
  export interface AosOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    /** Disable AOS. Accepts 'phone' | 'tablet' | 'mobile' | boolean | function */
    disable?: 'phone' | 'tablet' | 'mobile' | boolean | (() => boolean);
  }

  export function init(options?: AosOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;
}





