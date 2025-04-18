import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
}

interface GithubState {
  accessToken: string | null;
  selectedRepo: Repository | null;
  repositories: Repository[];
  setAccessToken: (token: string | null) => void;
  setSelectedRepo: (repo: Repository) => void;
  setRepositories: (repos: Repository[]) => void;
  clearGithubState: () => void;
}

export const useGithubStore = create<GithubState>()(
  persist(
    (set) => ({
      accessToken: null,
      selectedRepo: null,
      repositories: [],
      setAccessToken: (token: string | null) => set({ accessToken: token }),
      setSelectedRepo: (repo: Repository) => set({ selectedRepo: repo }),
      setRepositories: (repos: Repository[]) => set({ repositories: repos }),
      clearGithubState: () => set({ accessToken: null, selectedRepo: null, repositories: [] }),
    }),
    {
      name: 'github-storage',
    }
  )
); 