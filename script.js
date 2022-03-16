window.onload = ()=>{
    document.getElementById("run").onclick = (ev)=>{
        const select = document.getElementById("types")
        run(document.getElementById("password").value, select.options[select.selectedIndex].value)
    }
}

function run(password,type){
    document.getElementById("loading").setAttribute("open",true)
    const out = document.getElementById("output")
    out.textContent = "loading "+type
    fetch(type+".bin",)
    .then(e=>e.text())
    .then((data)=>{
        console.log(data)
        document.title = type
        const HTML = Ret(data,password)
        console.log(HTML)
        document.body.innerHTML = HTML
    })
    .catch(()=>{out.className="error";out.textContent="Cannot read "+type})
}