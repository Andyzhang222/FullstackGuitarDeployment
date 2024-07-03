
## Available endpoints

#### 1. auth/signup
  Registers a new user and sends a verification code to email/phone number
  
#### 2. auth/signin
  Takes registered username and password and returns secure jwt tokens
  
#### 3. auth/verify
  Takes a username and code to verify registered account

#### 4. auth/forgot-password
  Intiates a forgot password workflow
  
#### 5. auth/confirm-password
  Confirms that old password has changed
