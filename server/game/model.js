
const ActivityStack =  [ 'Running', 'Jogging','Pushups']

function Exercise() {
    this.Users = [{UserId:'Teja',UserName:'Teja'},{UserId:'Mark',UserName:'Mark'},{UserId:'Mark',UserName:'Mark'}];
    this.Activities =[];
    this.Notifications=[];

    // remember. This is our login function. It s the function that gets called when a user sends joins for the first time.
    this.GetUsers = (userId) => {
        if(this.Users.some(x=> x.UserId == userId)){
            
        }else{
            this.Users.push({ UserId: userId, UserName: userId });
        }
            return this.Users;  
    }
    
    this.GetActivities = () => {
        return ActivityStack;
    } 

    this.SubmitActivity = (text,userId) => {
        this.Activities.push({ Text: text, UserId: userId , UserName: userId});
        console.log(text)
        console.log(userId)
    } 

    this.DisplayActivities =() => {
        return this.Activities
        }

}

module.exports = Exercise;