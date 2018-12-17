# WitchWorkAPI
This repository is an API for WitchWork project
```
BASE_URL = "https://witchwork.me/api"
```
## 1. Embedded Lab API
This repository provide an API for my embedded system lab.\
The item in this API will contain
* action: "wait" | "ring" | "dismiss", Action of the system
* doorID: string, Unique ID for each item
* name: string, Name that will show in front-end
* status: "close" | "open", Current status of the item
> When the door is opened, status should be changed to 'open' and action should be 'wait'.  
> After that, the user will select an action from front-end and update an action into that door-item.  
> If status is 'open' and status is 'ring', the system should ring to warn everyone around that door.  
> Else do nothing.  
> When the door is close, status should be updated to 'close'.  
> 'close' with 'wait' should do nothing.  
> 'close' with 'ring' should do nothing, this will happen when the door is closed but front-end is updated lately so the action is updated from 'wait' to 'ring' after the door was closed.  
### GET /embedded
    get the current data of the doors
| Query | Type |Output |
|:---:|:---:|:---:|
| None | None | Get all doors , return a object |
#### Object description
```
{
    "items": [
        {
            "action": "wait" | "ring" | "dismiss",
            "doorID": string,
            "name": string,
            "status": "close" | "open"
        }
    ]
}
```

### POST /embedded/open/<doorID>
    Change status of that door to 'open' with action 'wait'

### POST /embedded/close/<doorID>
    Change status of that door to 'close' with action 'wait'