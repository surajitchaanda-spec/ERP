export interface OfflineRecord<T> {
  id: string;
  data: T;
  updatedAt: number;
  status: 'pending' | 'synced' | 'conflict';
}

export class OfflineStore<T extends { id: string; updatedAt: number }> {
  private records: Map<string, OfflineRecord<T>> = new Map();

  constructor(initialRecords: OfflineRecord<T>[] = []) {
    initialRecords.forEach((record) => this.records.set(record.id, record));
  }

  upsert(record: T) {
    const existing = this.records.get(record.id);
    if (existing && existing.data.updatedAt > record.updatedAt) {
      this.records.set(record.id, { ...existing, status: 'conflict' });
    } else {
      this.records.set(record.id, {
        id: record.id,
        data: record,
        updatedAt: record.updatedAt,
        status: 'pending',
      });
    }
  }

  markSynced(id: string) {
    const record = this.records.get(id);
    if (record) {
      this.records.set(id, { ...record, status: 'synced' });
    }
  }

  resolveConflict(id: string, resolver: (record: OfflineRecord<T>) => OfflineRecord<T>) {
    const record = this.records.get(id);
    if (!record) return;
    const resolved = resolver(record);
    this.records.set(id, { ...resolved, status: 'pending' });
  }

  list(status?: OfflineRecord<T>['status']) {
    return Array.from(this.records.values()).filter((record) => (status ? record.status === status : true));
  }
}
