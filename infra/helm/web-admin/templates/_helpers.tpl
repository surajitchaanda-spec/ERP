{{- define "erp-web-admin.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "erp-web-admin.fullname" -}}
{{- $name := default .Chart.Name .Values.fullnameOverride -}}
{{- printf "%s" $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "erp-web-admin.labels" -}}
helm.sh/chart: {{ include "erp-web-admin.name" . }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/name: {{ include "erp-web-admin.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "erp-web-admin.selectorLabels" -}}
app.kubernetes.io/name: {{ include "erp-web-admin.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
