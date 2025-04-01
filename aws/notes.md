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
