/**
 * ERRORS
 */
export class CodedError extends Error {
  public code: ERRORS;
  public hideStack: boolean;

  constructor(code: ERRORS, message: string, hideStack = false) {
    super(message);
    this.code = code;
    this.hideStack = hideStack;
    Object.setPrototypeOf(this, CodedError.prototype);
  }
}

export enum ERRORS {
  UNEXPECTED = 'UNEXPECTED',
}

/**
 * Plugin Interface
 */

export type MessageType =
  | 'sync-storage-config-value'
  | 'create-text'
  | 'replace-text';

export type ParagraphLength = 'short' | 'medium' | 'long';
export interface LoremOption {
  content: string;
}
export interface PluginMessage {
  type: MessageType;
  options: LoremOption;
}

export interface PluginEvent<T> extends Event {
  data: {
    pluginId: string;
    pluginMessage: {
      type: MessageType;
      payload: T;
    };
  };
}

export interface FontName {
  readonly family: string;
  readonly style: string;
}
