AWS Notes

# IAM

- IAM => Identity and Access Management, Global Service

## Users and Groups

- Root account created by default
    - Just used to set up account
- Create Users
    - People within your organization, can be grouped
    - Groups can only contain users, no groups

## Permissions

- Users/Groups can be assigned JSON documents called policies
- Policies define permissions

## Policies Inheritance

- Users within a group inherit group-scoped policies
- Inline policy
    - Only attached to 1 User

## Policy Structure

1. Version (Policy Language Version)
2. Id (ID of Policy)
3. Statement (Individual statements) [{}, {}]
    1. Sid (ID of statement)
    2. Effect (Allow/Deny access)
    3. Principal (Account/User/Role statement is applied)
    4. Action (Actions policy allows)
    5. Resource (Resources action is applied)
    6. Condition (optional)

## Password Policy

- Set up password policy
    - Require:
        - Uppercase
        - Lowercase
        - Numbers
        - etc
    - Allow users to change their own password
    - Require change after specific time
    - Prevent re-use
- Multi-Factor Authentication (MFA)
    - Password you know + security device you own

## MFA Device Options

- Virtual MFA device
    - Google Authenticator
    - Authy
- Universal 2nd Factor (U2F) Security Key
    - YubiKey
- Hardware Key Fob MFA Device
    - Gemalto
- Hardware Key Fob for GovCloud
    - SurePassID

## Accessing AWS

1. AWS Management Console
2. AWS Command Line Interface (CLI)
3. AWS Software Developer Kit (SDK)

- Access Keys are generated through AWS Console
    - Users manage their own keys

## AWS CLI

- Direct access to public APIS of AWS services
- Open Source https://github.com/aws/aws-cli
- Alternate to using AWS Console

## AWS SDK

- Language-specific APIs
- Enables you to access and manage AWS sercices programmatically
- Embedded within your application
- Supports most frameworks/languages

## Cloudshell

- Only available in some regions
- Acts as a terminal within the AWS website
- Defaults to current region
- Can easily upload/download files using `Actions`

## IAM Roles

- Acts as a User, but they are intended to be used by AWS Services
- Common Roles
    1. EC2 Instance Roles
    2. Lambda Function Roles
    3. Roles for CloudFormation

## IAM Security Tools

- IAM Credentials Report (account-level)
    - Report that lists all account's users and status of their credentials
- IAM Last Accessed (user-level)
    - Shows service permissions granted to user and when they were last accessed

- Able to see the permissions that are rarely used and minimize permissions

## Best Practices and Guidelines

- Do not use root account except for setup
- One physical user == one AWS user
- Assign users into groups and assign permissions there
- Create a strong password policy
- Use and enforce MFA
- Create and use Roles
- Use Access Keys for Programmatic Access (CLI/SDK)
- Audit permissions with Credentials Report and Last Accessed
- NEVER share IAM users and Access keys

## Summary

- Users: Mapped to physical user, has PW
- Groups: Only contains Users
- Policies: JSON of permissions
- Roles: EC2 Instances or AWS services
- Security: MFA + Password Policy
- AWS CLI: Manage AWS via CLI
- AWS SDK: Manage AWS via programming language
- Access Keys: Access AWS using ^^^
- Audit: Credentials Reports and Last Accessed

# Budget

# EC2

- Elastic Compute Cloud => Infrastructure as a Service
- Main components
    - Renting Virtual Machines (EC2)
    - Storing Data on Virtual Drives (EBS)
    - Distributing load across machines (ELB)
    - Scaling services using auto-scaling group (ASG)

## Configuration

- OS (Linux, Windows, MacOS)
- Computing Power and Cores (CPU)
- RAM
- Storage Space
    - Network-attached (EBS and EFS)
    - Hardware (Instance store)
- Network Card
    - Speed of card
    - Public IP address
- Firewall
- Bootstrap Script

## EC2 User Data

- Bootstrap instances using EC2 User Data script
- Bootstrap
    - Launching commands when machine starts
    - Main purposes
        - Installing updates
        - Installing software
        - Download common files from internet
        - Anything you want
- EC2 User Data Script runs with root user (sudo)

- When restarting an instance, the public ipv4 address will change, so you cannot simply refesh the page
    - Private ipv4 address will *not* change

## Instance Types

- Naming conventions
    - m5.2xlarge
        - m: instance class
        - 5: generation
        - 2xlarge: size within the instance class

### General Purpose

- Great for diversity of workloads
- Balance between
    - Compute
    - Memory
    - Networking
- Mac, T4g, T3, T3a, T2, M6g, M5, M5a, M5n, M5zn, M4, A1

### Compute Optimized

- Great for compute-intensive tasks that require high performance processors
    - Batch processing workloads
    - media transcoding
    - high performance web servers
    - High performance computing (HPC)
    - Scientific modeling and machine learning
    - Gaming servers
- C6g, C6gn, C5, C5a, C5n, C4

### Memory Optimized

- Fast performance for workloads that process large data sets in memory
    - High performance for databases
    - Distributed web scale cache stores
    - In-memory databases optimized for buisiness intelligence (BI)
    - Applications performing real-time processing of big unstructured data
- R6g, R5, R5a, R5b, R5n, R4, X1e, X1, High Memory, z1d

### Storage Optimized

- Great for storage-intensive tasks
    - High frequency online transaction processing (OLTP)
    - Relational and NoSQL databases
    - Cache for in-memory databases (Redis)
    - Data warehousing applications
    - Distributed file systems
- I3, I3en, D2, D3, D3en, H1

## Security Group

- Control how traffic is allowed in or out of EC2 instance
- Only contain `allow` rules
- Security groups rules can reference by IP or security group

- Regulate:
    - Access to ports
    - Authorized IP ranges
    - Control of outbound network (from instance to other)

- Good to know
    - Can be attached to multiple instances
    - Locked down to a region/VPC combination
    - Does live 'outside' the EC2 - if traffic is blocked the EC2 won't see it
    - It's good to maintain one separate security group for SSH access
    - If your application is not accessible (timout), it's a security group issue
    - If 'connection refused' error, then it's an application error or not launched
    - All inbound traffic is blocked by default
    - All outbound traffic is allowed by default

- Important ports
    - 22 => SSH (secure shell - Linux instance)
    - 21 => FTP (File transfer protocol)
    - 22 => SFTP (Secure FTP)
    - 80 => HTTP
    - 443 => HTTPS
    - 3389 => RDP (remote desktop protocol - Windows instance)

## SSH

- Can be used on Mac, Linux, and Windows >= 10
    - Windows < 10 => PuTTY

## SSH with Linux/MacOSX

- SSH allows you to control a remote machine using the command line

- To access the instance from terminal
    - `ssh -i KEY.pem ec2-user@PUBLIC_IP`

- If permissions are rejected, change permissions for the `.pem`. file
    - `chmod 0400 KEY.pem`

## IAM Roles

- NEVER enter your personal info into `aws configure`, as anyone will be able to access your instance
    - Instead, use IAM Roles

## Purchasing Options

- EC2 On Demand
    - Recommended for short-term and un-interupted workload
    - **Come whenever and pay full price
- Reserved Instances
    - Recommended for steady-state usage applications (databases)
    - Can only reserve for 1 or 3 years
    - **Plan ahead and get a discount
- Savings Plans
    - **Pay x amount per hour to stay in any room
- Spot Instances
    - Can lose instance at any time
    - Useful for workloads that are resilient to failure
    - Not suitable for critical jobs or databases
    - **Bid for rooms to stay in and highest bidder keeps room. Can be kicked out whenever
- Dedicated Hosts
    - Allows you address compliance requirements and use your existing server-bound software licenses
    - **Book entire building
- Dedicated Instances
    - You have your own instance on your own hardware
- Capacity Reservations
    - Suitable for short-term, uninterupted workloads that needs to be in a specific AZ
    - **Book room even if you don't stay in, but you can come and go as you please

** Resort analogy

## Spot Fleet

- Spot Fleet is a set of Spot Instances and optionally On-Demand Instances. It allows you to automatically request Spot Instances with the lowest price.

# IP

## Public vs Private IP

- Public
    - Public IPs can be identified on the internet
    - Must always be unique (no 2 machines can share the same IP)
    - Geo-location can be easily found
- Private
    - Private IPs can only be identified on a private network
    - IP must be unique across the private network
        - 2 different companies can have the same private IP
    - Machines connect to the internet via internet gateway (proxy)
    - Only certain range of IPs can be used as a private IP
- Elastic IP
    - Starting/Stopping instance will change its public IP
    - If you need a fixed public IP, you need an Elastic IP
    - Can be attached to one instance at a time
    - Can only have 5 Elastic IPs on AWS
        - Try to avoid using them

## Placement Groups

- Provides control over where the EC2 instance to be placed within AWS
- Strategies
    - Cluster - clusters isntances into a low-latency group
        - high performance, high risk
    - Spread - Spreads instance across underlying hardware
    - Partition - Spead instances across different partitions

### Cluster

- All instances are in the same AZ
- Pros
    - Great network
Cons
    - If AZ fails, all instances will fail
- Uses
    - Big data job that needs to be completed fast
    - Application that needs extremely low latency and high network

### Spread

- All instances are located on different hardware
- Pros
    - Can span across AZs
    - Reduced risk of simultaneous failure
- Cons
    - Limited to 7 instances per AZ
- Uses
    - Applications that need to maximize high availability
    - Critical Applications where instances must be isolated from failure from each other

### Partition

- Up to 7 partitions per AZ
- Can span across multiple AZ in same region
- Up to 100s of EC2 Instances
- Partition can affect many EC2 Instance but not other partitions
- Use Cases
    - Big Data applications
        - HDFS, HBase, etc...

## ENI (Elastic Network Interfaces)

- Logical component in a VPC that represents a Virtual Network Card
- Following Attributes
    - Primary Private IPv4, 1 or more secondary IPv4
    - One Elastic IP per private IPv4
    - One or more Security Groups
    - MAC address
- Can create ENIs on the fly and move to EC2 Instances
- Bound to a specific AZ
- ENIs give us more control over your network interfaces as they are not deleted upon termination of a EC2 Instance