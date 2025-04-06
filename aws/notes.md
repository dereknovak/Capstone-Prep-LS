AWS Notes

# IAM ************************************************

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

# Budget *********************************************

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

# IP *************************************************

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

## EC2 Hibernate

- When stopping:
    - Stop: Data on disk is kept intact
    - Terminate: Any EBS volumes also set-up to be destroyed is lost

- Upon starting again
    - OS boots and EC2 User Data script is run
    - OS boots up
    - Application starts, caches warm up, takes time

- Hibernate
    - In-memory state is preserved
        - Instance boot is much faster
    - The RAM is written to a file in the root EBS volume
    - The root EBS volume must be encrypted
- Use cases
    - Long running processes
    - Saving RAM state
    - Services that take time to initialize

# Instance Storage ***********************************

## EBS

- EBS Volume
    - Elastic Block Store: A network drive you can attach to your instances while they run
        - Uses the network to communicate the instances, may be latency
        - Can be detached from a EC2 instance and attached to another quickly
    - Allows instances to persist data, even after termination
    - Bound to specific AZ
    - Think of it as a network USB stick
    - Have a provisioned capacity, in GBs, not IOPS
        - Can increase capacity over time
    - EBS volume can only be attached to 1 instance
        - Multiple EBS volumes can be attached to an instance

## Snapshot

- A backup (snapshot) of your EBS volume
- Not necessary when detaching a volume, but recommended
- Can copy snapshots acoss AZ or region

### Features

- Snapshot Archive
    - Move Snapshot to an 'archive tier' that is 75% cheaper
    - Takes within 24-72 hours
- Recycle Bin for Snapshots
    - Can recover after accidental deleting
    - Specify retention (1 day => 1 year)
- Fast Snapshot Restore (FSR)
    - Force full initialization of snapshot to have no latency on first use
    - Expensive

## AMI

- Amazon Machine Image
- Powers Instances
- A customization of an EC2 instance
- Built for a specific region (can be copied across AZs)
- Can launch EC2 instances from:
    - A public AMI (AWS provided)
    - Your own AMI (maintain yourself)
    - AWS marketplace AMI (made by someone else)

### Process

- Start an EC2 instance and customize it
- Stop the instance (for data integrity)
- Build an AMI
    - This also creates EBS snapshots
- Launch instances from other AMIs
    - Launches much quicker than a traditional instance

## Instance Store

- EBS Volumes are network drives with good but 'limited' performance
- EC2 Instance Store provides *high-performance hardware disk*

- Better I/O performance
- If you stop/terminate instance, data will be lost (ephemeral)
- Good for:
    - buffer
    - cache 
    - scratch data
    - temporary content
- EBS is better for long-term storage
- Risk of data loss if hardware fails
- Backups and Replication are your responsibility

## EBS Volume Types

- 6 different types:
    - gp2 / gp3 (SSD)
        - General purpose balance price/performance
    - io1 / io2 Block Express (SSD)
        - Highest performance for mission critical low latency
    - st1 (HDD)
        - Low cost HDD
    - sc1 (HDD)
        - Lowest cost HDD volume designed for less frequency
- EBS Volumes are characterized in Size, Throughput, IOPS (I/O Ops/sec)
- Only gp2/gp3 and io1/io2 Block Express can be used as boot volumes

### General Purpose SSD

- Cost effective storage, low latency
- gp3 can independently set the IOPS and the throughputs
    - gp2, they are linked together

### Provisioned IOPS

- io1/io2 Block Express
- Use cases:
    - Critical business applications with sustained IOPS performance
    - Great for databases workloads (sensitive to storage perforamance and consistency)
    - Supports EBS Multi-attach

### Hard Disk Drives (HDD)

- Cannot be a boot volume
- Throughput Optimized HDD (st1)
- Cold HDD (sc1)
    - Scenarios where lowest cost is important

## EBS Multi-Attach

- Only available for io1/io2
- Attach the same EBS volume to multiple EC2 instances in the same AZ
- Each instance has full r/w permissions to the high-performance volume
- Use Cases:
    - Achieve higher application availability in clustered Linux applications
    - Applications must manage concurrent write operations
- Up to 16 EC2 instances at a time
- Must use a file system that is cluster-aware.

## EBS Encryption

- When you encrypt a volume:
    - Data at rest is encrypted
    - All data in flight is encrypted
    - All snapshots are encrypted
    - All volumes created from snapshot are encrypted
- Encryption and Decryption are done transparently (you do nothing)
- Encryption has minimal impact on latency
- Leverages keys from KMS
- Copying an unencrypted snapshot allows encryption
- Snapshots of encrypted volumes are encrypted

### Encrypt an unencrypted EBS volume

1. Create EBS snapshot of volume
2. Encrypt the EBS snapshot (using copy)
3. Create new EBS volume from snapshot (volume will also be encrypted)
4. Attach encrypted volume to original instance

## Amazon EFS
///// REVISIT HANDS ON //////

- Elastic File System
- Managed NFS (network file system) that can be mounted on many EC2
- EFS works with EC2 instances in multi-AZ
- Highly available, scalable, expensive (3x gp2), pay per use

- Use Cases
    - Content Management
    - Web serving
    - data sharing
    - Wordpress
- Uses NFSv4.1 protocol
- Uses security group to control access to EFS
- Compatible with Linux based AMI (not Windows)
- Encryption at rest using KMS

- POSIX file system (~Linux) that has a stanard file API
- File system scales automatically
    - pay-per-use
    - no capacity planning

### Performance

- EFS Scale
- Performance Mode (set at EFS creation time)
    - General Purpose (default)
    - Max I/O
- Throughput Mode
    - Bursting
    - Provisioned
    - Elastic

### Storage Classes

- Storage Tiers
    - Standard
    - Infrequent Access (EFS-IA)
    - Archive (rare access)
    - Implement *lifecycle policies* to move between tiers

- Availability and Durability
    - Standard
    - One Zone

- Using the right storage classes, you can save up to 90%.

## EBS vs EFS

- EBS volumes:
    - One instance (except multi-attach io1/io2)
    - Locked at the AZ level
    - gp2: IO increases if disk size increases
    - gp3 and io1: can increase IO independently
    - To migrate an EBS volume across AZ:
        - Take a snapshot
        - Restore the snapshot to another AZ
        - EBS backups use IO and you shouldn't run them while your app is handling lots of traffic
    - Root EBS volumes of instances get terminated by default if the EC2 instance gets terminated
- EFS
    - Mounting 100s of instances across AZs
    - EFS share website files (WordPress)
    - Only for Linux Instances (POSIX)
    - Higher price
    - Can leverage Storage Tiers for cost savings

- EFS vs EBS vs Instance Store

# High Availability and Scalability ******************

## Vertical Scaling

- Increasing the Size of an instance
- Call Center: Take in more calls/min

## Horizontal Scaling

- Increasing number of instances
- Call Center: Hire more employees to take calls

## High Availability

- Run instances for same application across multiple AZs
- Call Center: One building in NY, One building in SF

## Load Balancing

- Servers that forward traffic to multiple servers downstream
- Why use it?
    - Spread load across multiple downstream instances
    - Expose a single point of access (DNS) to your application
    - Seamlessly handle failures of downstream instances
    - Do regular health checks to your instances
    - Provide SSL termination (HTTPS) for your website
    - Enfore stickiness with cookies
    - High availability across zones
    - Separate public traffic from private traffic

- Why use an Elastic Load Balancer?
    - An ELB is a *managed load balancer*
        - AWS guarantees it will be working
        - AWS takes care of upgrades, maintenance, high availability
        - AWS provides only a few configuration knobs
    - It costs less to setup your own, but it will be a LOT more effect for you
    - It is integrated with many AWS offerings/services

- Health Checks
    - Checks that an EC2 instances is working
    - Crucial for Load Balancers
    - Enable the load balancer to know if instances it forwards traffic to are available to reply to requests
    - Done on a port and a route (`/health` is common)
    - 200 => OK, anything else is unhealthy

### Types of Load Balancers

- Classic Load Balancer (CLB) (v1 => old gen)
    - Not recommended (depricated)
- Application Load Balancer (ALB) (v2 => new gen)
    - HTTP, HTTPS, WebSocket
- Network Load Balancer (NLB) (v2 => new gen)
    - TCP, TLS, UDP
- Gateway Load Balancer (GWLB)
    - Network Layer

- Can be setup as internal (private) or external (public) ELBs

## Application Load Balancer

- Layer 7 (HTTP)
- Load balancing to multiple HTTP applications across machines (target groups)
- Load balancing to multiple applications on the same machine (containers)
- Support for HTTP/2 and WebSocket
- Supports redirect to HTTPS

- Routing tables to different target groups:
    - Routing based on path
    - Routing based on hostname
    - Routing based on query string, headers

- ALB are great fit for micro services and container-based application
    - Docker, Amazon ECS
- Has a port mapping feature to redirect to a dynamic port in ECS

### Target Groups

- EC2 Instances
- ECS tasks
- Lambda functions
- IP Addresses

- ALB can route to multiple target groups
- Health checks are at the target group level

## Network Load Balancer

- Layer 4 (TCP and UDP)
- Allow you to:
    - Forward TCP and UDP traffic to your instances
    - Handle millions of requests per second
    - Ultra-low latency

- NLB has 1 static IP per AZ and supports assigning Elastic IP
- Used for extreme performance, TCP or UDP traffic
- Not included in AWS free tier

### Target Groups

- EC2 Instances
- IP Addresses, must be private
- Application Load Balancer
    - NLB is in front of ALB
- Health Checks support the TCP, HTTP, and HTTPS Protocols

## Gateway Load Balancer

- Deploy, scale, and manage a fleet of 3rd party Network Virtual Appliances in AWS
- All user traffic will go through gateway first, to the target group, back through the gateway, then to the application

- Layer 3 (IP Packets)
- Combines the following functions:
    - Transparent Network Gateway (single point entry)
    - Load Balancer (distributes traffic)
- Uses GENEVE procotol on port 6081

### Target Groups

- EC2 instances
- IP Addresses, must be private

## Sticky Sessions (Session Affinity)

- Possible to implement stickiness so that the same client is always redirected to the same instance behind a load balancer
- Works for ALB and NLB
- ALB uses a cookie that you can set the expiration
- Ensures the user doesn't lose data
- Stickiness may bring imbalance to the load over the backend EC2 instances

### Cookie Names

- Application-based Cookies
    - Custom Cookie
        - Generated by target
        - Can include custom attributes required by the application
        - Cookie name must be specified individually for each target group
    - Application Cookie
        - Generated by the load balancer
        - Cookie name is AWSALBAPP
- Duration-based Cookies
    - Cookie generated by load balancer
    - Cookie name is AWSALB for ALB or AWSELB for CLB

## Cross-Zone Load Balancing

- Balances the amount of traffic each EC2 instance receives

- ALB
    - Enabled by default
        - Can be disabled at the Target Group level
    - No charges for inter AZ data
- NLB and GLB
    - Disabled by default
    - You pay charges for inter AZ data if enabled