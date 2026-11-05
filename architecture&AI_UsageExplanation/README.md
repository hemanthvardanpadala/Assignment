# AWS Deployment Architecture

This folder contains an AWS deployment architecture diagram for the Assignment project.

Files:
- `aws-deployment-architecture.svg` — vector diagram suitable for documentation and presentations.

Suggested AWS deployment flow:
- Frontend served from Amazon S3 and distributed through Amazon CloudFront.
- Route 53 routes the custom domain to the CloudFront distribution.
- Java Spring Boot APIs run on EC2 or ECS behind an Application Load Balancer.
- Data is stored in Amazon RDS (MySQL/PostgreSQL).
- IAM, Secrets Manager, CloudWatch, and WAF help secure and monitor the system.

This architecture is designed for a production-ready deployment on AWS.
