### Fileclient notes for grading

The app is deployed at:
https://myotherfirstproject.firebaseapp.com

An admin ID and non-admin ID are sent on 
the person to person Slack channel.

Here are some notes from my todo list on how some of 
the requirements have been met:

### Authguard 1
x - add Chandler non admin user into firebase
x - protect objects tab unless logged in
x - protect admin tab unless logged in

### Authguard 2
x - create a Chandler user with admin
/ - protect admin unless logged in user has admin attribute.

### admin in fire base
x - support admin user in firebase

### History on Admin
x - display search history on admin screen. 

### *ngIf
x - only show log listing listing if there are log messages on Admin tab
 
### *ngFor
x - object listing, admin tab message listing, or Object listing screen
 
### Child structure requirements
##### make child component of Admin to hold search it
x - message-detail is a child of admin 
x - implement MessageDetailComponent

### Google analytics
x - Import google analytics into the application adding your script tag to the index.html file.

x - Additionally declare the gtag object in the login component and send an event when the user logs in successfully
	Done like this:
		declare var gtag: any;
		
x - Add another google event (e. g. that logs when a user clicks the translate text button)
  - in LoginComponent.logout()
  - in ObjectsComponent.showFiles()

### NgClass
x - govern login logout buttons.


### Refinenents Needed
d - fix admin.guard.ts.

d - clean up the Admin tab styling

d - clean up login / logout button styles.

