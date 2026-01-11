# denmette.github.io

Personal blog for Maarten Casteels at `https://casteels.dev`, built with Hugo and a custom theme.

## Stack
- Hugo (site generation)
- Tailwind CSS + PostCSS (styling)
- Pagefind (static search index)
- AWS S3 + CloudFront + Route53 (hosting)
- Terraform (infrastructure as code)

## Local development
Requirements:
- Hugo (extended)
- Node.js + npm

Common commands:
```sh
npm install
npm run dev
```

What it does:
- Builds the site (including drafts and future posts)
- Runs Pagefind on `public/`
- Starts the Hugo dev server

## Build
```sh
npm run build
```
Outputs the site to `public/` and generates the Pagefind index.

## Content structure
- `content/` - posts and pages
- `layouts/` - custom layouts/shortcodes
- `themes/custom/` - theme source
- `static/` - static assets copied to the site
- `resources/` - Hugo pipeline cache/artifacts

## Infrastructure
Terraform lives in `infra/` and manages:
- S3 buckets: `casteels.dev` and `www.casteels.dev`
- CloudFront distributions (main + www redirect)
- ACM certs (us-east-1) and Route53 records
- Security headers (CSP, HSTS, etc.)

Typical workflow:
```sh
terraform -chdir=infra init
terraform -chdir=infra plan
terraform -chdir=infra apply
```

Notes:
- Backend state is stored in `s3://casteels-dev-terraform-state-bucket/hugo-site/terraform.tfstate`.
- AWS credentials are required for `eu-west-1` and `us-east-1`.
- CSP allowlists are defined in `infra/cloudfront.tf` (fonts, analytics, comments, etc.).

## Comments
Comments are handled via `utteranc.es` linked to `denmette/denmette.github.io` (see `hugo.toml`).
