# Posts list


## Description

- Showing posts list as a grid and each post details (title , description , created at date ).
- Ability to navigate to post details page.
- Ability to search spacific post title or post decription.

## Folder structure
![image](https://github.com/user-attachments/assets/1d3ab55f-9ba5-429f-bc85-9c7dd1d988f9)


## Main packages
 - "tailwindcss"  : "3.4.3"  
 - "pinia"        : "^3.0.3"
 - "vuetify"      : "^3.8"       

## Setup Project local
- first, clone it by using "git clone https://github.com/Noha-Abdelkader/posts-list.git" command.
- then, install packages by using "yarn install" command.
- last, run project locally by using "yarn dev" command.
- navigate by browser to [ base port url + "/" ] to get post page.
- while click on one post, navigate to [ base port url + "/[id]" ] to get post details.

- Note : I am not able to deploy on server as base url for task use "http" not "https" and server not support http request.

## Main composable
- useInfinityScroll

* hwo to use
* 
         const {
            isLoading,
            error,
            payload: posts,
            hasMore,
            initialize,
            initialLoad,
            haveData,
         } = useInfiniteScroll<Post>(fetchPosts);

Explain each :
  
| Key           | Type       |  Default           | Description      |
| ------------- | ------------- |------------- | ------------- |
| initalize  | Function  | ---  | Function  | To Fetch endpoint of list at the first time.
| initialLoad  | Boolean  | false  | if this is first time to fetch endpoint of list or not (true/false).
| isLoading  | Boolean  | false | fetch start (true) fetch end (false).|
| error  | object  | "Failed to load data"  | showing error in key call error['message'].  |
| payload  | Array of objects  | []  |  data from fetc  |
| haveData  | Boolean  | false  | if payload array have objects or not (true / false).  |
| hasMore  | Boolean  | false  | while scroll if endpoint have more data to show & not the last page (true) & if reach to lastPage  (false)  |
  
 
 Description : 
* by passing fetch function that list posts ofter mounted .
* at first:
-  check if this is initial loaded or not.
- if initial load fetch endpoint By using "initialize(1)"  1 refer to "page = 1" initially.
- if not initial load pass it to "handleScrollFun",  which re-call fetch function BUT each time increase page by "+1" to get next page data.
- combine data already fetched with new data fetch, so able to show all data in UI.
- compare between "current page" & "last page" to check if thier is more data to load or not .
- if yes, this mean user will be able to scroll down with help from  "observer js" to check if user reach to end of screen or not to refetch "handleScrollFun" getting more data.
- if not, will display message "no more posts to load." 

* Note :
  - when naviagte from "BASE_URL_PORT/[id]" to "BASE_URL_PORT/"
  - scroll to selected post is not working perfectly with posts exceed "20 post" view ,  as "per_page" params by default.
  - Because, when user back to "BASE_URL_PORT/", refetch data from the first ,so  if the selected post id was "30" for example , window will not detected thier position "as they didn't load yet".
- i guess best solution in that case, to cash data, i prefer using  "tanstack " package but unfortunately, it was the last thing and I didn't have time to handle this case.

  

DEMO LINK : https://drive.google.com/file/d/13ys2rkNab3jNwh1HamxlL7tovYrisfSH/view?usp=sharing

![image](https://github.com/user-attachments/assets/78b4a875-c783-409d-8d26-1f865b8ee8a1)
![image](https://github.com/user-attachments/assets/d8b9269b-4a65-48ed-8f08-a5f1a1a3e4a2)
![image](https://github.com/user-attachments/assets/65bfb5e3-22d0-4578-90a7-0d0a650668e4)



