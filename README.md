# Fileclient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.2.

## Features

###Login 
 - UI - this is a button

#### Behaviors / artifacts
 - login object working from firebase
 - Use settings to connect to AWS S3

#### Stories
1. x - get router and tabs to 'Objects' and 'Admin' screens
 - ng generate module app-routing --flat --module=app
 - command from a-t-o-h
2. x - get the login and firebase basics from the full names project.
Log in to retrieve S3 credential settings from Firestore
 - get structure from fullnames.  
 		- might want to fix firebase full names if i discover why it isnt working in the process of doing final project.
 - copied in login service from the fullnames project.
 - This might not be the stuff needed: npm install --save firebase-tools
 - 
 
### 'Objects' SCREEN
 
 Display S3 “root” prefix an upload target prefix (directory)
 - UI working, rippedout the list-all-objects library.  using was sdk directly
#### Stories 
1. Build a component template
 Show a clickable listing of existing prefixes one separator longer than the root prefix (subdirectories)
 
### Click a prefix to:
 - browse down one level treating prefix separators as directories
 - establish a new target prefix.
 
 Provide text input allowing the user to add a level (later, maybe some levels) to the target prefix (subdirectories to be created on upload) 
  - This is locally managed state
 
 Display the current target prefix above a file input drop area. (updated per previous "add a level")
 
 Second Scope: Drag and drop from the local system to the drop area uploads the dropped file to the current target prefix.
 
 Keep an audit trail (in fire store) of prefixes browsed.

 Second scope: Keep audit trail of uploads in Firestore.
 
 Maintain history of target prefixes.
 
###'Admin' SCREEN
 
 display clickable list of past prefixes (later, re-purpose this as a bread crumb trail i the UI)
 
 Clicking prefix routes to TARGET SCREEN with clicked prefix as current target.
 
###AUDIT SCREEN
 
 Admin user sees audit list of 
  1. Browsed prefixes
  2. second scope: uploads.
 
###Misc Requirements
 
 Target screen is the dashboard
 
 TBD what component will fulfill the child requirement.
 
 TBD need 2 google analytics events.
 
 *ngIf
 
 *ngFor
 
 NgClass
 
 Some style theme.
 
 Authguard for admin on audit screen.
 
 Block nav to audit screen do non-admin.
 
 Firebase list of admin users, incl e-mail Chandler provides.
 
 3 tests in addition to cli generates tests.
 
 Firebase as above.
 
 ##Extra credit
 
 logout after max time.

