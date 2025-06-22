# Posts list


## Description

- showing posts list (title , description , created at date ).
- ability to navigate to post details page.
- ability to search spacific post title or post decription.

## Folder structure
![image](https://github.com/user-attachments/assets/1d3ab55f-9ba5-429f-bc85-9c7dd1d988f9)


## Packages
Main packages uses ( tailwindCss v3.4 , Pinia  , Vuetify) 

## Setup Project local
- first, clone it by using "git clone https://github.com/Noha-Abdelkader/posts-list.git" command.
- then, install packages by using "yarn install" command.
- last, run project locally by using "yarn dev" command.
- navigate by browser to [ base port url + "/" ] to get post page.

- Note : I am not able to deploy on server as base url for task use "http" not "https" and server not support http request.

## Main component
-useInfinityScroll

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

* by passing fetch function that list posts.
* at first:
-  check if this is initial loaded or not.
- if initail load fetch endpoint with fetch ""initialize(1)"  1 refer to "page = 1" initially.
- if not pass it to "handleScrollFun"  which re-call fetch function but each time increase page by "+1" to get next page data.
- combine data already fetced with new data fetch, so able to show all data in UI.
- compare between "current page" & "last page" to check if thier is more data to load or not .
- if yes, user will be able to scroll down with help from  "observer js" to check if user reach to end of screen or not to refetch "handleScrollFun" getting more data.
- if not, will display message "no more posts to load." 
- handle keys  [ "isLoading" incase data loaded &  "error"  incase error].

* Note :
  - handle scroll is not working perfectly with posts exceed "20 post" view as "per_page" params by default.
  - when user back to post list, refetch data from the first so window will not detected thier position "as they didnt load".
- i guess best solution in that case, to cash data, i prefer using  "tanstack " package but unfortunately, it was the last thing and I didn't have time to handle this case.

  

DEMO LINK : https://drive.google.com/file/d/13ys2rkNab3jNwh1HamxlL7tovYrisfSH/view?usp=sharing
![image](https://github.com/user-attachments/assets/78b4a875-c783-409d-8d26-1f865b8ee8a1)
![image](https://github.com/user-attachments/assets/d8b9269b-4a65-48ed-8f08-a5f1a1a3e4a2)
![image](https://github.com/user-attachments/assets/65bfb5e3-22d0-4578-90a7-0d0a650668e4)



