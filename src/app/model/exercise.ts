
export class Exercise{
    Users: User[] = [{UserId:'Teja',UserName:'Teja'},{UserId:'Mark',UserName:'Mark'},{UserId:'Mark',UserName:'Mark'}];
    Activities: Workout[] = [{Workout:'Running', UserId: 'Teja', Name: 'Teja'},{Workout:'Jogging', UserId: 'Teja', Name: 'Teja'}];
    Notifications : Notification[] = [];
}
export class Workout{
    public Workout: string;
    public UserId: string;
    public Name: string;
}

export class User{
    public UserId: string;
    public UserName: string;
}

export class Notification{
    public Message: string;
    public UserName: string;
    public time: Date;


}

