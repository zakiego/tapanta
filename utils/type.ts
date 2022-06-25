export type HookTelegram = {
  update_id: number;
  message: MessageTelegram;
};

export type MessageTelegram = {
  message_id: number;
  from: {
    id: string;
    is_bot: boolean;
    first_name: string;
    username: string;
    language_code: string;
  };
  chat: {
    id: number;
    first_name?: string;
    username?: string;
    title?: string;
    type?: "group" | "private";
    all_members_are_administrators?: boolean;
  };
  date: number;
  text: string;
};
