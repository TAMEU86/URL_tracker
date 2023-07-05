let myLeads = []
const inputEl = document.querySelector("#input-el")
const buttonEl = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.querySelector("#tab-btn")

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

tabBtn.addEventListener("click", function() {
  // grab url of current tab 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
   // add it to myLeads arr
   myLeads.push(tabs[0].url)
   // save it to local storage
   localStorage.setItem("myLeads", JSON.stringify(myLeads))
   // trigger or call or invock render()
   render(myLeads)
  })
})

function render(leads) {
  let listItems = ""
  for(let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    ` 
  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

buttonEl.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = " "
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})