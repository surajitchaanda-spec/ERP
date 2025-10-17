variable "image" {
  type = string
}

variable "replica_count" {
  type    = number
  default = 1
}

resource "kubernetes_namespace" "backend" {
  metadata {
    name = "erp-backend"
  }
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "erp-backend"
    namespace = kubernetes_namespace.backend.metadata[0].name
  }
  spec {
    replicas = var.replica_count
    selector {
      match_labels = {
        app = "erp-backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "erp-backend"
        }
      }
      spec {
        container {
          name  = "backend"
          image = var.image
          port {
            container_port = 3000
          }
          env {
            name  = "NODE_ENV"
            value = "production"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "erp-backend"
    namespace = kubernetes_namespace.backend.metadata[0].name
  }
  spec {
    selector = {
      app = "erp-backend"
    }
    port {
      port        = 80
      target_port = 3000
    }
  }
}
