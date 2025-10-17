export interface KeyValueStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

class MemoryStorage implements KeyValueStorage {
  private store = new Map<string, string>();

  async getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  async setItem(key: string, value: string) {
    this.store.set(key, value);
  }

  async removeItem(key: string) {
    this.store.delete(key);
  }
}

export const memoryStorage = new MemoryStorage();
