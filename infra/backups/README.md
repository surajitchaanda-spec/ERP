# Backup & Disaster Recovery

- **Database Backups**: Nightly logical backups stored in encrypted S3 buckets with 35-day retention. Point-in-time recovery enabled via continuous WAL archiving.
- **Object Storage**: Critical assets mirrored across regions using S3 Cross-Region Replication.
- **Disaster Recovery Drills**: Conduct quarterly failover tests to the secondary region. Document outcomes in the incident runbook.
- **Automation**: Terraform schedules AWS Backup plans; alerts surface in Datadog when jobs fail.
