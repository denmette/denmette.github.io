provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1" # ACM certificates for CloudFront must be in us-east-1
}

# S3 Bucket for static website
resource "aws_s3_bucket" "blog" {
  bucket = "casteels.dev"
}

resource "aws_s3_bucket_public_access_block" "blog" {
  bucket                  = aws_s3_bucket.blog.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "blog" {
  bucket = aws_s3_bucket.blog.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = "*",
      Action    = "s3:GetObject",
      Resource  = "${aws_s3_bucket.blog.arn}/*"
    }]
  })
}

# ACM Certificate in us-east-1
resource "aws_acm_certificate" "blog_cert" {
  provider          = aws.us-east-1
  domain_name       = "casteels.dev"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.blog_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = "Z003579951UE5LAOF83P"
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "blog_cert" {
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.blog_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "blog" {
  aliases = ["casteels.dev"]
  origin {
    domain_name = aws_s3_bucket.blog.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.blog.id}"

    s3_origin_config {
      origin_access_identity = ""
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.blog.id}"

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers_policy.id
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

# Route 53 DNS Record
resource "aws_route53_record" "blog" {
  zone_id = "Z003579951UE5LAOF83P"
  name    = "casteels.dev"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.blog.domain_name
    zone_id                = aws_cloudfront_distribution.blog.hosted_zone_id
    evaluate_target_health = false
  }
}


# cloudfront_headers
resource "aws_cloudfront_response_headers_policy" "security_headers_policy" {
  name = "security-headers-policy"

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
      override                = true
      content_security_policy = "default-src 'self';"
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
