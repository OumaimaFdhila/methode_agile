import CommentsComponent from "@/components/comments/commentsComponent"
import Timer from "../timer/timer"
export default function Dashboard(){
    
    return(
        <div className=" w-full border-2 h-full p-5 flex">
            <div className="w-[50%]"><CommentsComponent/></div>
            
            <div className="w-[50%] flex flex-col">
                <div></div>
                <div className="w-[50%]"><Timer/></div>
            </div>
        </div>
    )
}