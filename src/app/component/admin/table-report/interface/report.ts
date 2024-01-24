import { Comment } from "./comment";
import { Post } from "./post";
import { User } from "./user";

export interface Report{
    userReport: User,
    dataReportId:number, // cai nay co the la id của post nếu người ta report bài viết , còn nếu report comment thì là id của comment
    reportType:number ,// 1 la report post  , 2 là report comment nhớ tuyền đúng nhé,
    // userReportId:number,// là id người report
    reason:string,
    data: Post | Comment,
    id: number
  }
