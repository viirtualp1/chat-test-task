export interface WSResponse {
  message?: WSChatMessage
  notification?: string
}

export interface WSChatMessage {
  from: string
  message: string
}

export enum ChatMessageType {
  // Message from contact
  INPUT = 'input',
  // Message to contact
  OUTPUT = 'output',
}

export interface ChatMessage {
  text: string
  type: ChatMessageType
  date: string
  is_read: boolean
}

export interface FormattedChatMessage {
  from: string
  messages: ChatMessage[]
}
