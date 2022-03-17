window.allowDrop = allowDrop
window.drop = drop
window.drag = drag
window.createWall = createWall
window.createWallClick = createWallClick
import dijkstras from './dijkstras.js'
import astar  from './AStar.js'

var wallList = []
var isMouseDown = false
var beginning  = "row10col20";
var end = "row10col40"


const runAlgorithm = document.querySelector('.generate-btn')
const ClearGrid = document.querySelector('.clear-grid')

const gridContainer = document.querySelector('.grid-container')

if(gridContainer)
{
    
for(var i = 0;i<20;i++)
{
    for(var j = 0 ; j < 50;j++)
    {
        gridContainer.innerHTML+=`<div class = 'grid' id = 'row${i}col${j}' onclick = 'createWallClick(event)' ondragover = 'allowDrop(event)' ondrop = 'drop(event)' onmouseover = 'createWall(event)' ></div>`
    }
}
}

document.body.onmousedown = function(e)
{
    isMouseDown = true
}

document.body.onmouseup = function(e)
{
    isMouseDown = false
}


function createWallClick(ev)
{
    ev.target.classList.toggle('wall')
}
function createWall(ev)
{
    // console.log(ev.target.id);
    
    if(isMouseDown )
    {
        console.log(ev.target.id);
        ev.target.classList.toggle('wall')
    }
    
}

function allowDrop(ev)
{
    ev.preventDefault()
}
function drop(ev)
{
    isMouseDown =false
    ev.preventDefault()
    var data = ev.dataTransfer.getData('text')
    ev.target.appendChild(document.getElementById(data))

    console.log(data);
    console.log(ev.target.id);
    if(data === "startt")
    {
        
        beginning = ev.target.id
    }
    else if(data === "endd")
    {
        end = ev.target.id
    }
    
}

function drag(ev)
{
    ev.dataTransfer.setData('text',ev.target.id)
}
const st = 0;
const en = 0;

var startImg = document.createElement('img')
startImg.src = "images/startArrow.png"
startImg.setAttribute('id','startt')
startImg.setAttribute('ondragstart','drag(event)')
startImg.setAttribute('style','width:30px;height:30px')
startImg.setAttribute('onclick','alert("hi guys")')
startImg.setAttribute('draggable','true')

var endImg = document.createElement('img')
endImg.src = "images/endarrow.jpg"
endImg.setAttribute('id','endd')
endImg.setAttribute('ondragstart','drag(event)')
endImg.setAttribute('style','width:25px;height:25px')
endImg.setAttribute('onclick','alert("hi guys end")')
endImg.setAttribute('draggable','true')

document.getElementById('row10col20').appendChild(startImg)
document.getElementById('row10col40').appendChild(endImg)



ClearGrid.addEventListener('click',()=>{
    clearGrid()
})

runAlgorithm.addEventListener('click', function(){
    
    var walls = document.getElementsByClassName('wall')
    
    for(let m of walls)
    {

        wallList.push(m.id.replace('row','').split('col'))
    }

    // console.log(wallList);

    document.getElementById(beginning).classList.add('start')
    document.getElementById(end).classList.add('end')
    var [visited,count] =  dijkstras(beginning,end,i,j,wallList)
    var start = beginning.replace("row","").split("col")
    start= start.map((src)=>{
        return parseInt(src)
        })

    var destination = end.replace("row","").split("col")
    destination = destination.map((src)=>{
        return parseInt(src)
    })

    const path = [destination]
    var val =destination

    for(let l = visited.length - 1 ; l >=0 ;l--)
    {
        
        if(visited[l][0].toString() == val.toString())
        {
            val = visited[l][1]
            path.unshift(val)
        }
    }

    function drawPath()
    {
        for(let k = 0;k<path.length;k++)
        {
            setTimeout(()=>{document.getElementById(`row${path[k][0]}col${path[k][1]}`).classList.add('visited')},(k+1)*120)
        }
    }

    setTimeout(drawPath,(count+1) * 10)

})

function clearGrid()
{
    wallList= []
    for(let i = 0;i<20;i++)
    {
        for(let j = 0 ; j < 50;j++)
        {
            
            document.getElementById(`row${i}col${j}`).classList.remove('animated','visited',"start","end","wall")
        }
    }
}




const algorithmSection = document.querySelector('.algo-section')
const displayAlgos = document.querySelector('.select-algo-btn')


const astarBtn = document.querySelector('.A-star')

displayAlgos.addEventListener('click',function(e)
{
    e.preventDefault()
    algorithmSection.classList.toggle('opened-section')


})

if(astarBtn)
{
astarBtn.addEventListener('click',function(e)
{
    e.preventDefault()
    
    var walls = document.getElementsByClassName('wall')
    
    for(let m of walls)
    {

        wallList.push(m.id.replace('row','').split('col'))
    }


    var [visited,count] =  astar(beginning,end,i,j,wallList)
    console.log(visited);
    var start = beginning.replace("row","").split("col")
    start= start.map((src)=>{
        return parseInt(src)
        })

    var destination = end.replace("row","").split("col")
    destination = destination.map((src)=>{
        return parseInt(src)
    })

    const path = [destination]
    var val =destination

    for(let l = visited.length - 1 ; l >=0 ;l--)
    {
        
        if(visited[l][0].toString() == val.toString())
        {
            val = visited[l][1]
            path.unshift(val)
        }
    }

    function drawPath()
    {
        for(let k = 0;k<path.length;k++)
        {
            setTimeout(()=>{document.getElementById(`row${path[k][0]}col${path[k][1]}`).classList.add('visited')},(120*(k+1)))
        }
    }

    setTimeout(drawPath,(count+1) )
})
}


