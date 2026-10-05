import { create } from "zustand";

export type Message = {
  id: number;
  message: string;
  author: "user" | "model";
};

interface MessagesStore {
  messages: Message[];
  saveMessage: (newMessage: Message) => void;
}

const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],

  saveMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
}));

export default useMessagesStore;
