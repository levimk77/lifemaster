document.addEventListener(`DOMContentLoaded`,func=>{
    main = document.querySelector(`main`)
    // localStorage.setItem("user_id", 21)
    // displayHomePage()
    // goalbtn = document.getElementById(`goal-btn`)
    // goalbtn.addEventListener(`click`, loadEvents)

    // journalbtn = document.getElementById(`journal-btn`)
    // journalbtn.addEventListener(`click`, loadJournal)

    // sageadvicebtn = document.getElementById(`sage-advice-button`)
    // sageadvicebtn.addEventListener(`click`, loadsageAdvice)
    displayIntroductionPage()
})
function loadsageAdvice(){
    var old_element = document.querySelector(`main`);
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    main = new_element
    fetch(`http://localhost:3000/user_sage_advices/${localStorage.user_id}`).then(resp => resp.json()).then(data => {
        main.innerHTML = `<button id="add-sage-advice-btn">Add Sage Advice</button>`
        data.forEach(dati => {
            let div = document.createElement(`div`)
            div.className = `sage-advice-card`
            let h3 = document.createElement(`h3`)
            h3.className = `sage-advice-head`
            let p = document.createElement(`p`)
            let deletebtn = document.createElement(`button`)
            let br = document.createElement(`br`)
            h3.innerHTML = dati.source
            p.innerHTML = dati.content
            deletebtn.dataset.id = dati.id
            deletebtn.className = `sage-delete-button`
            deletebtn.innerHTML = `Delete`
            div.appendChild(h3)
            div.appendChild(br)
            div.appendChild(p)
            div.appendChild(deletebtn)
            main.innerHTML += div.outerHTML
        })
      
        main.addEventListener(`submit`, function loadSageSubmit(event) {
            event.preventDefault()
            
        if (event.target.id === "add-sage-advice-form"){
            fetch(`http://localhost:3000/sage_advices/create`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_id: localStorage.user_id,
                    content: event.target.content.value,
                    source: event.target.source.value

                })}).then(resp => resp.json()).then(dati => {
                    let div = document.createElement(`div`)
                    div.className = `sage-advice-card`
                    let h3 = document.createElement(`h3`)
                    h3.className = `sage-advice-head`
                    let p = document.createElement(`p`)
                    let br = document.createElement(`br`)
                    let deletebtn = document.createElement(`button`)
                    h3.innerHTML = dati.source
                    p.innerHTML = dati.content
                    deletebtn.dataset.id = dati.id
                    deletebtn.className = `sage-delete-button`
                    deletebtn.innerHTML = `Delete`
                    div.appendChild(h3)
                    div.appendChild(br)
                    div.appendChild(p)
                    div.appendChild(deletebtn)
                    main.innerHTML += div.outerHTML
                })
            
            }
        })

        main.addEventListener(`click`, function loadSageClicks(event) {
            if (event.target.className === `sage-delete-button`){
                fetch(`http://localhost:3000/sage_advices/delete/${event.target.dataset.id}`, {
                    method: "DELETE",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'}
                }).then(resp => resp.json()).then(data => {
                    event.target.parentElement.remove()
                })
            }
            else if (event.target.id === "add-sage-advice-btn"){
                let newSageAdviceForm = document.getElementById(`add-sage-advice-form`)
                let addbtn = document.getElementById(`add-sage-advice-btn`)
                if(document.body.contains(newSageAdviceForm)){
                    newSageAdviceForm.remove()
                }
                else{
                    newSageAdviceForm = createSageAdviceForm()
                    insertAfter(newSageAdviceForm, addbtn)
                }
            }
        })
        
    })
}
function loadJournal() {
    var old_element = document.querySelector(`main`);
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    main = new_element
fetch(`http://localhost:3000/user_journal/${localStorage.user_id}`).then(resp => resp.json()).then(data => {
        main.innerHTML = `<button id="add-journal-btn">Add New Journal Entry</button>`
        data.forEach(dati => {
           let div = document.createElement(`div`)
           div.className = `journal-card`
           let ul = document.createElement(`ul`)
           let walkli = document.createElement(`li`)
           walkli.innerHTML = `time spent walking: ${dati.walk}m`
           let workoutli = document.createElement(`li`)
           workoutli.innerHTML = `time spend working out: ${dati.workout}m`
           let readli = document.createElement(`li`)
           readli.innerHTML = `time spent reading: ${dati.read}m`
           let podcastli = document.createElement(`li`)
           podcastli.innerHTML = `time spent listening to podcasts: ${dati.podcast}m`
           let mediali = document.createElement(`li`)
           mediali.innerHTML = `time spent consuming media: ${dati.media}m`
           let fruitli = document.createElement(`li`)
           fruitli.innerHTML = `amount of fruit eaten: ${dati.fruit} servings`
           let vegetableli = document.createElement(`li`)
           vegetableli.innerHTML = `amount of vegetables eaten: ${dati.vegetable} servings`
           let fishli = document.createElement(`li`)
           fishli.innerHTML = `amount of fish eaten: ${dati.fish} servings`
           let junkli = document.createElement(`li`)
           junkli.innerHTML = `amount of junk food eaten: ${dati.junk} servings`
           let deletebtn = document.createElement(`button`)
           deletebtn.className = `journal-delete-button`
           deletebtn.innerHTML = `Delete`
           deletebtn.dataset.id = dati.id 
           ul.appendChild(walkli)
           ul.appendChild(workoutli)
           ul.appendChild(readli)
           ul.appendChild(podcastli)
           ul.appendChild(mediali)
           ul.appendChild(fruitli)
           ul.appendChild(vegetableli)
           ul.appendChild(fishli)
           ul.appendChild(junkli)
           ul.appendChild(deletebtn)
           div.appendChild(ul)
           main.innerHTML += div.outerHTML
        })

})
.then(func => {
    fetch(`http://localhost:3000/user_averages/${localStorage.user_id}`).then(resp => resp.json()).then(data => {
            let addbtn = document.getElementById(`add-journal-btn`)
            let h1 = document.createElement(`h1`)
            let fooddata = 0 
            fooddata += data.fruit
            fooddata += data.vegetable
            fooddata += data.fish
            fooddata += data.junk
            let fooddata2 = 0
            fooddata2 += data.fruit
            fooddata2 += data.vegetable
            fooddata2 += data.fish
            let fooddata3 = (fooddata2 / fooddata)*100
            if (Number.isNaN(fooddata3)) {fooddata3 = 0}
            h1.innerHTML = `Daily Averages <br> walking: ${data.walk.toFixed(0)}m, exercise: ${data.workout.toFixed(0)}m, reading: ${data.read.toFixed(0)}m, podcasts: ${data.podcast.toFixed(0)}m, media: ${data.media.toFixed(0)}m. Diet: ${fooddata3.toFixed(0)}%`
            h1.id = `average-bar`
            insertAfter(h1, addbtn)
    })
    document.getElementById(`add-journal-btn`).addEventListener(`click`, function loadJournalClick1(event) {
                    let newJournalForm = document.getElementById(`new-journal-form`)
                    let avgbar = document.getElementById(`average-bar`)
                    if(document.body.contains(newJournalForm)){
                        newJournalForm.remove()
                    }
                    else{
                        newJournalForm = createJournalForm()
                        insertAfter(newJournalForm, avgbar)
                    }
    })
    main.addEventListener(`submit`, function loadJournalSubmits(event) {
        event.preventDefault()
        if (event.target.id === `new-journal-form`){
            if (Number.isInteger(parseInt(event.target.walk.value)) === false || Number.isInteger(parseInt(event.target.read.value)) === false || Number.isInteger(parseInt(event.target.walk.value)) === false || Number.isInteger(parseInt(event.target.podcast.value)) === false || Number.isInteger(parseInt(event.target.media.value)) === false || Number.isInteger(parseInt(event.target.fruit.value)) === false || Number.isInteger(parseInt(event.target.vegetable.value)) === false || Number.isInteger(parseInt(event.target.fish.value)) === false || Number.isInteger(parseInt(event.target.junk.value)) === false ){
                window.alert("Please fill out the form using integer values")
            }
            else {
                fetch('http://localhost:3000/days/new_entry',{
                    method: "POST",
                    headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        user_id : localStorage.user_id,
                        walk: event.target.walk.value,
                        workout: event.target.workout.value,
                        read: event.target.read.value,
                        podcast: event.target.podcast.value,
                        media: event.target.media.value,
                        fruit: event.target.fruit.value,
                        vegetable: event.target.vegetable.value,
                        fish: event.target.fish.value,
                        junk: event.target.junk.value
                    })
                }).then(resp => resp.json()).then(dati => {
               
                        let div = document.createElement(`div`)
                        div.className = `journal-card`
                        let ul = document.createElement(`ul`)
                        let walkli = document.createElement(`li`)
                        walkli.innerHTML = `time spent walking: ${dati.walk}m`
                        let workoutli = document.createElement(`li`)
                        workoutli.innerHTML = `time spend working out: ${dati.workout}m`
                        let readli = document.createElement(`li`)
                        readli.innerHTML = `time spent reading: ${dati.read}m`
                        let podcastli = document.createElement(`li`)
                        podcastli.innerHTML = `time spent listening to podcasts: ${dati.podcast}m`
                        let mediali = document.createElement(`li`)
                        mediali.innerHTML = `time spent consuming media: ${dati.media}m`
                        let fruitli = document.createElement(`li`)
                        fruitli.innerHTML = `amount of fruit eaten: ${dati.fruit} servings`
                        let vegetableli = document.createElement(`li`)
                        vegetableli.innerHTML = `amount of vegetables eaten: ${dati.vegetable} servings`
                        let fishli = document.createElement(`li`)
                        fishli.innerHTML = `amount of fish eaten: ${dati.fish} servings`
                        let junkli = document.createElement(`li`)
                        junkli.innerHTML = `amount of junk food eaten: ${dati.junk} servings`
                        let deletebtn = document.createElement(`button`)
                        deletebtn.innerHTML = `Delete`
                        deletebtn.dataset.id = dati.id 
                        deletebtn.className = `journal-delete-button`
                        ul.appendChild(walkli)
                        ul.appendChild(workoutli)
                        ul.appendChild(readli)
                        ul.appendChild(podcastli)
                        ul.appendChild(mediali)
                        ul.appendChild(fruitli)
                        ul.appendChild(vegetableli)
                        ul.appendChild(fishli)
                        ul.appendChild(junkli)
                        ul.appendChild(deletebtn)
                        div.appendChild(ul)
                        main.innerHTML += div.outerHTML
                        fetch(`http://localhost:3000/user_averages/${localStorage.user_id}`).then(resp => resp.json()).then(data => {
                        let h1 = document.getElementById(`average-bar`)
                        let fooddata = 0 
                        fooddata += data.fruit
                        fooddata += data.vegetable
                        fooddata += data.fish
                        fooddata += data.junk
                        let fooddata2 = 0
                        fooddata2 += data.fruit
                        fooddata2 += data.vegetable
                        fooddata2 += data.fish
                        let fooddata3 = fooddata2 / fooddata
                        if (Number.isNaN(fooddata3)) {fooddata3 = 0}
                        h1.innerHTML = `Daily Averages <br> walking: ${data.walk.toFixed(0)}m, exercise: ${data.workout.toFixed(0)}m, reading: ${data.read.toFixed(0)}m, podcasts: ${data.podcast.toFixed(0)}m, media: ${data.media.toFixed(0)}m. Diet: ${fooddata3.toFixed(0)}%`
                       
                    })
                    })
            }
        }
    })
    main.addEventListener(`click`, function loadJournalClicks2(event) {
        if (event.target.className === `journal-delete-button`){
            fetch(`http://localhost:3000/days/${event.target.dataset.id}`, {
                method: "DELETE",
                headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}})
                .then(resp => resp.json()).then(data => {
                    event.target.parentElement.parentElement.remove()
                    fetch(`http://localhost:3000/user_averages/${localStorage.user_id}`).then(resp => resp.json()).then(data => {
                        let h1 = document.getElementById(`average-bar`)
                        let fooddata = 0 
                        fooddata += data.fruit
                        fooddata += data.vegetable
                        fooddata += data.fish
                        fooddata += data.junk
                        let fooddata2 = 0
                        fooddata2 += data.fruit
                        fooddata2 += data.vegetable
                        fooddata2 += data.fish
                        let fooddata3 = fooddata2 / fooddata
                        if (Number.isNaN(fooddata3)) {fooddata3 = 0}
                        h1.innerHTML = `Daily Averages <br> walking: ${data.walk}m, exercise: ${data.workout}m, reading: ${data.read}m, podcasts: ${data.podcast}m, media: ${data.media}m. Diet: ${fooddata3.toFixed(2)}%`
                        })
                })
        }
    })
})
}
function createSageAdviceForm() {
    let newSageAdviceForm = document.createElement(`form`)
    newSageAdviceForm.innerHTML = `
                <label for="source">Title:</label>  
                <input id='title-input' name="source" type="textarea"></input>
                <br>
                <br>
                <label id="content-label" for="content">Content:</label>  
                <textarea name="content" cols="50" rows="10"></textarea>
                <input id="new-sage-advice-submit" type="submit"></input>`
    newSageAdviceForm.id = "add-sage-advice-form"
    return newSageAdviceForm
}
function createJournalForm() {
    let newJournalForm = document.createElement(`form`)
    newJournalForm.innerHTML = `
                Time spent on (in minutes)<br>
                <label for="walk">walking:</label> 
                <input name="walk" type="textarea"></input><br> 
                <label for="workout">workout:</label>  
                <input name="workout" type="textarea"></input><br>
                <label for="read">reading:</label>  
                <input name="read" type="textarea"></input><br>  
                <label for="podcast">podcasts:</label>  
                <input name="podcast" type="textarea"></input><br>  
                <label for="media">media:</label>  
                <input name="media" type="textarea"></input><br>  
                Estimated servings consumed <br>
                <label for="fruit">fruits: </label>  
                <input name="fruit" type="textarea"></input><br>  
                <label for="vegetable">vegetables:</label>  
                <input name="vegetable" type="textarea"></input><br>  
                <label for="fish">fish:</label>  
                <input name="fish" type="textarea"></input><br>  
                <label for="junk">junk food:</label>  
                <input name="junk" type="textarea"></input><br>  
                <input id="new-journal-submit" type="submit"></input>`
    newJournalForm.id = "new-journal-form"
    return newJournalForm
}
function createGoalForm() {
    let newGoalForm = document.createElement(`form`)
    newGoalForm.innerHTML = `
                <label for="description">Goal Description:</label>  
                <input name="description" type="textarea"></input>  
                <input class="submit-goal-btn" type="submit"></input>`
    newGoalForm.className = "new-goal-form"
    return newGoalForm
}
function loadEvents(){
    var old_element = document.querySelector(`main`);
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    main = new_element
    fetch(`http://localhost:3000/user_events/${localStorage.user_id}`).then(resp => resp.json()).then(data =>{ 
    main.innerHTML = `<button id="add-goal-btn">Add New Goal</button>`
    data.forEach(dati =>{ 
        if (dati.parent_event_id === null){
        div = document.createElement(`div`)
        div.className = 'top-div'
        div.innerHTML += `<li class=${dati.completion_status} data-id='${dati.id}'>${dati.description}</li><button data-id='${dati.id}' class='add-sub-event'>add subgoal</button><button data-id='${dati.id}' class='toggle-complete'>toggle complete</button><button data-id='${dati.id}' class='delete-button'>Delete</button>`
        main.appendChild(div)
    }
    })
    }).then(func =>{
        addgoalbtn = document.getElementById(`add-goal-btn`)
        main.addEventListener(`click`, function loadEventsClicks(event) {
            if (event.target.id === `add-goal-btn`){

                let newGoalForms = document.getElementsByClassName(`new-goal-form`)
                if(document.body.contains(newGoalForms[0])){
                    newGoalForm.remove()
                }
                else{
                    newGoalForm = createGoalForm()
                    newGoalForm.dataset.id = event.target.id
                    newGoalForm.children[1].id = `top-add-goal-input`
                    insertAfter(newGoalForm, addgoalbtn)
                }
            }
            else if(event.target.className===`toggle-complete`){
                let completion_status = null
                if (event.target.previousSibling.previousSibling.className == "true") {
                        completion_status = "false"}
                else if (event.target.previousSibling.previousSibling.className == "false") {
                completion_status = "true"}
                fetch(`http://localhost:3000/events/${event.target.dataset.id}`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completion_status: completion_status
                    })
                }).then(resp => resp.json()).then(data =>{ 
                    if (data.completion_status === true){
                        data.completion_status = "true"
                    } 
                    else if (data.completion_status === false){
                        data.completion_status = "false"
                    }
                    event.target.previousSibling.previousSibling.className = data.completion_status
                })
            }
            else if (event.target.className === `add-sub-event`){
                let allsubgoalforms = document.getElementsByClassName(`new-sub-goal-form`)
                let newSubGoalForm = null
                if (allsubgoalforms.length !== 0){
                    for (var i = 0; i < allsubgoalforms.length; i++){
                        if (allsubgoalforms[i].dataset.id === event.target.dataset.id){
                            newSubGoalForm = allsubgoalforms[i]
                        }
                    }
                }
                let data_id = event.target.dataset.id
                if(document.body.contains(newSubGoalForm)){
                    newSubGoalForm.remove()}
                else{
                   let newGoalForm = createGoalForm()
                    newGoalForm.className=`new-sub-goal-form`
                    newGoalForm.dataset.id = data_id
                    newGoalForm.children[2].className = `sub-submit-goal-form-btn`
                    insertAfter(newGoalForm, event.target.nextSibling.nextSibling)
                }
            }
            else if (event.target.nodeName === `LI`){
                let li = event.target 
                            if (event.target.nextSibling.nodeName === 'BUTTON'){
                            event.target.nextSibling.remove()
                            event.target.nextSibling.remove()
                            event.target.nextSibling.remove()
                            fetch(`http://localhost:3000/events/${event.target.dataset.id}`).then(resp => resp.json()).then(data => {
                            ul = document.createElement(`ul`)
                            ul.className = `sub-goal-list`
                            data.forEach(dati =>{
                                let sub_li = document.createElement(`li`)
                                sub_li.innerHTML = dati.description
                                sub_li.dataset.id = dati.id
                                sub_li.className = dati.completion_status
                                ul.appendChild(sub_li)
                                let btn = document.createElement(`button`)
                                btn.className = `add-sub-event`
                                btn.innerHTML = `add subgoal`
                                btn.dataset.id = dati.id
                                ul.appendChild(btn)
                                let btn2 = document.createElement(`button`)
                                btn2.className = `toggle-complete`
                                btn2.innerHTML = `toggle complete`
                                btn2.dataset.id = dati.id
                                ul.appendChild(btn2)
                                let btn3 = document.createElement(`button`)
                                btn3.className = `delete-button`
                                btn3.innerHTML = `Delete`
                                btn3.dataset.id = dati.id
                                ul.appendChild(btn3)
                        
                            })
                            insertAfter(ul, li)
                            })
                            }
                            else {
                        
                            event.target.nextSibling.remove()
                            let btn = document.createElement(`button`)
                            btn.className = `add-sub-event`
                            btn.innerHTML = `add subgoal`
                            btn.dataset.id = event.target.dataset.id
                            insertAfter(btn, event.target)
                            let btn2 = document.createElement(`button`)
                            btn2.className = `toggle-complete`
                            btn2.innerHTML = `toggle complete`
                            btn2.dataset.id = event.target.dataset.id
                            insertAfter(btn2, btn)
                            let btn3 = document.createElement(`button`)
                            btn3.className = `delete-button`
                            btn3.innerHTML = `Delete`
                            btn3.dataset.id = event.target.dataset.id
                            insertAfter(btn3, btn2)
                        }
            }
            else if (event.target.className===`delete-button`){
                fetch(`http://localhost:3000/events/${event.target.dataset.id}`, {
                        method: "DELETE",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'},
                    }).then(resp => resp.json()).then(data =>{
                                    event.target.previousSibling.remove()
                                    event.target.previousSibling.remove()
                                    event.target.previousSibling.remove()
                                    let allsubgoalforms = document.getElementsByClassName("new-sub-goal-form")
                                    let newSubGoalForm = null 
                                    if (allsubgoalforms.length !== 0){
                                        for (var i = 0; i < allsubgoalforms.length; i++){
                                            if (allsubgoalforms[i].dataset.id === event.target.dataset.id){
                                                newSubGoalForm = allsubgoalforms[i]
                                            }
                                        }
                                    }
                                    if (newSubGoalForm !== null) { newSubGoalForm.remove() }
                                    if (event.target.parentElement.className === `top-div`) {event.target.parentElement.remove()}
                                    else {event.target.remove()}
                                })
                }
        })
        
        main.addEventListener(`submit`, function LoadEventSubmits(event){
            event.preventDefault()
            if (event.target.className ===`new-goal-form`){
                let description = event.target.children[1].value 
                fetch("http://localhost:3000/events/create",{            
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({ description: description, user_id: localStorage.user_id})
                }).then(resp => resp.json()).then(data => {
                    div = document.createElement(`div`)
                    div.className = 'top-div'
                    div.innerHTML += `<li class=${data.completion_status} data-id='${data.id}'>${data.description}</li><button data-id='${data.id}' class='add-sub-event'>add subgoal</button><button data-id='${data.id}' class='toggle-complete'>toggle complete</button><button data-id='${data.id}' class='delete-button'>Delete</button>`
                    main.appendChild(div)
                })
            }
        
            else if(event.target.className ===`new-sub-goal-form`){
                let description = event.target.children[1].value 
                let parent_event_id = event.target.dataset.id
                fetch("http://localhost:3000/events/subcreate",{            
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({ description: description,
                                        parent_event_id: parent_event_id,
                                        user_id: localStorage.user_id})
                }).then(resp=> resp.json()).then(func =>{
                    event.target.previousSibling.remove()
                    event.target.previousSibling.remove()
                    event.target.previousSibling.remove()
                    li = event.target.previousSibling
                    fetch(`http://localhost:3000/events/${parent_event_id}`).then(resp => resp.json()).then(data => {
                    ul = document.createElement(`ul`)
                    ul.className = `sub-goal-list`
                    
                    data.forEach(dati =>{
                        let sub_li = document.createElement(`li`)
                        sub_li.innerHTML = dati.description
                        sub_li.dataset.id = dati.id
                        sub_li.className = dati.completion_status
                        ul.appendChild(sub_li)
                        let btn = document.createElement(`button`)
                        btn.className = `add-sub-event`
                        btn.innerHTML = `add subgoal`
                        btn.dataset.id = dati.id
                        ul.appendChild(btn)    
                        let btn2 = document.createElement(`button`)
                        btn2.className = `toggle-complete`
                        btn2.innerHTML = `toggle complete`
                        btn2.dataset.id = dati.id
                        ul.appendChild(btn2)    
                        let btn3 = document.createElement(`button`)
                        btn3.className = `delete-button`
                        btn3.innerHTML = `Delete`
                        btn3.dataset.id = dati.id
                        ul.appendChild(btn3) 
                    })
                    insertAfter(ul, li)
                    event.target.remove()
                
                    })
                })
            }
        })
    })
    }
function insertBefore(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode);
    }
function insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }
function displayHomePage(){
        main.innerHTML = ``
        let div = document.querySelector(`div`)
        div.innerHTML = `<button class="top-menu" id='goal-btn'>Goals</button><button class="top-menu" id='journal-btn'>Journal</button><button class="top-menu" id='sage-advice-button'>Notes</button><button class="top-menu" id="logout">Logout</button>`
        div.id = "top-bar"
        
        // Logout functionality
        const logoutButton = document.getElementById('logout')
        logoutButton.addEventListener('click', function(e){
          localStorage.removeItem('user_id')
          displayIntroductionPage()
          let div = document.querySelector(`div`)
          div.innerHTML = ``
        })
    }
function displayLogin() {
        let mainContainer = document.querySelector('main')
        mainContainer.innerHTML = `
        <h1>LifeMaster</h1>
        <h3 id = "loginh3" >login or signup to accomplish your destiny now!</h3>
        
        
        <form id = "loginform">
          <label type="textarea" for="username">Username:</label>
          <input type="textarea" class="login-input" name="username"/>
          <label type="password" for="password">Password:</label>
          <input type="password" class="login-input" name="password"/>
          <input id = "loginbutton" type="submit"/>
        </form>`
      
        const loginForm = mainContainer.querySelector('form')
        loginForm.addEventListener('submit', function(e){
          e.preventDefault()
            
          const username = e.target.username.value
          const password = e.target.password.value
          fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({
              name: username,
              password: password
            })
          })
          .then(res => res.json())
          .then(data => {
            // When we are successful!
            if (data["error"]){
                window.alert(data["error"])
            }
            else { localStorage.setItem("user_id", data.id)

            displayHomePage()
          
            goalbtn = document.getElementById(`goal-btn`)
            goalbtn.addEventListener(`click`, loadEvents)

            journalbtn = document.getElementById(`journal-btn`)
            journalbtn.addEventListener(`click`, loadJournal)

            sageadvicebtn = document.getElementById(`sage-advice-button`)
            sageadvicebtn.addEventListener(`click`, loadsageAdvice)
            }
            
            // After they have logged in, this is how we can remember them
           
        
          })
        })
    }
function displayIntroductionPage() {
    let mainContainer = document.querySelector('main')
    mainContainer.innerHTML = `
    <iframe width="420" height="315"
    src="/Users/TheLeviathan/Desktop/lifemaster/vid/thevid.mp4">
    </iframe>
    <button id="next">Click Here to use LifeMaster free!</button>`
    document.getElementById(`next`).addEventListener(`click`, displayLogin)
    
}
    

