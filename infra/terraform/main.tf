terraform {
  required_version = ">= 1.3.0"
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.21"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.9"
    }
  }
}

provider "kubernetes" {
  config_path = var.kubeconfig
}

provider "helm" {
  kubernetes {
    config_path = var.kubeconfig
  }
}

module "backend" {
  source = "./modules/backend"

  image        = var.backend_image
  replica_count = 2
}

module "web_admin" {
  source = "./modules/web_admin"

  image        = var.web_admin_image
  replica_count = 2
}
