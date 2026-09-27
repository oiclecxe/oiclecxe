{{- /*
  Markdown version of a page (index.md, llms-full.txt): title, description, key
  facts as a list, then the body (Markdown with shortcodes rendered) and the
  content held in front matter (objectives, program, results…). List pages add
  links to their pages. Context: page.
*/ -}}
{{- $p := . -}}
{{- $facts := slice -}}
{{- $fact := dict -}}
{{- with partial "func/solution-names.html" .Params.solutions }}
  {{- $facts = $facts | append (printf "%s : %s" (T "factSolutions") (delimit . ", ")) }}
{{- end -}}
{{- if eq .Type "training" }}
  {{- with .Params.code }}{{ $facts = $facts | append (printf "%s : %s" (T "factCode") .) }}{{ end }}
  {{- with .Params.durationDays }}{{ $facts = $facts | append (printf "%s : %s" (T "factDuration") (T "days" (int .))) }}{{ end }}
  {{- with .Params.level }}{{ $facts = $facts | append (printf "%s : %s" (T "factLevel") .) }}{{ end }}
  {{- with .Params.format }}{{ $facts = $facts | append (printf "%s : %s" (T "factFormat") .) }}{{ end }}
  {{- $facts = $facts | append (printf "%s : %s" (T "factPrice") (.Params.price | default (T "priceOnRequest"))) }}
{{- else if eq .Type "event" }}
  {{- with .Params.start }}{{ $facts = $facts | append (printf "%s : %s" (T "factDate") (partial "components/date.html" (dict "page" $p "date" (time .)) | plainify | htmlUnescape)) }}{{ end }}
  {{- $facts = $facts | append (printf "%s : %s" (T "factPlace") (cond (.Params.online | default false) (T "online") (delimit (slice (.Params.venue | default "") (.Params.city | default "")) " "))) }}
  {{- with .Params.format }}{{ $facts = $facts | append (printf "%s : %s" (T "factFormat") .) }}{{ end }}
{{- else if eq .Type "case-study" }}
  {{- with .Params.client }}{{ $facts = $facts | append (printf "%s : %s" (T "factClient") .) }}{{ end }}
  {{- with partial "func/sector-names.html" .Params.sector }}
    {{- $facts = $facts | append (printf "%s : %s" (T "filterSector") (delimit . ", ")) }}
  {{- end }}
{{- else if eq .Type "job" }}
  {{- with .Params.location }}{{ $facts = $facts | append (printf "%s : %s" (T "factPlace") .) }}{{ end }}
  {{- with .Params.contract }}{{ $facts = $facts | append (printf "%s : %s" (T "factContract") .) }}{{ end }}
  {{- with .Params.remote }}{{ $facts = $facts | append (printf "%s : %s" (T "factRemote") .) }}{{ end }}
{{- else if eq .Type "article" }}
  {{- $facts = $facts | append (printf "%s : %s" (T "factDate") (partial "components/date.html" (dict "page" $p) | plainify | htmlUnescape)) }}
  {{- with .Params.authors }}{{ $facts = $facts | append (printf "%s : %s" (T "factAuthors") (delimit . ", ")) }}{{ end }}
{{- end -}}
# {{ .Title }}
{{ with .Description }}
> {{ . | plainify }}
{{ end }}
- {{ T "factURL" }} : {{ .Permalink }}
{{- range $facts }}
- {{ . }}
{{- end }}
{{- if eq .Type "training" }}
  {{- with partial "func/upcoming-sessions.html" (dict "pages" (slice $p)) }}

## {{ T "upcomingSessions" }}
{{ range . }}
- {{ partial "components/session.html" (dict "start" .start "end" .end "city" .city "format" .format) | plainify | htmlUnescape }}
{{- end }}
  {{- end }}
  {{- range $key := slice "objectives" "audience" "prerequisites" }}
    {{- with index $p.Params $key }}

## {{ T (printf "training_%s" $key) }}
{{ range . }}
- {{ . }}
{{- end }}
    {{- end }}
  {{- end }}
  {{- with .Params.program }}

## {{ T "training_program" }}
{{ range . }}
### {{ .title }}
{{ range .items }}
- {{ . }}
{{- end }}
{{ end }}
  {{- end }}
{{- end }}
{{- if eq .Type "case-study" }}
  {{- range $key := slice "context" "challenge" "solution" "benefits" }}
    {{- with index $p.Params $key }}

## {{ T (printf "case_%s" $key) }}

{{ . }}
    {{- end }}
  {{- end }}
  {{- with .Params.results }}

## {{ T "case_results" }}
{{ range . }}
- {{ .value }} : {{ .label }}
{{- end }}
  {{- end }}
{{- end }}
{{- if eq .Type "job" }}
  {{- range $key := slice "missions" "profile" }}
    {{- with index $p.Params $key }}

## {{ T (printf "job_%s" $key) }}
{{ range . }}
- {{ . }}
{{- end }}
    {{- end }}
  {{- end }}
{{- end }}
{{- if eq .Type "event" }}
  {{- with .Params.program }}

## {{ T "eventProgram" }}
{{ range . }}
- {{ .time }} — {{ .title }}{{ with .text }} : {{ . }}{{ end }}
{{- end }}
  {{- end }}
{{- end }}
{{- with .Params.faq }}

## {{ T "faqTitle" }}
{{ range . }}
### {{ .q }}

{{ .a }}
{{ end }}
{{- end }}
{{- /* Modular pages: titles and texts of their sections. */}}
{{- range .Params.sections }}
  {{- $t := .title }}
  {{- if reflect.IsMap $t }}{{ $t = delimit (slice ($t.lead | default "") ($t.rest | default "")) " " }}{{ end }}
  {{- with $t }}

## {{ . | plainify }}
  {{- end }}
  {{- with .text }}

{{ . }}
  {{- end }}
  {{- range .items }}{{ if .q }}

### {{ .q }}

{{ .a }}{{ end }}{{ end }}
{{- end }}
{{- with .RenderShortcodes }}

{{ . }}
{{- end }}
{{- if and (not .IsPage) .Pages }}

## {{ T "mdPages" }}
{{ range .Pages }}
- [{{ .LinkTitle }}]({{ partial "func/markdown-url.html" . }}){{ with partial "func/real.html" (.Description | default "") }} : {{ . }}{{ end }}
{{- end }}
{{- end }}
