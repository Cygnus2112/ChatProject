export type IChatMessage = {
  id: number;
  author: 'user' | 'gpt';
  content: string;
  createdAt?: number;
  loading?: boolean;
};

export type ITask = {
  title: string;
  subtitle: string;
  avatarUri: string;
};
