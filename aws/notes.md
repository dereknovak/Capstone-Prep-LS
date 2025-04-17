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

## SSL/TLS

- Load Balancer handles the SSL Certificate
- Manage SSL Certificates using AWS Certificate Manager (ACM)
- You can upload your own certificates

### SNI

- Server Name Indiciation
- Allows you to load multiple SSL Certificates onto one web server
- Requires the client to *indicate* the hostname of the target server in the initial SSL handshake
    - The server will then find the correct certificate or return a default one

- Only works for ALB and NLB
- Does not work for CLB

## Connection Draining

- Name Differences:
    - Connection Draining - CLB
    - Deregistration Delay - ALB and NLB
- Time to complete 'in-flight requests' while the instance is de-registering or unhealthy
- Stops sending new requests to the EC2 instance which is de-registering
- Can be set between 1-3600 seconds
    - Default = 300
- Can be disabled (0)
- Set to a low value if your requests are short

## Auto Scaling Group

- Load on your websites and applications can change quickly
- In cloud, you can/remove servers very quickly

- Goal of ASG:
    - Scale out (add EC2 instances) to match an increased load
    - Scale in (remove EC2 instances) to match decreased load
    - Ensure we have a min and max number of EC2 instance running
    - Automatiicaly register new instances to a load balancer
    - Re-create an EC2 instance to replace an unhealthy one

Set Capacities:
    - Min
    - Desired
    - Max
    - Scale in and out as needed

### Attributes

- A *Launch Template*
    - AMI + Instance Type
    - EC2 User Data
    - EBS Volumes
    - Security Groups
    - SSH Key Pair
    - IAM Roles for your EC2 instances
    - Network + Subnet Information
    - Load Balancer Information
- Min Size / Max Size / Initial Capactity (must define)
- Scaling Policies

### Auto Scaling

- Scale an ASG using CloudWatch alarms
    - Alarms monitor metrics (Average CPU, custom metric)
- Based on alarm
    - Create scale-out policies
    - Create scale-in policies

### Auto Scaling Policies

- Dynamic Scaling
    - Target Tracking Scaling
        - Simple set-up
    - Simple / Step Scaling
- Scheduled Scaling
    - Anticipate a scaling based on known usage patterns
- Predictive Scaling
    - Continuously forecast load and schedule scaling ahead

- Metrics to Scale on
    - CPUUtilization
    - RequestCountPerTarget
    - Average Network In/Out
    - Any Custom Metric

### Cooldown

- After scaling activity, you enter cooldown period
- ASG will not launch or terminate additional instances
    - Allows metrics to stabilize

# RDS ************************************************

- Relational Database Service
- Managed DB service for DB use SQL as a query language
- Allows you to create databases in cloud that are managed by AWS
    - Postgres
    - MySQL
    - MariaDB
    - Oracle
    - Microsoft SQL Server
    - IBM DB2
    - Aurora (AWS Proprietary DB)

- Why use RDS?
    - A managed service
        - Automated provisioning, OS patching
        - Continuous backups and restore to specific timestamp
        - Monitoring dashboards
        - Read replicas for improved read performance
        - Multi AZ setup for Disaster Recovery (DR)
        - Maintenance windows for upgrades
        - Scaling capability (vertical/horizontal)
        - Storage backend by EBS
    - BUT...you CANNOT SSH into your instances

## Storage Auto Scaling

- Helps you increase storage on your RDS DB instance dynamically
- RDS scales automatically when it detects you are running out of free DB storage
- Avoid manually scaling your DB storage

- Set a Maximum Storage Threshold
- Automatically modify storage if:
    - Free storage < 10% allocated storage
    - Low-storage lasts at least 5 mins
    - 6 hours have passed since last modification

- RDS is useful for applications with unpredicatable workloads
- Supports all RDS database engines

## Read Replicas

- Help you scale your reads
- If an outside client wants to run reports on your DB without slowing down the server, a Read Replica can be made to asyncronously allow the client to have read access without affecting the production application
- Read replicas are only for querying (SELECT, not INSERT/UPDATE)

## RDS Multi-AZ

- Associated with Disaster Recovery
- Synchronous Replication
- Increase availability
- Failover in case of loss of AZ, loss of network, instance or storage failure
- No manual intervention in apps
- Not used for scaling

- No one can read from it, no one can write to it, it's just there as a standby in case of an emergency
- You *can* set up read replicas as a Multi-AZ Disaster Recovery

## RDS Custom

- Managed Oracle and Microsoft SQL Server DB with OS and database customization
- RDS Custom
    - RDS: Automates setup, operation, and scaling
    - Custom: Access to underlying DB and OS so you can:
        - Configure settings
        - Install patches
        - Enable native features
        - Access the underlying EC2 Instance using SSH or SSM Session Manager
- De-activate Automation Mode to perform your customization
    - Better to take a DB snapshot before

### RDS vs RDS Custom

- RDS: Entire DB and the OS to be managed by AWS
- RDS Custom: Full admin access to the underlying OS and the DB

## Amazon Aurora

- Proprietary Technology from AWS
- Postgres and MySQL are both supported as Aurora DB
    - Drivers for both will work for Aurora DB
- Aurora is "AWS cloud optimized" and is signifantly faster than MySQL/Postgres
- Aurora storage automatically grows in increments of 10GB, up to 128TB
- Can have up to 15 Read Replicas
- Failover in Aurora is instataneous, it's HA native
- Costs more than RDS, but much more efficient

### High Availability and Read Scaling

- 6 copies of your data across 3 AZ
- Self-healing with peer-to-peer replication

- One Aurora Instance takes writes (Master)
- Master + up to 15 Aurora Read Replicas serve reads
- Support for Cross Region Replication

### Aurora DB Cluster

- Writer Endpoint
    - Always points to the master
        - Even if the master fails, the client will still be connected to WE
- Reader Endpoint
    - Connection Load Balancing

### Aurora Advanced Concepts

- Aurora Replica Auto Scaling
    - Automatically adds Read Replicas by extending the reader endpoint
        - Brings down overall CPU usage
- Aurora Custom Endpoints
    - Define  a subset of Aurora Instances as a Custom Endpoint
    - The Reader Endpoint is generally not used after defining Custom Endpoints
        - Allows you to query only a subset of your Aurora replicas
- Aurora Serverless
    - Automated DB instatiation and auto-scaling based on actual usage
    - Good for infrequent, intermittent or unpredictable workloads
    - No capacity planning needed
- Global Aurora
    - Aurora Cross Region Read Replicas:
        - Useful for disaster recovery
        - Simple to put in place
    - Aurora Global Database (recommended)
        - 1 Primary Region (r/w)
        - Up to 5 seconary (r-only) regions, replcation lag is less than 1 second
        - Up to 16 Read Replicas per secondary region
        - Helps for decreasing latency
        - Allows you to have an Aurora Replica in another AWS Region
        - **Typical cross-region replacation takes less than 1 second**
- Aurora Machine Learning
    - Enables you to add ML-based predictions to your application via SQL
    - Simple, optimized, and secure integration between Aurora and AWS ML services
    - Supports:
        - Amazon SageMaker
        - Amazon Comprehend
    - You don't need ML experience
    - Use Cases:
        - Fraud detection
        - Ads targeting
        - Sentiment analysis
        - Product recommendations

## RDS Backup

- Automated Backups
    - Daily full backup of the DB
        - Happens during backup window
    - Transaction logs are backed-up by RDS every 5 mins
        - Ability to restore to any point in time
            - Oldest => 5 mins ago
    - 1-35 days of retention
        - set 0 to disable automated backups
- Manual DB Snapshots
    - Manually triggered by user
    - Retention of backup for as long as you want
        - Automated will expire
  
- Trick
    - In a stopped RDS database, you will still pay for storage
    - If you plan on stopping for a long time, you should snapshot and restore instead

## Aurora Backups

- Automated Backups
    - 1-35 days (cannot be disabled)
    - Point-in-Time recovery in that timeframe
- Manual DB Shapshots
    - Manually triggered by user
    - Retention of backup for as long as you want

## Restore Options

- Restoring a RDS/Aurora backup or snapshot creates a new DB
- Restoring MySQL RDS database from S3
    - Create a backup of your on-premises DB
    - Store it on Amazon S3 (object storage)
    - Restore the backup onto a new RDS instance running MySQL
- Restoring MySQL Aurora cluster from S3
    - Create a backup of your on-premises DB using Percona XtraBackup
    - Store the backup file on Amazon S3
    - Restore the backup file onto a new Aurora cluser running MySQL

## Aurora DB Cloning

- Create a new Aurora DB Cluster from an existing one
- Faster than snapshot and restore
- Uses copy-on-write protocol
    - New DB cluster uses the same data volume as original DB cluster initially
    - With updates on new DB cluster data, additional storage is allocated and data is copied separately
- Very fast/cost-effective
- Useful to create a 'staging' DB from a 'production' DB without impacting the production DB

## RDS and Aurora Security

- At-rest encryption
    - DB master and replicas encryption using AWS KMS - must be defined at launch time
    - If master is not encrypted, the read replicas cannot be encrypted
    - To encypt an un-encrypted  DB, go through a DB snapshot and restore as encrypted
- In-flight encryption
    - TLS-read by default
    - Use the AWS TLS root certificates client-side
- IAM Authentication
    - IAM roles to connect to your DB (instead of User/PW)
- Security Groups
    - Control Network access to your RDS / Aurora DB
- No SSH available, except on RDS Custom
- Audit Logs can be enabled and sent to CloudWatch Logs for longer retention

## RDS Proxy

- Fully managed DB proxy for RDS
- Allows apps to pool and share DB connections established with the DB
- Improves DB efficiency by reducing the stress on DB resources and minimize open conenctions/timeouts
- Serverless, autoscaling, highly available (Multi-AZ)
- Reduced RDS and Aurora failover time by up to 66%
- Supports RDS
- No code changes required for most apps
    - Just connect to proxy rather than RDS/Aurora DB
- Enforce IAM Authentication for DB
    - Securely stores credentials in AWS Secrets Manager
- RDS Proxy is never publicly acccessible
    - Must be accessed from VPC

# Amazon ElastiCache

- ElastiCache is use to get managed Redis or Memcached
    - Similar to how RDS is used to manage DB
- Caches are in-memory DB with really high performance/low latency
- Helps reduce load off of DB for read intensive workloads
- Helps make your application stateless
- AWS handles:
    - OS maintenance/patching
    - optimizations
    - setup
    - monitoring
    - failure recovery
- **Using ElastiCache involves heavy code changes**

- Architectures
    - DB Cache
        - Applications queries ElastiCache
            - If not available, get from RDS and store in ElastiCache
        - Helps relieve load in RDS
        - Cache must have an invalidation strategy to make sure only the most current data is used there
    - User Session Store
        - User logs into any of the application
        - The application writes the session data into ElastiCache
        - The user hits another instance of our application
        - The instance retrieves the data and the user is already logged in

## Redis vs Memcached

- Redis
    - REPLICATION (Node => Node)
    - Muti-AZ with Auto-Failover
    - Read Replicas to scale reads and have high availability
    - Data Durability using AOF persistence
    - Backup and restore features
    - Supports Sets and Sorted Sets
- Memcached
    - SHARDING (Node + Node)
    - Multi-node for partitioning of data (sharding)
    - No High Availability (replication)
    - Non-persistent
    - Backup and restore (serverless)
    - Multi-threaded architecture

## Security

- Supports IAM Authentication for Redis
    - Everything else requires user/pw
- IAM policies on ElastiCache are only used for AWS API-level security
- Redis AUTH
    - You can set a pw/token when you create a Redis Cluster
    - This is an extra level of security for your cache
    - Supports SSL in flight encryption
- Memcached
    - Supports SASL-based authentication

## Patterns

- Lazy Loading
    - All read data is cached
    - Data can become stale in cache
- Write Through
    - Adds or updates data in the cache when written to a DB
    - No stale data
- Session Store
    - Store temporary session data in a cache with TTL (Time-To-Live) features

# Amazon S3

- Main building blocks of AWS
- "Infinitely scaling storage"

## Use Cases

- Backup and storage
- Disaster Recovery
- Archiving
- Hybrid Cloud Storage
- Application Hosting
- Media Hosting
- Data Lakes and Big Data Analytics
- Software Delivery
- Static Websites

## Buckets

- Objects are stored in Buckets
- Must have a globally unique name
    - across all regions and all accounts
- Defined at the Region level
- Naming Convention
    - No uppercase, no underscore
    - 3-63 chars long
    - Not an IP
    - Must start with lowercase letter or number
    - Not start with prefix xn--
    - Not end with suffix -s3alias

## Objects

- Objects are files with a key
- The key is the FULL path
    - s3://my-bucket/<my_file.txt>
    - s3://my-bucket/<my_folder1/another_folder/my_file.txt>
- Key is composed of *prefix* + *object name*
    - `my_folder/another_folder/`
    - `my_file.txt`
- No concept of 'directories' within buckets

- Object values are the content of the body
- Metadata
    - List of text key/value pairs
- Tags
    - Unicode key/value pair
    - useful for security/lifecycle
- Version ID

## Security

- User-Based
    - IAM Policies
- Resource-Based
    - Bucket Policies
    - Object Access Control List (ACL)
    - Bucket Access Control List (ACL)

- An IAM principal can access an S3 object if:
    - The user IAM permissions allow it OR the Resource Policy allows it
    - AND no explicit Deny

- Encryption Key

### Bucket Policies

- JSON based policies
    - Resources
    - Effect
    - Actions
    - Principal

- Use Bucket Policy to:
    - Grant public access to the bucket
    - Force objects to be encrypted at upload
    - Grant access to another account

## Static Website Hosting

- S3 can host static websites and have them accessible on the internet
- URL format
    - `http://bucket-name.s3.website-aws-region.amazonaws.com`
    - `http://bucket-name.s3-website-aws-region.amazonaws.com`

- 403 Forbidden error => Needs to be public (unsafe!)

## Versioning

- Enabled at the bucket level
- Best practice to version your buckets
    - Protects against unintended deletes
    - Easy to roll back to previous version

## Replication (CRR and SRR)

- Cross-Region Replication (CRR)
- Same-Region Replication (SRR)

- Must enable versioning in source and destination buckets
- Buckets can be in different AWS accounts
- Copying is asynchronous
- Must give proper IAM permissions to S3

- Use Cases:
    - CRR
        - Compliance
        - lower latency access
        - replication
    - SRR
        - Log aggregation
        - Live replication between production and test accounts

## Storage Classes

- Amazon S3 Standard (General Purpose)
    - Big Data Analytics
    - Mobile/Gaming apps
    - Content Distribution
- Amazon S3 Standard-Infrequent Access
    - Disaster Recovery
    - Backups
- Amazon S3 One Zone-Infrequent Access
    - Storing secondary backups of on-premise data
- Amazon S3 Glacier Instant Retrieval
    - Access data once/quarter
- Amazon S3 Glacier Flexible Retrieval
    - Expedited (1-5 mins)
    - Standard (3-5 hrs)
    - Bulk (5-12 hrs)
- Amazon S3 Glacier Deep Archive
    - Standard (12 hrs)
    - Bulk (48 hrs)
- Amazon S3 Intelligent Tiering

### Durability and Availability

- Durability
    - How many times an object will be lost by S3
    - High Durability - 99.9999999% percent

- Availability
    - How readily available a service is
    - 53 minutes/year will not be available