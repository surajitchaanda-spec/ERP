variable "kubeconfig" {
  type        = string
  description = "Path to kubeconfig file"
}

variable "backend_image" {
  type        = string
  description = "Container image for backend"
}

variable "web_admin_image" {
  type        = string
  description = "Container image for web admin"
}
