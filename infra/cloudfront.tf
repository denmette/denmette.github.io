###
# All AWS Cloudfront related stuff
##

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "casteels-dev OAC"
  description                       = "Origin Access Control for S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cf_distribution" {
  comment             = "Cloudfront distribution for the frontend of the blog project."
  aliases             = ["casteels.dev"]
  price_class         = "PriceClass_100"
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.blog.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.blog.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    target_origin_id           = "S3-${aws_s3_bucket.blog.id}"
    viewer_protocol_policy     = "redirect-to-https"
    origin_request_policy_id   = aws_cloudfront_origin_request_policy.website_origin_request_policy.id
    cache_policy_id            = aws_cloudfront_cache_policy.website_cache_policy.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.response_headers_policy.id
    min_ttl                    = 0
    default_ttl                = 3600
    max_ttl                    = 86400
    compress                   = true

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_function.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.blog_cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_cloudfront_distribution" "redirect_www" {
  origin {
    domain_name = "www.casteels.dev.s3-website.eu-west-1.amazonaws.com"
    origin_id   = "redirect-origin"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Redirect www.casteels.dev to casteels.dev"
  default_root_object = "index.html"

  aliases = [
    "www.casteels.dev"
  ]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "redirect-origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_100"

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.blog_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_cache_policy" "website_cache_policy" {
  name        = "website-cache-policy"
  default_ttl = 50
  min_ttl     = 1
  max_ttl     = 100
  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["authorization"]
      }
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_origin_request_policy" "website_origin_request_policy" {
  name = "website-origin-request-policy"
  cookies_config {
    cookie_behavior = "none"
  }
  headers_config {
    header_behavior = "none"
  }
  query_strings_config {
    query_string_behavior = "none"
  }
}

resource "aws_cloudfront_response_headers_policy" "response_headers_policy" {
  name = "casteels-dev-response-headers-policy"

  custom_headers_config {
    items {
      header   = "permissions-policy"
      value    = "accelerometer=(),autoplay=(),camera=(),encrypted-media=(),fullscreen=*,geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),sync-xhr=(),usb=(),xr-spatial-tracking=()"
      override = true
    }
  }

  security_headers_config {
    strict_transport_security {
      override                   = true
      include_subdomains         = true
      preload                    = true
      access_control_max_age_sec = 31536000
    }

    content_security_policy {
      override = true
      # content_security_policy = "default-src 'self';"
      content_security_policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://casteels.dev; style-src 'self' 'unsafe-inline' https://casteels.dev; img-src 'self' https://casteels.dev data:;"
    }

    content_type_options {
      override = true
    }

    frame_options {
      override     = true
      frame_option = "DENY"
    }

    referrer_policy {
      override        = true
      referrer_policy = "strict-origin-when-cross-origin"
    }

    xss_protection {
      override   = true
      mode_block = true
      protection = true
    }
  }
}

resource "aws_cloudfront_function" "rewrite_function" {
  name    = "casteels-dev-rewrite-url"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = file("${path.module}/function.js")
}