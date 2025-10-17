# Infrastructure

Starter Terraform modules and Helm charts for deploying the ERP platform to Kubernetes clusters.

## Terraform

The Terraform module provisions namespaces, deployments, and services for both backend and web admin
workloads. Update `backend_image` and `web_admin_image` variables to reference published container
images.

## Helm Charts

Use the provided charts as a baseline for cluster-specific configuration. Each chart deploys a
Deployment and Service and exposes sensible defaults for image overrides and scaling.
