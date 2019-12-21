
export default class Validator{
    constructor(configs){
        configs.forEach(element => {
            switch (element.Name) {
                case 'ProjectName':
                    this.ProjectName=element;
                    break;
                case 'CStackholders':
                    this.CStackholders = element;
                    break;
                case 'CustCustomers':
                    this.CustCustomers = element;
                    break;
                case 'CDescription':
                    this.CDescription = element;
                    break;
                case 'PDescription':
                    this.PDescription = element;
                    break;
                case 'Challenges':
                    this.Challenges = element;
                    break;
                case 'Comments':
                    this.Comments = element;
                    break;
                case 'ProjectTopic':
                    this.ProjectTopic = element;
                    break;
                case 'Year':
                    this.Year = element;
                    break;
                case 'Semester':
                    this.Semester = element;
                    break;
                case 'advisor[0]':
                    this.FirstAdvisor = element;
                    break;
                case 'advisor[1]':
                    this.SecondAdvisor = element;
                    break;
                case 'Goals':
                    this.Goals = element;
                    break;
                case 'GoalDescription':
                    this.GoalDescription = element;
                    break;
                case 'GoalStatus':
                    this.GoalStatus = element;
                    break;
                case 'Module':
                    this.Module = element;
                    break;
                case 'ModuleName':
                    this.ModuleName = element;
                    break;
                case 'ModuleDescription':
                    this.ModuleDescription = element;
                    break;
                case 'Technologies':
                    this.Technologies = element;
                    break;
                case 'HashTags':
                    this.HashTags = element;
                    break;
                case 'ScreenShots':
                    this.ScreenShots = element;
                    break;
                case 'ProjectLogo':
                    this.ProjectLogo = element;
                    break;
                case 'Github':
                    this.Github = element;
                    break;
                case 'Students':
                    this.Students = element;
                    break;
                case 'Name':
                    this.StudentName = element;
                    break;
                case 'Picture':
                    this.StudentPicture = element;
                    break;
                case 'Email':
                    this.StudentEmail = element;
                    break;
                case 'Id':
                    this.StudentId = element;
                    break;
                case 'CustomerLogo':
                    this.CustomerLogo = element;
                    break;
                case 'ProjectSite':
                    this.ProjectSite = element;
                    break;
                case 'GooglePlay':
                    this.GooglePlay = element;
                    break;
                case 'CustomerName':
                    this.CustomerName = element;
                    break;
                default:
                    break;
            }
        });
    }
}