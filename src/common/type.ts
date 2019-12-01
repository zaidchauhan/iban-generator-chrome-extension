// type definations
interface DynamicObject {
  [name: string]: number;
}

interface Message {
  type: MessageType;
  value: string | number;
}

enum MessageType {
  PASTEIBAN,
}

export {
  DynamicObject,
  Message,
  MessageType,
};
