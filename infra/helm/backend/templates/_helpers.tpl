{{- define "erp-backend.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "erp-backend.fullname" -}}
{{- $name := default .Chart.Name .Values.fullnameOverride -}}
{{- printf "%s" $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "erp-backend.labels" -}}
helm.sh/chart: {{ include "erp-backend.name" . }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/name: {{ include "erp-backend.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "erp-backend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "erp-backend.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
