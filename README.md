# FFlag Discord Bot 🚩
A discord bot which allows you to control feature flags, right inside of discord!

This is the first frontend for my [backend fflag api](https://github.com/29cmb/FFlagAPI)

The bot can be added to your server through [this link](https://discord.com/oauth2/authorize?client_id=1275172440695246979&permissions=8&integration_type=0&scope=bot)

![image](https://github.com/user-attachments/assets/95b2590a-4b5e-4fe8-9cdd-0b3eced269ec)

# What is a Fast Flag?
A fast flag is a key value pair which is used to asynchronously toggle features on multiple different instances without having to manually update every single one, very useful for games and high-traffic services which can't have long down-time/outages.

# Command list
> `/create [name: string] [value: any]`
> 
> Create a new fast flag value

> `/set [name: string] [value: any]`
> 
> Set the value of a flag

> `/delete [name: string]`
> 
> Delete a flag

> `/flags`
> 
> Send an embed will all of the flags

> `/lock [name: string]`
> 
> Lock a flag, making it read-only

> `/unlock [name: string]`
> 
> Unlock a flag, making it writable

> `/logs`
> 
> View all actions made with the bot
