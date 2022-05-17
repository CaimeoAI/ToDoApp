const inquirer = require("inquirer");
const prompt = require("prompt-sync")({sigint:false});

//! Main Menu
let todoList = []

let index = todoList.length   //* Declaring Variable that counts the number of objects inside todoList for later use
// console.table(todoList)

async function mainMenu() {

        let input = await inquirer.prompt({
            name: "todo",
            type:"list",
            message:"Please select any option:",
            choices: [
            "Add new item",
            "Update item status",
            "Edit items",
            "Filter items",
            "Show All items",
            "Delete item",
            "Show finished", 
            "Exit",
            "New Option"]})
 
        switch(input.todo) {
            
            case ("Add new item"):
                
                let Task = prompt("Enter Task:")
                let Deadline = prompt("Enter Deadline:")
                let Topic = prompt("Enter Topic:")
                console.clear();
                todoList.push({Number:++index, Task, Deadline, Topic, Time: new Date().toLocaleString(), done: false})
                //* Does the exact same as below, just shorter

                console.table(todoList);

                break

            case ("Update item status"):
                let updateChoice = prompt("Which Task do you want to update:") //* Let's the user select which Task to update
                todoList[updateChoice-1].done = !todoList[updateChoice-1].done  //* Reverse done-Value of selected Task
                console.clear()
                console.table(todoList);
                break

            case ("Edit items"):
                let editChoiceNumber = +prompt("Which Task do you want to edit:")

                let editChoice = await inquirer.prompt({
                    name: "editKey",
                    type:"list",
                    message:"Please select any option to edit:",
                    choices: ["Task", "Deadline", "Topic"]})

                switch(editChoice.editKey) {
                    case "Task":

                        let taskChange = prompt("Enter new Task:")
                        todoList[editChoiceNumber-1].Task = taskChange
                        console.clear();
                        console.table(todoList);

                        break

                    case "Deadline":
                        
                        let deadlineChange = prompt("Enter new Deadline:")
                        todoList[editChoiceNumber-1].Deadline = deadlineChange
                        console.clear();
                        console.table(todoList);

                        break

                    case "Topic":
                        
                        let topicChange = prompt("Enter new Topic:")
                        todoList[editChoiceNumber-1].Topic = topicChange
                        console.clear();
                        console.table(todoList);

                        break
                }

                break

            case ("Filter items"):
                let topicFilter = prompt("Filter Topics by:")    //? Let's user input by what he wants to filter
                todoListFiltered = todoList.filter(element => element.Topic===topicFilter)   //? creates a copy of todoList and puts objects which meet the requirement inside
                console.clear();
                console.table(todoListFiltered)
                break

            case ("Show All items"):
                console.clear();
                console.table(todoList);
                break    

            case ("Delete item"):
                let deleteChoice = +prompt("Which Task do you want to delete:")  //* Takes user Input which gets converted to number
                todoList = todoList.filter(element => element.Number!==deleteChoice)  //* Filters todoList and creates new todoList without selected Choice

                for(x in todoList) {           //* Refreshes Number keys for all objects in todoList
                    todoList[x].Number = +x+1
                }
                console.clear()
                console.table(todoList);
                break

            case ("Show finished"):
                console.clear();
                console.table(todoList.filter(item => item.done===true))
                break
            
            case ("Exit"):
                return
        }

    mainMenu()    

}

mainMenu()



