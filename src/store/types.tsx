export interface RootState {
    mainPage: {
      students: { name: string; id: string, groupName: string }[];
      groups: { name: string; id: number }[];
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      error: string | null;
    };
};