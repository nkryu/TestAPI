const main = document.querySelector("main");
const btn = document.querySelector("button");
const input = document.querySelectorAll("input");

async function callApi() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await res.json();
  // console.log(json);

  json.forEach( item => {
    const section = createSection(item)
    main.appendChild(section)
  });
}

function createSection(item) {
  const section = document.createElement("section");
  const name = document.createElement("h2");
  const email = document.createElement("h3");

  name.textContent= item.name
  email.textContent= item.email

  section.appendChild(name);
  section.appendChild(email);
  return section
}

btn.addEventListener('click',async(e)=>{
  e.preventDefault();
  const res = await fetch("https://jsonplaceholder.typicode.com/users",{
    method:'POST',
    body:JSON.stringify({
      name: input[0].value,
      email:input[1].value,
    }),
    headers:{
      'Content-type':'application/json; charset=UTF-8'
    }
  });
  
  const data = await res.json();
  const section = createSection(data);
  main.prepend(section);
  input[0].value="";
  input[1].value="";
})


window.addEventListener("load",callApi);
