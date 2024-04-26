import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const pagetKanAuth = [
    "/profile",
    "/dashboard"
]

const HomePage = "/"

function checkLink(link:string, list:string[]){
    for(let i = 0; i < list.length; i++){
        if(link.startsWith(list[i])){
            return true
        }
    }
    return false
}

export default withAuth(
  async function middleware(req) {
    const token = await getToken({
      req,
      secureCookie: true
    })
    console.log("token : ",token)
    const pathName = req.nextUrl.pathname
    
    if(pathName.startsWith("/api")){
      return null
    }

    //protected routes lazem ykoun connected el wa7ed bech ynajem yod5lelhom
    if(!token && checkLink(pathName, pagetKanAuth)){
        return NextResponse.redirect(new URL("/uber", req.url))
    }

    if(token){
      //nchouf el sayed 7atet kol les information fel compte wela lee
      //5ater ki ya3me login bgoogle wela git hub yon9souh 7ajet ywaliw
      const MissingAdminInfo = ((token.role === "user"))

      //kan na9se nhezou ykamel
      if(pathName.startsWith("/dashboard") && MissingAdminInfo){
        return NextResponse.redirect(new URL("/profile", req.url))
      }

      // //check if the user is verified by the admins
      // if(!token.verified){
      //   if(pathName !== "/waiting" && !pathName.startsWith(`${authanticationPage}/finalsetup`)){
      //     return NextResponse.redirect(new URL("/waiting", req.url))
      //   }
      // }

      // //kan cv n5alihech y3awed yod5ol lel login page 5ater deja jaww bahi :)
      // if(pathName === authanticationPage){
      //   return NextResponse.redirect(new URL("/", req.url))}
    }
  },
  {
    callbacks: {
      authorized() {
        return true
      },
    },
  }
)

export const config = {
    matcher:["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}