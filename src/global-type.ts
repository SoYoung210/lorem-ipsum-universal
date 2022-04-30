type SubmittableElementType = HTMLInputElement | HTMLButtonElement;

declare global {
  interface Event {
    submitter?: SubmittableElementType;
  }
}

export {};
