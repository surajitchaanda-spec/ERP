variable "image" {
  type = string
}

variable "replica_count" {
  type    = number
  default = 1
}

resource "kubernetes_namespace" "web" {
  metadata {
    name = "erp-web"
  }
}

resource "kubernetes_deployment" "web" {
  metadata {
    name      = "erp-web-admin"
    namespace = kubernetes_namespace.web.metadata[0].name
  }
  spec {
    replicas = var.replica_count
    selector {
      match_labels = {
        app = "erp-web-admin"
      }
    }
    template {
      metadata {
        labels = {
          app = "erp-web-admin"
        }
      }
      spec {
        container {
          name  = "web-admin"
          image = var.image
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "web" {
  metadata {
    name      = "erp-web-admin"
    namespace = kubernetes_namespace.web.metadata[0].name
  }
  spec {
    selector = {
      app = "erp-web-admin"
    }
    port {
      port        = 80
      target_port = 80
    }
    type = "LoadBalancer"
  }
}
